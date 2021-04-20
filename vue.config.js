module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Liang-Shih Lin\'s Portfolio Site'
        return args
      })
  },
  transpileDependencies: [
    'vuetify'
  ]
}
