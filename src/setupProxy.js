const proxy = require("http-proxy-middleware")
// 代理数据，测试
module.exports = function (app) {
    app.use(
        proxy("/api/**", {
            target: "http://192.168.3.36:9000",
            changeOrigin: true
        })
    );
};