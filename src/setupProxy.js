const proxy = require("http-proxy-middleware")
// 代理数据，测试
module.exports = function(app) {
  app.use(
    proxy("/use/**", {
      target: "http://api.nnzhp.cn/api/",
      changeOrigin: true
    })
  );
};