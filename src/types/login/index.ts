// 登录请求返回的数据
export type result = {
  data: {
    token: string;
  };
  meta: {
    msg: string;
    status: number;
  };
  [key: string]: unknown;
};

export type loginLogic = {
  state: {
    form: {
      username: string;
      password: string;
    };
    rules: {
      username: (
        | {
            required: boolean;
            message: string;
            trigger: string;
            min?: undefined;
            max?: undefined;
          }
        | {
            min: number;
            max: number;
            message: string;
            trigger: string;
            required?: undefined;
          }
      )[];
      password: (
        | {
            required: boolean;
            message: string;
            trigger: string;
            min?: undefined;
            max?: undefined;
          }
        | {
            min: number;
            max: number;
            message: string;
            trigger: string;
            required?: undefined;
          }
      )[];
    };
    loading: boolean;
  };
  loginForm: unknown;
  login: () => void;
  resetForm: () => void;
};
