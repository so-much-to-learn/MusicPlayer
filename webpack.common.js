const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const host = require('ip').address()

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: {
        main: [resolve('src/App.tsx')]
    },
    output: {
        path: resolve('dist'),
        filename: '[name].js'
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
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.scss$/,
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
            template: "index.html"
        }),
        new ExtractTextPlugin('index.css')
    ]
}
