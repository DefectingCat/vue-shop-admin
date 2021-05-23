import { State } from './UserLogic';
import request from '@/hook/network/request';

type UserRequest = {
  getUsers: () => Promise<void>;
  changeState: (userInfo: State['userList'][1]) => Promise<void>;
};

const userRequest = (state: State): UserRequest => {
  // 请求用户数据
  const getUsers = async () => {
    const { data: res } = await request({
      method: 'GET',
      url: 'users',
      params: state.queryInfo,
    });
    state.userList = res.users; // 保存用户列表
    state.totalUsers = res.total; // 所有用户数量
  };

  // 修改用户状态
  const changeState = async (userInfo: State['userList'][1]) => {
    const res = await request({
      method: 'PUT',
      url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
    });
  };

  return {
    getUsers,
    changeState,
  };
};

export default userRequest;
