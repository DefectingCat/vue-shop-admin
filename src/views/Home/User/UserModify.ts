import { State } from './UserLogic';
import userRequest from './UserRequest';
import { ref } from '@vue/reactivity';
import { ElMessage } from 'element-plus';
import { Ref } from 'vue';
import UserDialog from '@/components/common/UserDialog.vue';

type ModifyUser = {
  changeUserState: (userInfo: State['userList'][1]) => void;
  searchUser: () => void;
  addUser: () => void;
  formRef: Ref<typeof UserDialog>;
  editFormRef: Ref<typeof UserDialog>;
  addUserRequset: () => void;
  editUser: (row: State['userList'][1]) => void;
  editUserRequest: () => Promise<void>;
};

/**
 *
 *
 *
 */
const modifyUser = (state: State): ModifyUser => {
  // 请求方法
  const { getUsers, changeState, postUser, editUserReq } = userRequest(state);

  // 修改用户状态
  // type: State 中 userList 中的某一条
  const changeUserState = (userInfo: State['userList'][1]) => {
    changeState(userInfo);
  };

  // 搜索用户
  const searchUser = () => {
    getUsers();
  };

  // 添加用户
  const addUser = () => {
    // 打开 dialog
    state.dialogVisible = true;
  };

  // 添加用户表单对象
  const formRef = ref();
  const editFormRef = ref();

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

  // 编辑用户
  const editUser = (row: State['userList'][1]) => {
    // 打开 dialog
    state.editVisible = true;
    // 拿到行的数据
    row.id ? (state.editUserId = row.id) : void 0;
    state.editUserForm.username = row.username;
    state.editUserForm.email = row.email;
    state.editUserForm.mobile = row.mobile;
  };

  const editUserRequest = async () => {
    // 拿到表单
    const formNode = editFormRef.value.$refs.formRef;
    formNode.validate(async (validate: boolean) => {
      // 验证表单
      if (!validate) return;

      // 修改按钮加载状态
      state.loading = true;
      // 发送请求
      const result = await editUserReq(state.editUserForm, state.editUserId);

      // 返回状态验证
      switch (result.meta.msg) {
        case '更新成功':
          ElMessage.success('更新成功');
          // 关闭 dialog
          state.editVisible = false;
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
    changeUserState,
    searchUser,
    addUser,
    formRef,
    editFormRef,
    addUserRequset,
    editUser,
    editUserRequest,
  };
};

export default modifyUser;
