module.exports = (app: any) => {
  const router = require("koa-router")();
  const crud = require("../crud");

  app.use(router.routes()); // 启动路由

  // 标签
  require("./tags")(router, crud);

  // 文章
  require("./articles")(router, crud);
};
