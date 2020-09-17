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
    ]
}