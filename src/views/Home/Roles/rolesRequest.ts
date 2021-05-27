import request from '@/hook/network/request';
import { ElMessage } from 'element-plus';
import { State } from './rolesLogic';

type rolesRequest = {
  toGetRoles: (state: State) => Promise<void>;
};

const rolesRequest = (): rolesRequest => {
  const toGetRoles = async (state: State) => {
    try {
      const { data: res } = await request.get('roles');
      state.rolesList = res;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  return {
    toGetRoles,
  };
};

export default rolesRequest;
