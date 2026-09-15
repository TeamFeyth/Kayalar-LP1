# Kayalar Motors — Landing Page 1

Astro 5, static output, deployed on Cloudflare Pages. English at `/`, Spanish at `/es/`.

Built from Section 5 of the brief (copy) using the rough draft only for visual
layout, per the note that the mockup is a framework and the doc is the source of
truth for copy.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

---

## 1. Fill these in before launch

Everything still marked "(blank)" in the brief is read from an environment
variable. Nothing is hardcoded, so no component needs to be touched.

Set them in **Cloudflare Pages → Settings → Environment variables**, or copy
`.env.example` to `.env` for local work.

| Variable | Brief field | Status |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Target Subdomain / URL | pending — drives canonical, hreflang, og:url |
| `PUBLIC_META_PIXEL_ID` | Meta Pixel | **supplied** — `28341044768871070` |
| `PUBLIC_GTM_ID` | Google Tag (GTM) | pending |
| `PUBLIC_GA4_ID` | Google Analytics (GA4) | pending |
| `PUBLIC_CALLRAIL_SWAP_SRC` | CallRail DNI | pending |
| `PUBLIC_GSC_VERIFICATION` | Search Console | pending |
| `CRM_ENDPOINT` | CRM Integration Endpoint | pending |
| `CRM_AUTH_HEADER` / `CRM_AUTH_VALUE` | Syncing Instructions | pending |
| `META_CAPI_TOKEN` | Meta Conversions API | pending |
| `LEAD_BACKUP_WEBHOOK` | — | optional safety net (n8n / Zapier / Sheets) |

Each tag renders only when its variable has a value, so the page is safe to
deploy today and stays safe as the values arrive. GA4 is skipped automatically
if `PUBLIC_GTM_ID` is set, to avoid double-counting.

**Leads are not lost while `CRM_ENDPOINT` is empty.** Every submission is
written to the Function log (`KAYALAR_LEAD_UNDELIVERED`) under Cloudflare Pages
→ Deployment → Functions → Real-time logs. Pointing `LEAD_BACKUP_WEBHOOK` at an
n8n or Zapier catch hook gives a proper inbox in about five minutes.

## 2. Deploy

Cloudflare Pages, connected to `TeamFeyth/Kayalar-LP1`:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20 or newer

`/functions/api/lead.js` is picked up automatically by Pages — no adapter, no
`wrangler.toml`, no extra setup. Do not switch the project to an SSR adapter or
that Function stops being served.

## 3. What is wired up

**Forms.** All four placements share one component and one runtime, so the field
set can never drift:

| `form_id` sent to the CRM | Where |
| --- | --- |
| `form_1_hero` | Hero |
| `form_2_prefooter` | Pre-footer section |
| `form_3_popup_generic` | Exit-intent / scroll popup |
| `form_3_popup_vehicle` | "Check Availability" on a vehicle card |

The vehicle popup also sends `vehicle_name`, `vehicle_id` (the VDP stock id) and
`vehicle_url`, which is what "pre-tagged with the selected vehicle" in Section
5.5 turns into on the CRM side.

**Attribution.** Every lead carries `utm_source/medium/campaign/content/term`,
`gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `_fbp`, `_fbc`, referrer, page
URL and locale. Click IDs are held in `sessionStorage`, so they survive a scroll
to the pre-footer form or a hash change.

**Confirmations.** Section 3 specifies a different on-page message per form, so
that is the default: the form is replaced in place by its own message. The
`/thank-you` route exists in both languages and is one env flag away
(`PUBLIC_REDIRECT_AFTER_SUBMIT=true`) if the media team would rather count
conversions on a pageview.

**Meta events.** `PageView` on load, `Lead` on submit, `Contact` on any
`tel:` click. The browser `Lead` and the server CAPI `Lead` share an `event_id`,
so they de-duplicate correctly the moment `META_CAPI_TOKEN` is added.

**Popup.** Desktop exit-intent, mobile at 50% scroll depth, once per session
(`sessionStorage`), visible close button, Escape to close, focus trapped while
open, focus restored on close. Card-triggered vehicle popups ignore the
once-per-session rule because the user asked for them.

**Bot filtering.** Honeypot field only. If the team wants Cloudflare Turnstile,
it is a small addition to `LeadForm.astro` and `functions/api/lead.js`.

## 4. Spanish

Section 5.2 asks for an EN | ES toggle, so both languages are fully built out,
not machine-swapped at runtime: `/` and `/es/`, with `hreflang` tags and a
toggle that keeps the visitor on the same page.

All copy lives in `src/i18n/ui.ts`. English is verbatim from the brief. **The
Spanish is a working translation and needs client or copy-team sign-off**,
especially the TCPA consent paragraph — that one is a legal text, not marketing
copy, so it should be reviewed by whoever approved the English version.

For Google and Meta, point the Spanish ad groups directly at `/es/`.

## 5. Still missing (not blockers for the build)

- **Hero image and vehicle photos.** Cards fall back to a neutral placeholder and
  the hero image band is skipped entirely, so nothing looks broken. Drop files in
  `public/images/` and set the paths in `src/data/vehicles.ts`. See
  `public/images/README.md`.
- **Prices and mileage.** Listed as "recommended, not specified in source copy".
  `price: null` renders "Call for price".
- **Business hours.** Needed for the `AutoDealer` schema and to sanity-check the
  "we'll be in touch shortly" promise after hours.
- **`og-image.jpg`.** Link previews are plain until it exists.

## 6. Two things worth flagging

**The consent checkbox is pre-checked.** The brief specifies "Yes (pre-checked)"
and that is how it ships. Standard TCPA guidance is that express written consent
should be an affirmative act by the user, and a pre-checked box is generally not
treated as one — it is also against Meta's lead-form conventions. This is a call
for the client's counsel, not for me, but it should be an explicit decision
rather than an oversight. Flipping it is one variable:
`PUBLIC_CONSENT_PRECHECKED=false`.

**Six hardcoded vehicles.** Cars sell. When one does, the card and its VDP link
go stale and paid clicks land on a dead page. Someone needs to own updating
`src/data/vehicles.ts`, or we pull from an inventory feed if the client's DMS
exposes one.

## 7. Structure

```
├── functions/api/lead.js      Cloudflare Pages Function: CRM + backup + Meta CAPI
├── public/                    favicon, robots.txt, _headers, images
└── src/
    ├── config/site.ts         brand, contact, tracking IDs, feature flags
    ├── data/vehicles.ts       the six featured vehicles
    ├── i18n/ui.ts             all copy, EN + ES
    ├── components/            sections, LeadForm, Popup, FormRuntime, Analytics
    ├── layouts/Base.astro     head, hreflang, OG, fonts
    └── pages/                 /, /es/, /thank-you, /es/thank-you
```

Accessibility floor: keyboard focus visible throughout, skip link, labelled
fields, `aria-invalid` on errors, live-region confirmations, focus trap in the
dialog, `prefers-reduced-motion` respected.
