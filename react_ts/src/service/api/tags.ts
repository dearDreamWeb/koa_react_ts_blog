import request from "../requrest";

// 获取标签
export async function queryTags(options: any) {
  const data = { ...options };
  return request("/tag/queryTags", {
    method: "get",
    data,
  });
}

// 添加标签
export async function addTag(options: any) {
  const data = { ...options };
  return request("/tag/addTag", {
    method: "post",
    data,
  });
}
