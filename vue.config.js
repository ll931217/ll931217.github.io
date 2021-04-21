const path = require('path')

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Liang-Shih Lin\'s Portfolio Site'
        return args
      })
  },
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src')
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
