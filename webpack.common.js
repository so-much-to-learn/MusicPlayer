const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

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
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            {
                test: /\.scss$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }]
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
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
        })
    ]
}
