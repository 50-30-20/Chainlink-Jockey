const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
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
            }
        ]
    },
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Output",
            template: path.resolve(__dirname, './src/index.html'), // template file
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: "Webpack Output 2",
            template: path.resolve(__dirname, './src/test.html'), // template file
            filename: 'test.html'
        }),
    ],
    devServer: {
        contentBase: './deploy',
        open: true
    },
    mode: 'development'
};