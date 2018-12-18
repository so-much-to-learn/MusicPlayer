const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

app.set('views', path.join(__dirname, '.dist'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

const webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require("webpack-hot-middleware"),
    config = require('./webpack.dev.js'),
    compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    hot: true
}));
app.use(webpackHotMiddleware(compiler));

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

app.use("*", (req, res) => {
    res.render("index")
})