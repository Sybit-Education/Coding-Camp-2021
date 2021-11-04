module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  pwa: {
    name: '',
    themeColor: '#FF6F00',
    msTileColor: '#FF6F00',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/]
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
