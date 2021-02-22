import request from "../requrest";

// 添加分类
export async function addCategory(options: any) {
    const data = { ...options };
    return request("/category/addCategory", {
        method: "post",
        data,
    });
}

// 获取分类
export async function queryCategory(options: any) {
    const data = { ...options };
    return request("/category/queryCategory", {
        method: "get",
        data,
    });
}