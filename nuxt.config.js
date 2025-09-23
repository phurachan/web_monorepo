// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [
    "../digital-agency",
    // "../local-spot",  // ปิดชั่วคราวเพื่อ deploy
  ],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    configPath: './tailwind.config.js',
    exposeConfig: false,
    injectPosition: 'first'
  },
  css: [],
  nitro: {
    preset: process.env.NUXT_ENV_VERCEL ? 'vercel' : undefined,
    experimental: {
      wasm: true
    },
    prerender: {
      failOnError: false,
      ignore: ['/local-spot']
    }
  },
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },
  // Override i18n config to prevent conflicts
  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    langDir: 'locales/',
    detectBrowserLanguage: false
  }
})