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
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  },
  pwa: {
    themeColor: '#287665',
    name: 'ToDo List',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/',
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('.(?:png|gif|jpg|jpeg|webp|svg)$'),
          handler: 'cacheFirst',
        },
      ],
    },
  },
}
