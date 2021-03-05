module.exports = (router, crud) => {

  const moment = require('moment');
  const { randomHash } = require('../utls/index');

  // 获取文章
  router.get("/article/queryArticles", async (ctx: any) => {
    let data = await crud("SELECT * FROM `articles`", []);
    if (!data.success) {
      ctx.body = {
        success: false
      };
      return;
    }
    data.forEach(async (item) => {
      let cateData = await crud("SELECT * FROM `categories` WHERE categoryId=?", [item.categoryId]);
      let tagData = await crud("SELECT * FROM `tags_articles` WHERE articleId=?", [item.articleId]);
      data.categories = cateData.data;
      data.tags = tagData.data;
    })
    ctx.body = data;
  });

  // 添加文章
  router.post("/article/addArticles", async (ctx: any) => {
    let { articleContent, categoryId, tagArrId, articleLenght, articleTitle } = ctx.request.body;
    let randomId = randomHash();
    let data = await crud("INSERT INTO `articles` SET ?", { articleId: randomId, articleContent, categoryId, articleLenght, articleTitle });

    if (!data.success) {
      ctx.body = {
        success: false,
        msg: '发布文章失败'
      };
    } else {
      let errorCount: number = 0;
      for (let i = 0; i < tagArrId.length; i++) {
        let articleTagData = await crud("INSERT INTO `tags_articles` SET ?", { articleId: randomId, tagId: tagArrId[i] })
        if (!articleTagData.success) {
          errorCount++;
        }
      }
      if (errorCount === 0) {
        ctx.body = {
          success: true,
          msg: '发布文章成功'
        };
      } else {
        ctx.body = {
          success: false,
          msg: '发布文章失败'
        };
      }
    }


  });

  // 获取分类、标签和文章
  router.get("/article/cateTags", async (ctx: any) => {
    let cateData = await crud("SELECT * FROM `categories` WHERE state =?", [0]);
    let tagData = await crud("SELECT * FROM `tags` WHERE state =?", [0]);
    let articlesData = await crud("SELECT * FROM `articles` WHERE state =? ORDER BY `createdDate` desc", [0]);
    if (!cateData.success || !tagData.success || !articlesData.success) {
      ctx.body = {
        success: false,
        msg: '获取数据失败'
      }
      return;
    }
    // 把文章的标签和分类整合起来
    let newArticlesData: any = [...articlesData.data];
    for (let i = 0; i < newArticlesData.length; i++) {
      let cateData = await crud("SELECT * FROM `categories` WHERE categoryId=?", [newArticlesData[i].categoryId]);
      let articleTagData = await crud("SELECT * FROM `tags_articles` WHERE articleId=?", [newArticlesData[i].articleId]);
      let newTagData: any[] = [];
      for (let j = 0; j < articleTagData.data.length; j++) {
        let tagInfo = await crud("SELECT * FROM `tags` WHERE tagId=?", [articleTagData.data[j].tagId]);
        newTagData.push(tagInfo.data[0]);
      }
      newArticlesData[i]['categories'] = cateData.data;
      newArticlesData[i]['tags'] = newTagData;
    }
    // 去掉文章的内容存入session，否则内容过大会是session失效
    let sessionArticlesData = JSON.parse(JSON.stringify(newArticlesData));
    sessionArticlesData = sessionArticlesData.map((item => {
      delete item.articleContent;
      return item;
    }))
    // 存入session
    ctx.session.info = {
      categories: cateData.data,
      tags: tagData.data,
      articles: sessionArticlesData
    }

    ctx.body = {
      success: true,
      categories: cateData.data,
      tags: tagData.data,
      articles: newArticlesData,
      msg: '获取数据成功'
    }
  });

  // 获取文章的上一篇和下一篇
  router.get('/article/getArticlePreNext', async (ctx: any) => {
    const { articleId, type, typeId } = ctx.query;
    let currentArticleIndex: number = 0;
    let addRead = await crud("UPDATE `articles` SET readCount=readCount+1 WHERE articleId = ?", [articleId]);
    let articlesData: any = [];

    // 判断从分类，标签等过来的，重新规划
    switch (type) {
      case null:
        articlesData = await crud("SELECT * FROM `articles` WHERE state =? ORDER BY `createdDate` desc", [0]);
        break;
      case 'category':
        articlesData = await crud("SELECT * FROM `articles` WHERE state =? AND categoryId=? ORDER BY `createdDate` desc", [0, typeId]);
        break;
      default:
        articlesData = await crud("SELECT * FROM `articles` WHERE state =? ORDER BY `createdDate` desc", [0]);
        break;
    }

    if (!articlesData.success || !addRead.success) {
      ctx.body = {
        success: false,
      }
      return;
    }
    for (let i = 0; i < articlesData.data.length; i++) {
      if (articlesData.data[i].articleId === articleId) {
        currentArticleIndex = i;
      }
    }

    ctx.body = {
      success: true,
      prevInfo: articlesData.data[currentArticleIndex - 1]
        ? {
          articleId: articlesData.data[currentArticleIndex - 1].articleId,
          title: articlesData.data[currentArticleIndex - 1].articleTitle
        }
        : null,
      nextInfo: articlesData.data[currentArticleIndex + 1]
        ? {
          articleId: articlesData.data[currentArticleIndex + 1].articleId,
          title: articlesData.data[currentArticleIndex + 1].articleTitle
        }
        : null,
    }
  })

  // 获取指定文章的信息
  router.get('/article/getArticleInfo', async (ctx: any) => {
    const { articleId } = ctx.query;
    let data = await crud("SELECT * FROM `articles` WHERE articleId=?", [articleId]);
    if (!data.success) {
      ctx.body = {
        success: false
      }
      return;
    }
    ctx.body = {
      success: true,
      info: data.data[0]
    }
  })
};
