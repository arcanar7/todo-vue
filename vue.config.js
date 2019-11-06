module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/main.scss";',
      },
    },
  },

  productionSourceMap: false,

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
}
