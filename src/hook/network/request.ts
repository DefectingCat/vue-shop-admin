import axios from 'axios';
import { ElLoading } from 'element-plus';
import { nextTick } from 'vue';
const request = axios.create({
  // baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  // baseURL: 'http://timemeetyou.com:8889/api/private/v1/',
  // baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
  baseURL: 'http://192.168.0.103:3000/api/private/v1/',
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

/**
 * 该函数通过回调请求函数
 * 请求数据时为表格添加加载状态
 * @param  {string} target ElLoading 用于选中 DOM 的 css 选择器
 * @param  {()=>Promise<void>} req 请求函数
 */
export const toLoadingRequest = async (
  target: string,
  req: () => Promise<void>
): Promise<void> => {
  await nextTick();
  const loading = ElLoading.service({
    target,
    lock: true,
  });

  await req();
  // 加载完成，关闭 loading
  loading.close();
};

export default request;
