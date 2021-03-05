module.exports = (router, crud) => {
    // 添加分类
    router.post("/category/addCategory", async (ctx: any) => {
        const params: any = ctx.request.body;
        let countData = await crud('SELECT * FROM `categories` WHERE state = ? AND categoryName =? ', [0, params.categoryName]);
        if (countData.data.length > 0) {
            ctx.body = {
                success: false,
                msg: '该分类已存在！'
            }
            return;
        }
        let addCate = await crud('INSERT INTO `categories` SET ?', params);
        if (!addCate.success) {
            ctx.body = {
                success: false,
                msg: '添加分类失败！'
            }
            return;
        }
        ctx.body = {
            success: true,
            msg: '添加分类成功！'
        }
    });

    // 获取分类
    router.get('/category/queryCategory', async (ctx: any) => {
        let countData = await crud('SELECT * FROM `categories` WHERE state = ? ', [0]);
        if (!countData.success) {
            ctx.body = {
                success: false,
                msg: '获取分类失败！'
            }
            return;
        }
        ctx.body = {
            success: true,
            list: countData.data,
            msg: '获取分类成功！'
        }
    })

    // 获取各个分类详情
    router.get('/category/queryAllCategory', async (ctx: any) => {
        const { id } = ctx.query;
        let categories: any[] = [];
        if (!ctx.session.info) {
            let cateData = await crud("SELECT * FROM `categories`", []);
            categories = cateData.data;
        } else {
            categories = ctx.session.info.categories;
        }

        if (id) {
            let cateData = await crud("SELECT * FROM `articles` WHERE categoryId =? ORDER BY createdDate DESC", [id]);
            let cateInfo: any = {};
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].categoryId === Number(id)) {
                    cateInfo = categories[i];
                }
            }
            ctx.body = {
                success: true,
                data: [{
                    categoryId: cateInfo.categoryId,
                    categoryName: cateInfo.categoryName,
                    lists: cateData.data,
                    total: cateData.data.length,
                    cateLists: categories
                }]
            }
            return;
        }

        let resultData: any = {
            cateLists: categories,
            total: 0
        };

        for (let i = 0; i < categories.length; i++) {
            let cateData = await crud("SELECT * FROM `articles` WHERE categoryId =? ORDER BY createdDate DESC", [categories[i].categoryId])
            resultData.total += 1;
            resultData.cateLists[i].lists = cateData.data;
        }


        ctx.body = {
            success: true,
            data: resultData
        }
    })
}