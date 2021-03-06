const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

// fs.open('./src/config/env.js', 'w', function(err, fd) {
//     const buf = 'export default "development";';
//     // node版本太高，原有函数用不了
//     // fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
//     fs.write(fd, buf, 0, 'utf-8', function(err, written, buffer) {});
// });

module.exports = merge(webpackBaseConfig, {
    devServer: {
        contentBase: './',
        historyApiFallback: true,
        port:8080,
        inline: true,
        hot:true,
        compress:true
    }, 
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('./config/dev.env')
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        })
    ]
});