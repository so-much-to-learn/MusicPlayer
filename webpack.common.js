const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const getAbsolutePath = (relativePath) => {
    return path.resolve(__dirname, relativePath)
}

module.exports = {
    entry: {
        main: [getAbsolutePath('src/App.tsx')]
    },
    output: {
        path: getAbsolutePath('dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
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
