module.exports = (router, crud) => {

  const moment = require('moment');

  // 获取文章
  router.get("/article/queryArticles", async (ctx: any) => {
    let data = await crud("SELECT * FROM `articles`", []);
    ctx.body = data;
  });

  // 添加文章
  router.post("/article/addArticles", async (ctx: any) => {
    let params: any = ctx.request.body;
    let data = await crud("INSERT INTO `articles` SET ?", params);
    if (data.success) {
      ctx.body = {
        ...data,
        msg: "发布文章成功",
      };
    } else {
      ctx.body = data;
    }
  });

  // 获取分类和标签
  router.get("/article/cateTags", async (ctx: any) => {
    let cateData = await crud("SELECT * FROM `categories` WHERE state =?", [0]);
    let tagData = await crud("SELECT * FROM `tags` WHERE state =?", [0]);
    if (!cateData.success || !tagData.success) {
      ctx.body = {
        success: false,
        msg: '获取数据失败'
      }
      return;
    }
    ctx.body = {
      success: true,
      categories: cateData.data,
      tags: tagData.data,
      msg: '获取数据成功'
    }
  });
};
