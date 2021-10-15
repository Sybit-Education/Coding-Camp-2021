module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  pwa: {
    name: '',
    themeColor: '#E91E63',
    msTileColor: '#E91E63',
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
