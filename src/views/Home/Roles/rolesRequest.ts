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
};

const rolesRequest = (state: State): rolesRequest => {
  const toGetRoles = async () => {
    try {
      const { data: res } = await request.get('roles');
      state.rolesList = res;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

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

  return {
    toGetRoles,
    toAddRole,
  };
};

export default rolesRequest;
