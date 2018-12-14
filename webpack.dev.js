const merge = require('webpack-merge'),
    common = require('./webpack.common.js'),
    path = require('path');
// webpackHotMiddleware = 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true';

const devConfig = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./dist",
        compress: true,
        port: 3000,
        publicPath: '/'
    }
});

// Object.keys(devConfig.entry).forEach((key, i) => {
//     devConfig.entry[key].push(webpackHotMiddleware);
// })
module.exports = devConfig;
