// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    buildAssetsDir: '/assetsDir/',
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
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'assetsDir/assets/img/favicon.ico' }, { rel: 'stylesheet', href: 'assetsDir/assets/css/normalize.css' }],
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
  modules: [
    '@pinia/nuxt',
  ],
})
