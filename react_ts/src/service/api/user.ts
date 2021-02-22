import request from "../requrest";


export async function api(options: any) {
  const data = { ...options };
  return request("/api", {
    method: "get",
    data,
  });
}

export async function getInfo(options: any) {
  const data = { ...options };
  return request("/getInfo", {
    method: "get",
    data,
  });
}
