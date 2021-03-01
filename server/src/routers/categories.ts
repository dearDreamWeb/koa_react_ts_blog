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
        console.log(ctx.session.info)
        ctx.body = {}
    })
}