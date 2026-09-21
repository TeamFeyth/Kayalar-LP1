/**
 * Single source of truth for brand, contact and tracking values.
 * Anything that came back "(blank)" in the brief is read from an env var so it
 * can be filled in later without touching component code.
 */

export const site = {
  brand: 'Kayalar Motors',
  landingPage: 'LP1',

  // Contact — Section 5.8 / 5.9 of the brief
  phoneDisplay: '832-966-7907',
  phoneHref: 'tel:+18329667907',
  addressLine: '16230 FM 529 Road, Houston, TX 77095',
  addressStreet: '16230 FM 529 Road',
  addressCity: 'Houston',
  addressState: 'TX',
  addressZip: '77095',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=16230+FM+529+Road+Houston+TX+77095',

  privacyUrl: 'https://kayalar-motors.com/privacy',
  termsUrl: 'https://kayalar-motors.com/terms',
  mainSiteUrl: 'https://kayalar-motors.com',

  // Thank-you route. Every submit now lands here, so leads are counted off a
  // real pageview instead of an in-page event, which is easier to verify and
  // harder to lose. The per-form confirmation messages from Section 3 are still
  // built and still used if PUBLIC_REDIRECT_AFTER_SUBMIT is set to "false".
  thankYouPath: '/thank-you',
  redirectAfterSubmit: import.meta.env.PUBLIC_REDIRECT_AFTER_SUBMIT !== 'false',

  // Section 5.3, field 6 — TCPA consent checkbox default state.
  // The brief says "pre-checked by default". See README for the legal note.
  consentPrechecked: import.meta.env.PUBLIC_CONSENT_PRECHECKED !== 'false',

  /**
   * How long after load the automatic pop-up is allowed to fire at all.
   * Exit-intent has no natural delay, so without this it can trigger within a
   * second of landing, which reads as aggressive. Tune per page.
   */
  popupDelayMs: Number(import.meta.env.PUBLIC_POPUP_DELAY_MS) || 8000,

  /**
   * Cloudflare Turnstile. Inert until a site key exists, so the forms keep
   * working exactly as they do today until it is switched on.
   * The matching TURNSTILE_SECRET_KEY lives server-side on Cloudflare.
   */
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '',
} as const;

export const tracking = {
  // Supplied in the brief (Section 1 / Section 4). Same ID on LP1 and LP2:
  // one campaign, two landing pages.
  metaPixelId: import.meta.env.PUBLIC_META_PIXEL_ID || '28341044768871070',

  // Still "(blank)" in the brief. Each snippet renders only when its value
  // is present, so the build is safe to deploy today and stays safe later.
  // Supplied in the brief (Section 4). LP1 has its own container, separate
  // from the other landing page, so the two stay independent in GTM.
  gtmId: import.meta.env.PUBLIC_GTM_ID || 'GTM-P82QQLJ8',
  ga4Id: import.meta.env.PUBLIC_GA4_ID || '',            // e.g. G-XXXXXXXXXX
  // Supplied in the brief (Section 4). LP1 only — LP2's CallRail field is still
  // blank, so that project keeps an empty default and renders no tag.
  callRailSwapSrc:
    import.meta.env.PUBLIC_CALLRAIL_SWAP_SRC ||
    '//cdn.callrail.com/companies/357324316/48d41d9d83314e44f676/12/swap.js',
  searchConsoleToken: import.meta.env.PUBLIC_GSC_VERIFICATION || '',
} as const;
