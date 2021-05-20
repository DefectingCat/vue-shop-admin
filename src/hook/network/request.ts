import axios from 'axios';
const request = axios.create({
  // baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
  timeout: 5000,
});
// 响应拦截器
request.interceptors.response.use((value) => {
  return value.data;
});
// 请求拦截器 在 headers 中添加 token
request.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  token ? (config.headers.Authorization = token) : void 0;
  return config;
});
export default request;
