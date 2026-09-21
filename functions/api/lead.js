/**
 * POST /api/lead — Cloudflare Pages Function.
 *
 * Runs automatically on Cloudflare Pages; no adapter or extra config needed.
 * Three jobs, each independent so one failure never blocks the others:
 *   1. Forward the lead to the CRM (Nemroot).
 *   2. Mirror it to a backup webhook (n8n / Zapier / Sheets), if configured.
 *   3. Send the Meta CAPI "Lead" event, de-duplicated against the browser
 *      pixel via the shared event_id.
 *
 * Environment variables (Cloudflare Pages > Settings > Environment variables):
 *   CRM_ENDPOINT          Nemroot POST URL                      (pending)
 *   CRM_AUTH_HEADER       e.g. "Authorization" or "X-API-Key"   (optional)
 *   CRM_AUTH_VALUE        e.g. "Bearer xxxxx"                   (optional)
 *   LEAD_BACKUP_WEBHOOK   n8n / Zapier catch URL                (optional)
 *   META_PIXEL_ID         defaults to the campaign pixel
 *   META_CAPI_TOKEN       Meta system-user access token         (pending)
 *   LEAD_DEBUG            "true" to echo the normalized lead in the response
 */

const PIXEL_FALLBACK = '28341044768871070';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const digits = (v) => String(v || '').replace(/\D/g, '');

function splitName(fullName) {
  const parts = String(fullName || '').trim().split(/\s+/).filter(Boolean);
  return { first: parts[0] || '', last: parts.slice(1).join(' ') };
}

function validate(body) {
  const errors = [];
  const name = String(body.full_name || '').trim();
  if (name.split(/\s+/).filter(Boolean).length < 2) errors.push('full_name');
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(body.email || '').trim())) errors.push('email');
  if (digits(body.phone).length !== 10) errors.push('phone');
  if (!body.existing_loan) errors.push('existing_loan');
  if (!body.pre_approval) errors.push('pre_approval');
  return errors;
}

/**
 * Cloudflare Turnstile.
 *
 * Deliberately fails OPEN if Cloudflare's verify endpoint is unreachable: on a
 * paid-traffic page, losing real leads to someone else's outage is worse than
 * letting a bot through. It only fails CLOSED on a token Cloudflare actively
 * rejects, and only when TURNSTILE_ENFORCE is not "false".
 */
async function verifyTurnstile(token, env, request) {
  if (!env.TURNSTILE_SECRET_KEY) return { checked: false, reason: 'not configured' };

  const form = new URLSearchParams();
  form.append('secret', env.TURNSTILE_SECRET_KEY);
  form.append('response', token || '');
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.append('remoteip', ip);

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    return { checked: true, ok: !!data.success, codes: data['error-codes'] || [] };
  } catch (err) {
    return { checked: true, ok: true, failOpen: true, error: String(err) };
  }
}

async function sendToCrm(lead, env) {
  if (!env.CRM_ENDPOINT) return { attempted: false, ok: false, reason: 'CRM_ENDPOINT not set' };

  const headers = { 'Content-Type': 'application/json' };
  if (env.CRM_AUTH_HEADER && env.CRM_AUTH_VALUE) {
    headers[env.CRM_AUTH_HEADER] = env.CRM_AUTH_VALUE;
  }

  try {
    const res = await fetch(env.CRM_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(lead),
    });
    return { attempted: true, ok: res.ok, status: res.status };
  } catch (err) {
    return { attempted: true, ok: false, error: String(err) };
  }
}

async function sendToBackup(lead, env) {
  if (!env.LEAD_BACKUP_WEBHOOK) return { attempted: false };
  try {
    const res = await fetch(env.LEAD_BACKUP_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    return { attempted: true, ok: res.ok };
  } catch (err) {
    return { attempted: true, ok: false, error: String(err) };
  }
}

async function sendToMetaCapi(lead, env, request) {
  const token = env.META_CAPI_TOKEN;
  const pixelId = env.META_PIXEL_ID || PIXEL_FALLBACK;
  if (!token) return { attempted: false, reason: 'META_CAPI_TOKEN not set' };

  const { first, last } = splitName(lead.full_name);
  const user_data = {
    em: [await sha256(lead.email.trim().toLowerCase())],
    ph: [await sha256('1' + digits(lead.phone))],
    fn: [await sha256(first.toLowerCase())],
    ln: [await sha256(last.toLowerCase())],
    country: [await sha256('us')],
    client_ip_address: request.headers.get('CF-Connecting-IP') || undefined,
    client_user_agent: request.headers.get('User-Agent') || undefined,
    fbp: lead.fbp || undefined,
    fbc: lead.fbc || undefined,
  };

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.event_id,
        event_source_url: lead.page_url,
        action_source: 'website',
        user_data,
        custom_data: {
          content_name: lead.vehicle_name || lead.form_id,
          content_category: lead.landing_page,
          lead_form: lead.form_id,
        },
      },
    ],
  };

  // Events Manager > Test Events only shows server events when this code is
  // attached. Leave META_TEST_EVENT_CODE unset in production: while it is set,
  // Meta treats the traffic as test data and it does not feed optimisation.
  if (env.META_TEST_EVENT_CODE) {
    payload.test_event_code = env.META_TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { attempted: true, ok: false, status: res.status, detail: detail.slice(0, 500) };
    }
    return { attempted: true, ok: true, status: res.status, testMode: !!env.META_TEST_EVENT_CODE };
  } catch (err) {
    return { attempted: true, ok: false, error: String(err) };
  }
}

export async function onRequestPost({ request, env, waitUntil }) {
  let body;
  try {
    body = await request.json();
  } catch (_) {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // Honeypot: a filled hidden field means a bot. Answer 200 so it moves on.
  if (body.company_website) return json({ ok: true, ignored: true });

  const turnstile = await verifyTurnstile(body['cf-turnstile-response'], env, request);
  if (turnstile.checked && !turnstile.ok) {
    if (env.TURNSTILE_ENFORCE !== 'false') {
      return json({ ok: false, error: 'failed_bot_check' }, 403);
    }
    // Monitor mode: log what would have been blocked, but let the lead through.
    console.log('KAYALAR_TURNSTILE_WOULD_BLOCK', JSON.stringify(turnstile.codes));
  }

  const errors = validate(body);
  if (errors.length) return json({ ok: false, error: 'validation', fields: errors }, 422);

  const { first, last } = splitName(body.full_name);

  const lead = {
    // Contact
    full_name: String(body.full_name).trim(),
    first_name: first,
    last_name: last,
    email: String(body.email).trim().toLowerCase(),
    phone: digits(body.phone),
    phone_formatted: `(${digits(body.phone).slice(0, 3)}) ${digits(body.phone).slice(3, 6)}-${digits(body.phone).slice(6)}`,

    // Qualifying answers
    existing_loan: body.existing_loan,
    pre_approval: body.pre_approval,
    tcpa_consent: body.tcpa_consent === 'yes',

    // Source — this is what makes each lead identifiable in the CRM
    form_id: body.form_id || 'unknown',
    landing_page: body.landing_page || 'LP1',
    locale: body.locale || 'en',
    vehicle_name: body.vehicle_name || '',
    vehicle_id: body.vehicle_id || '',
    vehicle_url: body.vehicle_url || '',

    // Attribution
    page_url: body.page_url || '',
    referrer: body.referrer || '',
    utm_source: body.utm_source || '',
    utm_medium: body.utm_medium || '',
    utm_campaign: body.utm_campaign || '',
    utm_content: body.utm_content || '',
    utm_term: body.utm_term || '',
    gclid: body.gclid || '',
    gbraid: body.gbraid || '',
    wbraid: body.wbraid || '',
    fbclid: body.fbclid || '',
    msclkid: body.msclkid || '',
    fbp: body.fbp || '',
    fbc: body.fbc || '',

    event_id: body.event_id || crypto.randomUUID(),
    submitted_at: body.submitted_at || new Date().toISOString(),
    ip: request.headers.get('CF-Connecting-IP') || '',
    user_agent: request.headers.get('User-Agent') || '',
  };

  /**
   * The three deliveries used to be awaited before answering the browser, so
   * the visitor sat waiting for all of them. The CRM hop is an Apps Script web
   * app: cold start, then a spreadsheet write, then an email send, commonly
   * three to eight seconds. That was the form latency.
   *
   * They now run on waitUntil, which keeps the worker alive after the response
   * is sent. The browser hears back as soon as the lead is validated, and
   * nothing is dropped. No information is lost either: the response never
   * reported delivery to the visitor anyway, failures are logged, and the
   * Google Sheet is the durable record.
   */
  const deliver = Promise.all([
    sendToCrm(lead, env),
    sendToBackup(lead, env),
    sendToMetaCapi(lead, env, request),
  ]).then(function (results) {
    const crm = results[0];
    const backup = results[1];
    const capi = results[2];

    // Until CRM_ENDPOINT is filled in, this line is the lead's only trail.
    // Cloudflare Pages > Deployment > Functions > Real-time logs.
    if (!crm.ok) {
      console.log('KAYALAR_LEAD_UNDELIVERED', JSON.stringify({ lead, crm, backup }));
    } else {
      console.log(
        'KAYALAR_LEAD',
        lead.form_id,
        lead.email,
        lead.vehicle_name || '-',
        'capi:' + (capi.ok ? 'ok' : capi.reason || 'failed')
      );
    }
    return { crm: crm, backup: backup, capi: capi };
  });

  // Debug mode, and local dev where waitUntil does not exist, wait for the
  // result so the response can report it.
  if (env.LEAD_DEBUG === 'true' || typeof waitUntil !== 'function') {
    const delivery = await deliver;
    return json({
      ok: true,
      event_id: lead.event_id,
      turnstile: turnstile,
      delivery: delivery,
      lead: env.LEAD_DEBUG === 'true' ? lead : undefined,
    });
  }

  waitUntil(deliver);

  return json({
    ok: true,
    event_id: lead.event_id,
    turnstile: turnstile,
    queued: true,
  });
}

export async function onRequestGet() {
  return json({ ok: false, error: 'method_not_allowed' }, 405);
}
