// 表单验证类型
export type formRules =
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
    };
