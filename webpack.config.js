/**
 * Created by ever on 2019/10/30.
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const Webpack = require('webpack')

module.exports = {
    optimization: { // 优化项
        minimizer: [
            new UglifyWebpackPlugin({
                cache: true, // 是否使用缓存
                parallel: true, // 是否并发打包
                sourceMap: true // 是否生成sourceMap
            }),
            new OptimizeCss({})
        ]
    },
    mode: "development", // production 生产模式, development 开发模式
    entry: './src/index.js', // 打包入口
    output: {
        filename: "bundle.[hash:8].js", // 打包后的出口文件名
        path: path.resolve(__dirname, 'dist') // 路径必须是一个绝对路径
    },
    devServer: {
        port: 3880,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    plugins: [ // 数组, 放着所有的插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
        // new Webpack.ProvidePlugin({
        //     $: 'jquery'
        // })
    ],
    externals: {
        jquery: '$'
    },
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: 'expose-loader?$'
            },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: "eslint-loader",
            //         options: {
            //             enforce: 'pre'
            //         }
            //     },
            //     include: path.resolve(__dirname, 'src'),
            //     exclude: /node_moudules/
            // },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env"
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", {"legacy": true}],
                            ["@babel/plugin-proposal-class-properties", {"loose": true}],
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/
            },
            /* css-loader 解析 @import 这种语法的,
               style-loader 把css插入到head的标签中
               loader的特点 希望单一
               loader的用法 字符串只用一个loader
               多个loader需要 []
               loader的顺序 默认是从右向左执行, 从下向上执行
               loader还可以写成对象方式
            */
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", // 解析@import这种语法
                    "postcss-loader",
                    "less-loader" // 把less文件转换成css文件
                ]
            }
        ]
    }
}