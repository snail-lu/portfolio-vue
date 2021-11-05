module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-demo/'
    : '/',
  outputDir: 'build',
  assetsDir: 'assets',
  productionSourceMap: false // 生产打包去除sourcemap文件
}