// 登录请求返回的数据
export type Roles = {
  id: number;
  roleName: string;
  roleDesc: string;
  children: [
    {
      id: number;
      authName: string;
      path: null;
      children: [
        {
          id: number;
          authName: string;
          path: null;
          children: [
            {
              id: number;
              authName: string;
              path: null;
            }
          ];
        }
      ];
    }
  ];
};

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

export const failResult: Result = {
  data: {
    token: '1',
  },
  meta: {
    msg: '请求发送失败',
    status: 400,
  },
};
