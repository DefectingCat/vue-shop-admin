import request from '@/hook/network/request';
import { ElMessage } from 'element-plus';
import { State } from './rolesLogic';
import { Result } from '@/types/requestType';

// 请求发送失败时返回的对象
const failResult = {
  data: {
    token: '1',
  },
  meta: {
    msg: '请求发送失败',
    status: 400,
  },
};

type rolesRequest = {
  toGetRoles: () => Promise<void>;
  toAddRole: () => Promise<Result>;
  toEditRole: (role: State['editRoles']) => Promise<Result>;
};

const rolesRequest = (state: State): rolesRequest => {
  // 请求角色列表
  const toGetRoles = async () => {
    try {
      const { data: res } = await request.get('roles');
      state.rolesList = res;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  // 添加角色
  const toAddRole = async () => {
    try {
      const result: Result = await request.post('roles', state.rolesForm);
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      return failResult;
    }
  };

  // 编辑角色
  const toEditRole = async (role: State['editRoles']) => {
    try {
      const result: Result = await request.put(`roles/${role.id}`, {
        roleName: role.roleName,
        roleDesc: role.roleDesc,
      });
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      return failResult;
    }
  };

  return {
    toGetRoles,
    toAddRole,
    toEditRole,
  };
};

export default rolesRequest;
