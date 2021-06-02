import { ElMessage } from 'element-plus';
import type { State } from './UserLogic';
import userRequest from './UserRequest';

type toAssignRole = {
  assignRole: (userInfo: State['userList'][1]) => void;
  doAssign: () => Promise<void>;
};

const toAssignRole = (state: State): toAssignRole => {
  const { loadingGetUser, getRoles, assignRoleRequest } = userRequest(state);

  const assignRole = (userInfo: State['userList'][1]) => {
    if (userInfo.id) state.toAssign.id = userInfo.id;
    if (userInfo.username) state.toAssign.username = userInfo.username;
    if (userInfo.role_name) state.toAssign.role_name = userInfo.role_name;
    state.assignVisible = true;
    getRoles();
  };

  const doAssign = async () => {
    console.log(state.selectId);
    if (!state.selectId) ElMessage.error('请选择一个角色！');
    state.loading = true;
    const result = await assignRoleRequest();

    // 返回状态验证
    switch (result.meta.msg) {
      case '设置角色成功':
        ElMessage.success('设置角色成功');
        state.loading = false;
        // 关闭 dialog
        state.assignVisible = false;
        // 再次获取用户
        loadingGetUser();
        // 情况状态
        state.toAssign = {
          id: 0,
          username: '',
          role_name: '',
        };
        state.selectId = '';
        break;
      case '请求发送失败':
        throw new Error('请求发送失败');
    }
  };

  return {
    assignRole,
    doAssign,
  };
};

export default toAssignRole;
