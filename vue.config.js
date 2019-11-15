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
  chainWebpack: config => {
    config.module
      .rule('fonts')
      .test(/\.(ttf|otf|eot|woff|woff2)$/)
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        options = {
          // limit: 10000,
          name: '/assets/fonts/[name].[ext]',
        }
        return options
      })
      .end()
  },
}
