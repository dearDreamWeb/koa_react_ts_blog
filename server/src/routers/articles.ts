module.exports = (router, crud) => {
  // 获取文章
  router.get("/article/queryArticles", async (ctx: any) => {
    let data = await crud("SELECT * FROM `articles`", []);
    ctx.body = data;
  });

  // 添加文章
  router.post("/article/addArticles", async (ctx: any) => {
    let { articleContent, articleLenght } = ctx.request.body;
    let data = await crud("INSERT INTO `articles` SET ?", {
      articleContent,
      articleLenght,
    });
    if (data.success) {
      ctx.body = {
        ...data,
        msg: "发布文章成功",
      };
    } else {
      ctx.body = data;
    }
  });
};
