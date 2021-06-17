import type { State } from './UserLogic';
import userRequest from './UserRequest';
import { ref } from '@vue/reactivity';
import { ElMessage } from 'element-plus';
import { Ref } from 'vue';
import { toLoadingRequest } from '@/hook/network/request';

type toEditUser = {
  editFormRef: Ref<unknown>;
  editUser: (row: State['userList'][1]) => void;
  editUserRequest: () => Promise<void>;
};

/**
 * 这里是修改用户的方法
 * @param {State} 传入 state 用于保存状态
 * @return {toEditUser} 编辑用户的表单实例与方法
 */
const toEditUser = (state: State): toEditUser => {
  // 请求方法
  const { getUsers, editUserReq } = userRequest(state);

  // 编辑用户表单
  const editFormRef = ref();

  // 编辑用户
  const editUser = (row: State['userList'][1]) => {
    // 打开 dialog
    state.editVisible = true;
    // 拿到行的数据
    state.editUserId = row.id;
    state.editUserForm.username = row.username;
    state.editUserForm.email = row.email;
    state.editUserForm.mobile = row.mobile;
  };

  const editUserRequest = async () => {
    // 拿到表单
    const formNode = editFormRef.value.formRef;
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
          // 修改按钮加载状态
          state.loading = false;
          throw new Error('请求发送失败');
      }

      // 修改按钮加载状态
      state.loading = false;
      // 重新获取用户列表
      toLoadingRequest('.user-table-loading', getUsers);
    });
  };

  return {
    editFormRef,
    editUser,
    editUserRequest,
  };
};

export default toEditUser;
