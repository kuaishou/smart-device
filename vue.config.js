let baseUrl = '/eb-web/vue/smart-device'
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const Jarvis = require("webpack-jarvis");
const path = require('path')
let isProduction = process.env.NODE_ENV == 'production'
if (!isProduction) {
    console.log('********************测试环境打包*********************');
    // baseUrl = 'https://stest.sinosafe.com.cn/eb-web/vue/smart-device'
} else if (isProduction) {
    console.log('********************生产环境打包*********************');
    // baseUrl = 'https://s.sinosafe.com.cn/eb-web/vue/smart-device'
}
process.env.version = '测试'
module.exports = {
    // baseUrl: process.env.NODE_ENV === 'production'
    // ? '/eb-web/vue/smart-device/'
    // : '/',
    productionSourceMap: false,
    baseUrl: baseUrl,
    // assetsDir:"smart-device/",
    // outputDir:"/eb-web/vue/smart-device/",
    pages: {
        // index: {
        //     // entry for the page
        //     entry: 'src/entry/index/main.ts',
        //     // the source template
        //     template: 'public/index.html',
        //     // output as dist/index.html
        //     filename: 'index/index.html',
        //     // when using title option,
        //     // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        //     // title: '华安',
        //     // chunks to include on this page, by default includes
        //     // extracted common chunks and vendor chunks.
        //     chunks: ['chunk-vendors', 'chunk-common', '/js/index']
        // },
        // when using the entry-only string format,
        // template is inferred to be `public/subpage.html`
        // and falls back to `public/index.html` if not found.
        // Output filename is inferred to be `subpage.html`.
        index: 'src/entry/main.ts',
        // hag: 'src/entry/hag/main.ts',
        // bypw: 'src/entry/bypw/main.ts'     
        // },
        // main: 'src/entry/main/main.ts',
    },
    devServer: {
        proxy: 'https://mtest.sinosafe.com.cn'
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                './src/common/vui/layout/fn.less',
            ]
        }
    },
    css: {
        loaderOptions: {

            postcss: {
                plugins: [require('postcss-px2rem')({
                    remUnit: 108
                })]
            },
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require("./public/vendor/vendor-manifest.json")
            }),
            new AddAssetHtmlPlugin({
                filepath: path.resolve(__dirname, './public/vendor/*.js'),
                hash:true,
                // dll 引用路径
                publicPath: './vendor',
                // dll最终输出的目录
                outputPath: './vendor'
            })
        ]
    },
    // configureWebpack: config => {
    //     config.plugins.push(
    //         new Jarvis({
    //             port: 1337 // optional: set a port
    //         })
    //     )
    //     return config
    // },
    chainWebpack: config => {
        config.module
            .rule('file')
            .test(/\.htm$/)
            .use('file-loader')
            .loader('file-loader')
            .tap(options => {
                options = {
                    name: '[name].[hash:8].[ext]',
                    outputPath: './file'
                }
                return options
            });

        if (isProduction) {
            //配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你
            // 性能警告显示方式 error错误 warning警告
            // config.performance.hints('error')
            // config.performance.hints('error')
            // 入口总大小400k
            config.performance.maxEntrypointSize(400 * 1000)
            // 单个文件250k
            config.performance.maxAssetSize(250 * 1000)
            //    console.log('**=',)
        } else {
            const isLegacyBundle = process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD
            const version = +new Date();
            config.mode('development')
                // .output()
                .output
                .filename(isLegacyBundle ? 'js/[name]-legacy.js?' + version : 'js/[name].js?' + version)
        }



    }
}