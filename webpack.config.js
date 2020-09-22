let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin") //抽离css插件
let OptimizeCss = require("optimize-css-assets-webpack-plugin") //压缩css
let UglifyJs = require("uglifyjs-webpack-plugin")

module.exports = {
    optimization: {
        //优化项  用到了optimicss。。。 那个插件
        minimizer: [
            new UglifyJs({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCss()
        ]

    },
    mode: "production",
    entry: "./src/index.js", //开始打包的文件夹
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    // webpack本地服务器配置
    devServer: {
        port: 3000,
        progress: true,
        contentBase: "./dist"
    },
    plugins: [
        // 放置插件
        // 此插件用户生成模板文件导出指定目录，并在此目录引入js
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            // minify: {
            //     removeAttributeQuotes: true, //去掉双引号
            //     collapseWhitespace: true, //折叠一行
            // },
            hash: true, //生成哈希戳
        }),
        // 此插件是为了抽离css样式  然后导出css文件， 
        new MiniCssExtractPlugin({
            filename: "main.css"
        })
    ],
    module: {
        rules: [
            // css-loader  主要处理@import 引入的css样式
            // style-loader  将css插入到head标签中
            // 如果是单个loader 可以用字符串  如果用多个loader则需要用到数组
            //    并且顺序是从后往前，在这里就是先解析css  然后插入到header中
            //   同时loader 也可以写成对象  这样可以进行传参数
            // 不希望抽离出来的css样式再放到head里，所以用MiniCssExtractPlugin.loader 将抽离出的
            //    样式以link的形式放到html内
            {
                test: /\.css$/,
                use: [
                    // "style-loader"
                    MiniCssExtractPlugin.loader, //此步骤就是代替style-loader,不是插到header标签
                    // 是将抽离出来的css样式以link的形式引入到html 内
                    'css-loader',
                    // "postcss-loader"
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: [
                    //             require('autoprefixer') //postcss-loader会叫autoprefixer插件添加浏览器前缀
                    //         ]
                    //     }
                    // }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // "style-loader"
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                ]
            }
        ]
    }
}