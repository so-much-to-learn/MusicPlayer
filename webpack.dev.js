const merge = require('webpack-merge'),
    common = require('./webpack.common.js'),
    path = require('path'),
    webpack = require('webpack'),
    getAbsolutePath = (relativePath) => {
        return path.resolve(__dirname, relativePath)
    }
// webpackHotMiddleware = 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true';

const devConfig = merge(common, {
    entry: ['webpack-hot-middleware/client?noInfo=true&reload=true', getAbsolutePath('src/App.tsx')],
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./dist",
        compress: true,
        port: 3000,
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
});

// Object.keys(devConfig.entry).forEach((key, i) => {
//     devConfig.entry[key].push(webpackHotMiddleware);
// })
module.exports = devConfig;
