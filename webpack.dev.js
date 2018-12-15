const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')
const packageConfig = require('./package.json')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 配置
const host = require('ip').address()
const port = 9903

const devConfig = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host, port,
        clientLogLevel: 'warning',
        // hot: true,           // 大佬帮弄一下
        quiet: true,
        contentBase: "./dist",
        compress: true,
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${host}:${port}`]
            },
            onErrors: createNotifierCallback()
        })
    ]
})

function createNotifierCallback() {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}

module.exports = devConfig
