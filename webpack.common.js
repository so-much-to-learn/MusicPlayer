const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: {
        index: [resolve('src/App.tsx')]
    },
    output: {
        path: resolve('dist'),
        filename: 'js/[name].js',
        publicPath: 'http://localhost:3000/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
            src: resolve('src'),
            assets: resolve('src/assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['env'] }
                }
            }, {
                test: /\.(ts|tsx)?$/,
                loader: "awesome-typescript-loader"
            }, {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }, {
                test: /\.(png|jpe?g|gif)$/,
                use: [{
                    loader: 'url-loader', options: { limit: 8192, name: 'res/[name].[ext]' }
                }]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                    loader: 'url-loader', options: { limit: 8192, name: 'res/[name].[ext]' }
                }]
            }, {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    externals: {
        "React": "react",
        "ReactDOM": "react-dom",
        "Mobx": "mobx",
        "MobxReact": "mobx-react"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "音乐播放器",
            favicon: './favicon.ico',
            template: "./index.html"
        }),
        new ExtractTextPlugin('css/[name].css'),
        new CleanWebpackPlugin(['dist/**/*'])
    ]
}
