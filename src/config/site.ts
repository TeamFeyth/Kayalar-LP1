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

  // Section 3 — thank-you route. The brief specifies per-form ON-PAGE
  // confirmation messages, so the redirect is OFF by default. Flip
  // PUBLIC_REDIRECT_AFTER_SUBMIT to "true" to redirect to /thank-you instead.
  thankYouPath: '/thank-you',
  redirectAfterSubmit: import.meta.env.PUBLIC_REDIRECT_AFTER_SUBMIT === 'true',

  // Section 5.3, field 6 — TCPA consent checkbox default state.
  // The brief says "pre-checked by default". See README for the legal note.
  consentPrechecked: import.meta.env.PUBLIC_CONSENT_PRECHECKED !== 'false',
} as const;

export const tracking = {
  // Supplied in the brief (Section 1 / Section 4). Same ID on LP1 and LP2:
  // one campaign, two landing pages.
  metaPixelId: import.meta.env.PUBLIC_META_PIXEL_ID || '28341044768871070',

  // Still "(blank)" in the brief. Each snippet renders only when its value
  // is present, so the build is safe to deploy today and stays safe later.
  gtmId: import.meta.env.PUBLIC_GTM_ID || '',            // e.g. GTM-XXXXXXX
  ga4Id: import.meta.env.PUBLIC_GA4_ID || '',            // e.g. G-XXXXXXXXXX
  // Supplied in the brief (Section 4). LP1 only — LP2's CallRail field is still
  // blank, so that project keeps an empty default and renders no tag.
  callRailSwapSrc:
    import.meta.env.PUBLIC_CALLRAIL_SWAP_SRC ||
    '//cdn.callrail.com/companies/357324316/48d41d9d83314e44f676/12/swap.js',
  searchConsoleToken: import.meta.env.PUBLIC_GSC_VERIFICATION || '',
} as const;
