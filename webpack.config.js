const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    //target: 'node',
    // node: {
    //     __dirname: false
    // },
    // externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.node$/,
                loader: "node-loader",
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Output",
            template: path.resolve(__dirname, './src/index.html'), // template file
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: './src/index.html',
                to: './src/index.html',
            }]
        }),
    ],
    devServer: {
        contentBase: './deploy',
        open: true
    },
    mode: 'development',
    resolve: {
        alias: {
            'node_modules': path.join(__dirname, 'node_modules'),
            'bower_modules': path.join(__dirname, 'bower_modules'),
        }
    }
};