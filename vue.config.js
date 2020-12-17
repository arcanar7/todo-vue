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
  pwa: {
    themeColor: '#287665',
    name: 'ToDo List',
    iconPaths: {
      favicon16: 'assets/favicon-16x16.png',
      favicon32: 'assets/favicon-32x32.png',
      appleTouchIcon: 'assets/apple-touch-icon-152x152.png',
      maskIcon: 'assets/safari-pinned-tab.svg',
      msTileImage: 'assets/msapplication-icon-144x144.png',
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/',
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
    },
  },
};
