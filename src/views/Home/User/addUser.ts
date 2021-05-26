import { State } from './UserLogic';
import userRequest from './UserRequest';
import { ref } from '@vue/reactivity';
import { ElMessage } from 'element-plus';
import { Ref } from 'vue';
import UserDialog from '@/components/common/UserDialog.vue';

type toAddUser = {
  addUser: () => void;
  formRef: Ref<typeof UserDialog>;
  addUserRequset: () => void;
};

/**
 * 这里是添加用户的方法
 * @param {State} 传入 state 用于保存状态
 * @return {toAddUser} 添加用户的表单实例与方法
 */
const toAddUser = (state: State): toAddUser => {
  // 请求方法
  const { getUsers, postUser } = userRequest(state);

  // 添加用户
  const addUser = () => {
    // 打开 dialog
    state.dialogVisible = true;
  };

  // 添加用户表单对象
  const formRef = ref();

  // 发送添加用户请求
  const addUserRequset = () => {
    // 拿到子组件
    const formNode = formRef.value.$refs.formRef;
    formNode.validate(async (validate: boolean) => {
      // 验证表单
      if (!validate) return;

      // 修改按钮加载状态
      state.loading = true;
      // 发送请求
      const result = await postUser(state.addUserForm);

      // 返回状态验证
      switch (result.meta.msg) {
        case '创建成功':
          ElMessage.success('创建成功');
          // 关闭 dialog
          state.dialogVisible = false;
          // 创建成功时重置表单
          formNode.resetFields();
          break;
        case '用户名已存在':
          ElMessage.error('用户名已存在');
          break;
        case '请求发送失败':
          throw new Error('请求发送失败');
      }

      // 修改按钮加载状态
      state.loading = false;
      // 重新获取用户列表
      getUsers();
    });
  };

  return {
    addUser,
    formRef,
    addUserRequset,
  };
};

export default toAddUser;
