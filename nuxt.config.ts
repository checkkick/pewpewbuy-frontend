import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
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
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'assets/img/favicon.ico' }, { rel: 'stylesheet', href: 'assets/css/normalize.css' }],
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
  buildModules: [
    // https://composition-api.nuxtjs.org/getting-started/setup#quick-start
    '@pinia/nuxt',
  ],
  modules: [
    // Simple usage
    'cookie-universal-nuxt',]
})
