let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "development",
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
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            minify: {
                removeAttributeQuotes: true, //去掉双引号
                collapseWhitespace: true, //折叠一行
            },
            hash: true, //生成哈希戳
        })
    ],
    module: {
        rules: [
            // css-loader  主要处理@import 引入的css样式
            // style-loader  将css插入到head标签中
            // 如果是单个loader 可以用字符串  如果用多个loader则需要用到数组
            //    并且顺序是从后往前，在这里就是先解析css  然后插入到header中
            //   同时loader 也可以写成对象  这样可以进行传参数
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}