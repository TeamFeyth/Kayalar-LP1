// @ts-check
import { defineConfig } from 'astro/config';

// Drives canonical, hreflang and og:url. The live domain is the built-in
// default now that DNS is in place, so the pages stay correct even if nobody
// sets the variable. PUBLIC_SITE_URL still overrides it for a staging host.
//
// Note: this is read at BUILD time. On Cloudflare it has to be a plain text
// variable — an encrypted Secret is not visible to the build, only to the
// Function at runtime.
const SITE = process.env.PUBLIC_SITE_URL || 'https://book.kayalar-motors.com';

export default defineConfig({
  site: SITE,

  // Static output. The lead endpoint runs as a Cloudflare Pages Function
  // (see /functions/api/lead.js), so no SSR adapter is required.
  output: 'static',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      // English lives at "/", Spanish at "/es/"
      prefixDefaultLocale: false,
    },
  },

  build: {
    inlineStylesheets: 'always',
  },

  compressHTML: true,
});
