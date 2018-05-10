var path = require('path')

module.exports = {
  build: {
    env: require('./prod'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './static',
    assetsPublicPath: './',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev'),
    port: 8808,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/'
  }
}
