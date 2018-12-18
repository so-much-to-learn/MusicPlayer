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
    mode: 'production',
    output: {
        ...common.output,
        filename: 'js/[name].[chunkhash].js'
    },
    plugins: [
        ...common.plugins,
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })
    ]
})

module.exports = devConfig
