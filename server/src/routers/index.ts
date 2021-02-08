module.exports = (app: any) => {
  const router = require("koa-router")();
  const crud = require("../crud");

  app.use(router.routes()); // 启动路由

  router.get("/api", (ctx: any) => {
      ctx.session.userInfo = ctx.query;
      console.log(ctx.session);
    ctx.body = "ok";
  });

  router.get("/getInfo", (ctx: any) => {
    console.log(ctx.session.userInfo);
    ctx.body = "ok";
  });

  // router.get('/a', async (ctx: any) => {
  //     crud('INSERT INTO `koa_test` SET ?', { id: 3, name: '大力', password: '123456' }, (data: any) => {
  //         console.log(data)
  //     })
  // })
};
