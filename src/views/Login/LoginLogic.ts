import { reactive, ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import request from '@/hook/network/request';
import { useRouter } from 'vue-router';
import { formRules } from '@/types/formRules';
import { Result } from '@/types/requestType';

type loginLogic = {
  state: {
    form: {
      username: string;
      password: string;
    };
    rules: {
      username: formRules[];
      password: formRules[];
    };
    loading: boolean;
  };
  loginForm: unknown;
  login: () => void;
  resetForm: () => void;
};

const loginLogic = (): loginLogic => {
  const state = reactive({
    // 表单绑定数据
    form: {
      username: '',
      password: '',
    },
    // 表单验证规则
    rules: {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 1, max: 99, message: '长度在 1 到 99 个字符', trigger: 'blur' },
      ],
    },
    // 加载状态
    loading: false,
  });

  // 表单对象
  const loginForm = ref<typeof ElForm>();
  // 路由
  const router = useRouter();

  // 登录时请求方法
  const loginRequest = async () => {
    const result: Result = await request({
      method: 'POST',
      url: 'login',
      data: state.form,
    });
    // 返回状态验证
    switch (result.meta.msg) {
      case '登录成功':
        ElMessage({
          showClose: true,
          message: '登录成功！',
          type: 'success',
        });
        // 保存 token 到 sessionStorage
        sessionStorage.setItem('token', result.data.token);
        // 路由跳转
        router.push('/home');
        break;
      case '密码错误':
        ElMessage({
          showClose: true,
          message: '密码错误！',
          type: 'error',
        });
        break;
      case '用户名不存在':
        ElMessage({
          showClose: true,
          message: '用户不存在！',
          type: 'error',
        });
        break;
      case '无效token':
        ElMessage({
          showClose: true,
          message: '无效token',
          type: 'error',
        });
        break;
    }
  };

  // 登录
  const login = () => {
    if (state.loading) return;
    loginForm.value?.validate(async (validate: boolean) => {
      // 表单验证
      if (validate) {
        state.loading = true;
        // 尝试发送请求
        try {
          await loginRequest();
        } catch (e) {
          console.error(e);
          ElMessage.error('请求发送失败');
        } finally {
          state.loading = false;
        }
      }
    });
  };

  // 重置表单
  const resetForm = () => {
    loginForm.value?.resetFields();
  };

  return {
    state,
    loginForm,
    login,
    resetForm,
  };
};

export default loginLogic;
