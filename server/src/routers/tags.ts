module.exports = (router, crud) => {
  // 获取标签
  router.get("/tag/queryTags", async (ctx: any) => {
    let countData = await crud('SELECT * FROM `tags` WHERE state = ? ', [0]);
    if (!countData.success) {
        ctx.body = {
            success: false,
            msg: '获取标签失败！'
        }
        return;
    }
    ctx.body = {
        success: true,
        list: countData.data,
        msg: '获取标签成功！'
    }
  });

  // 添加标签
  router.post("/tag/addTag", async (ctx: any) => {
    const params: any = ctx.request.body;
    let countData = await crud('SELECT * FROM `tags` WHERE state = ? AND tagName =? ', [0, params.categoryName]);
    if (countData.data.length > 0) {
      ctx.body = {
        success: false,
        msg: '该标签已存在！'
      }
      return;
    }
    let addTag = await crud('INSERT INTO `tags` SET ?', params);
    if (!addTag.success) {
      ctx.body = {
        success: false,
        msg: '添加标签失败！'
      }
      return;
    }
    ctx.body = {
      success: true,
      msg: '添加标签成功！'
    }
  });
};
