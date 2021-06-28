import { CheckPhone } from '@/hook/common/formValidate';
import { ElForm } from 'element-plus';

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
    }
  | {
      validator: CheckPhone;
      trigger: string;
    };

// 表单类型
export type formRef = InstanceType<typeof ElForm>;
