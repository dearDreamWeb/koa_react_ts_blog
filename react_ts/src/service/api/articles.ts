import request from "../requrest";

// 发布文章
export async function addArticles(options: any) {
  const data = { ...options };
  return request("/article/addArticles", {
    method: "post",
    data,
  });
}

// 获取分类和标签
export async function cateTags(options: any) {
  const data = { ...options };
  return request("/article/cateTags", {
    method: "get",
    data,
  });
}

// 获取文章的上一篇和下一篇
export async function getArticlePreNext(options: any) {
  const data = { ...options };
  return request("/article/getArticlePreNext", {
    method: "get",
    data,
  });
}