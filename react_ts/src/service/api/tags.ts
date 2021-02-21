import request from "../requrest";

// 获取标签
export async function queryTags(options: any) {
  const data = { ...options };
  return request("/tag/queryTags1", {
    method: "get",
    data,
  });
}
