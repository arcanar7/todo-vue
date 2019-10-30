// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin

module.exports = {
  // configureWebpack: {
  //   plugins: [new BundleAnalyzerPlugin()],
  // },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/main.scss";',
      },
    },
  },
  productionSourceMap: false,
}
