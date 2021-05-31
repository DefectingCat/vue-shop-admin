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
