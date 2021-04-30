const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('html-loader')
        .loader('html-loader')
        .end()
      .use('markdown-loader')
        .loader('markdown-loader')
        .end()
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: '0.0.0.0'
  }
}
