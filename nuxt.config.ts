// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [
    "../digital-agency",
    // "../local-spot",
  ],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],
  // imports: {
  //   dirs: [
  //     resolve(__dirname, '../digital-agency/composables/**'),
  //     resolve(__dirname, './composables/**'),
  //     // resolve(__dirname, '../local-spot/composables/**'),
  //   ]
  // },
  // pinia: {
  //   storesDirs: [
  //       '../local-spot/stores',
  //       './stores'
  //   ]
  // },
  // plugins: [
  //   '../local-spot/plugins/auth.client.ts',
  //   '../local-spot/plugins/formatters.client.ts',
  // ],
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
  vite: {
    define: {
      global: 'globalThis'
    },
    plugins: []
  },
  runtimeConfig: {
    public: {
      apiBase: '/api/agency-cms'
    }
  },

  i18n: {
    locales: [
      {
        code: 'th',
        iso: 'th-TH',
        name: 'ไทย',
        file: 'th.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    defaultLocale: 'th',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
})