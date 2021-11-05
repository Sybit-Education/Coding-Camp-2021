module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  pwa: {
    name: 'Mülli',
    themeColor: '#FF6F00',
    msTileColor: '#FF6F00',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/],
      // https://github.com/yyx990803/register-service-worker/issues/14
      // https://stackoverflow.com/questions/54145735/vue-pwa-not-getting-new-content-after-refresh
      skipWaiting: true
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 240000
      }
    }
  },
  transpileDependencies: ['vuetify']
}
