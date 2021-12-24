module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/portfolio-vue/'
    : '/',
  outputDir: 'build',
  assetsDir: 'assets',
  productionSourceMap: false // 生产打包去除sourcemap文件
}