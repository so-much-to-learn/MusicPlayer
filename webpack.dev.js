const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')
// const packageConfig = require('./package.json')
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpackHotMiddleware = 'webpack-hot-middleware/client?path=/__webpack_hmr&&noInfo=true&reload=true';
// 配置
// const host = require('ip').address()
const host = "localhost"
const port = 3000

const devConfig = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        ...common.output,
        filename: 'js/[name].[hash].js' // chunkhash和hot冲突，在dev中用hash代替
    },
    // devServer: {
    //     contentBase: "./dist",
    //     compress: true,
    //     port: 3000,
    //     publicPath: '/'
    // },
    plugins: [
        ...common.plugins,
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        // new FriendlyErrorsPlugin({
        //     compilationSuccessInfo: {
        //         messages: [`Your application is running here: http://${host}:${port}`]
        //     },
        //     onErrors: createNotifierCallback()
        // }),
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
        // new OpenBrowserPlugin({ url: `http://${host}:${port}` }) // 自动打开网页
    ]
})

// function createNotifierCallback() {
//     const notifier = require('node-notifier')

//     return (severity, errors) => {
//         if (severity !== 'error') return

//         const error = errors[0]
//         const filename = error.file && error.file.split('!').pop()

//         notifier.notify({
//             title: packageConfig.name,
//             message: severity + ': ' + error.name,
//             subtitle: filename || '',
//             icon: path.join(__dirname, 'logo.png')
//         })
//     }
// }
Object.keys(devConfig.entry).forEach((key, i) => {
    devConfig.entry[key].push(webpackHotMiddleware);
})
module.exports = devConfig
