import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:3030/", // 发送请求的前置的url
  withCredentials: true,   // 允许携带cookie
  timeout: 10000, // 请求超时的时间
  // headers: {'X-Custom-Header': 'foobar'}      // 请求的headers
});  

export default async function request(url: string, options: any = {}) {
  if (options.method === "post") {
    let res = await $axios({
      method: options.method,
      url,
      data: options.data,
    });
    return res.data;
  } else {
    let res = await $axios({
      method: options.method,
      url,
      params: options.data,
    });
    return res.data;
  }
}
