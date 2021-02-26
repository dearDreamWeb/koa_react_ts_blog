module.exports = (router, crud) => {
    const request = require('request');

    // 获取掘金的文章，如果没有limit参数默认是获取5条数据
    router.get('/resources/goldArticles', async (ctx: any) => {
        const { limit } = ctx.request.body;

        let arr: any[] = await new Promise((reslove) => {
            request({
                url: 'https://e.xitu.io/resources/gold',
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: {
                    category: "backend",
                    limit: limit ? limit : 5,
                    offset: 0,
                    order: "heat",
                }
            }, function (error, response, body) {
                reslove(body);
            })
        })
        ctx.body = arr;
    });

    // 获取github每周的文章，如果没有limit参数默认是获取5条数据
    router.get('/resources/githubArticles', async (ctx: any) => {
        const { limit } = ctx.request.body;
        let arr: any[] = await new Promise((reslove) => {
            request({
                url: 'https://e.xitu.io/resources/github',
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: {
                    category: "trending",
                    lang: "javascript",
                    limit: limit ? limit : 5,
                    offset: 0,
                    period: "week",
                }
            }, function (error, response, body) {
                reslove(body);
            })
        })
        ctx.body = arr;
    })
}