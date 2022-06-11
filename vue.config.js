const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const defaultSettings = require('./src/settings.js')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)/i

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || '' // page title

const port = process.env.port || process.env.npm_config_port || 8080 // dev port

const isDev = process.env.NODE_ENV === 'development' // 开发环境

module.exports = defineConfig({
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: isDev,
    productionSourceMap: false,
    devServer: {
        port: port,
        open: false,
        proxy: {
            // 代理所有以‘/api’开头的网络请求
            '/api': {
                target: `http://192.168.40.7:8182/`,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                    @import "~@/styles/variables.scss";
                    @import "~@/styles/mixin.scss";
                    @import "~@/styles/transition.scss";
                `
            }
        }
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap((options) => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config
            // https://webpack.js.org/configuration/devtool/#development
            .when(isDev, (config) => config.devtool('cheap-source-map'))

        // 打包压缩
        config.when(!isDev, (config) => {
            config.plugin('compressionPlugin').use(
                new CompressionPlugin({
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240, // 单位字节（bytes），大于10k才会进行压缩
                    minRatio: 0.8, // 默认压缩率，压缩结果低于该值才会进行压缩
                    deleteOriginalAssets: false // 是否删除源文件，建议不删，防止某些浏览器无法解析gzip时可以使用源文件显示
                })
            )
        })

        config.when(!isDev, (config) => {
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // only package third parties that are initially dependent
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    },
                    ehcarts: {
                        name: 'chunk-echarts', // split echarts into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?echarts(.*)/ // in order to adapt to cnpm
                    },
                    threejs: {
                        name: 'chunk-thressjs', // split three into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?three(.*)/ // in order to adapt to cnpm
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            })
            config.optimization.runtimeChunk('single')
        })

        // bundle analyzer
        // config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin)
    }
})
