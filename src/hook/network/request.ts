import axios, { AxiosInstance } from 'axios';
const request = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 5000,
});
request.interceptors.response.use((value) => {
  return value.data;
});
export default request;
