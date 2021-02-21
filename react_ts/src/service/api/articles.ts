import request from "../requrest";

// 发布文章
export async function addArticles(options: any) {
  const data = { ...options };
  return request("/article/addArticles", {
    method: "post",
    data,
  });
}
