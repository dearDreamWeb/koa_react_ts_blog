import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:3030/", // 发送请求的前置的url
  timeout: 10000, // 请求超时的时间
  withCredentials: true   // 允许携带cookie
  // headers: {'X-Custom-Header': 'foobar'}      // 请求的headers
});

export default function request(url: string, options: any = {}) {
  if (options.method === "post") {
    return $axios({
      method: options.method,
      url,
      data: options.data,
    });
  } else {
    return $axios({
      method: options.method,
      url,
      params: options.data,
    });
  }
}
