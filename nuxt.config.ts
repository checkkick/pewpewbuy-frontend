import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || 'http://localhost',
      API_PORT: process.env.API_PORT || '',
    },
  },

  app: {
    head: {
      title: 'PEWPEWBUY | Страйкбольная барахолка',
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'assets/img/favicon.ico' }],
    },
  },

  css: ['assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "assets/scss/params.scss";'
            + '@import "assets/scss/mixins.scss";'
            + '@import "assets/scss/mixins.scss";',
        },
      },
    },
  },

  plugins: [
    { src: '@/plugins/mediaListenerPlugin.client.js' },
  ],

  modules: [
    '@pinia/nuxt',
    '@nuxt/devtools',
  ],

  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },

  devtools: {
    enabled: process.env.NODE_ENV !== 'production',
  },
});
