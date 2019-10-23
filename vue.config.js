module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/todo-vue/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/main.scss";',
      },
    },
  },
}
