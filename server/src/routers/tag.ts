module.exports = (router, crud) => {
  // 获取标签
  router.get("/tag/queryTags", async (ctx: any) => {
    let data = await crud("SELECT * FROM `tags`", []);
    ctx.body = data;
  });
};
