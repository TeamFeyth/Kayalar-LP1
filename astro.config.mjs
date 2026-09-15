// @ts-check
import { defineConfig } from 'astro/config';

// SITE is used for canonical + og:url. Set PUBLIC_SITE_URL in .env / Cloudflare
// once the final subdomain is confirmed (Section 1: "Target Subdomain / URL").
const SITE = process.env.PUBLIC_SITE_URL || 'https://lp1-kayalar.pages.dev';

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
