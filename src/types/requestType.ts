// 登录请求返回的数据
export type Result = {
  data: {
    token: string;
  };
  meta: {
    msg: string;
    status: number;
  };
  [key: string]: unknown;
};
