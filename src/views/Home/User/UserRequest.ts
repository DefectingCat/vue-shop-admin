import { State } from './UserLogic';
import request from '@/hook/network/request';
import { ElLoading, ElMessage } from 'element-plus';
import { Result } from '@/types/requestType';
import { nextTick } from 'vue';

type UserRequest = {
  getUsers: () => Promise<void>;
  loadingGetUser: () => Promise<void>;
  changeState: (userInfo: State['userList'][1]) => Promise<void>;
  postUser: (userInfo: State['addUserForm']) => Promise<Result>;
  editUserReq: (
    userInfo: State['editUserForm'],
    userId: number
  ) => Promise<Result>;
  deleteUserRequest: (userId: number) => Promise<Result>;
  getRoles: () => Promise<void>;
  assignRoleRequest: () => Promise<Result>;
};

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

const userRequest = (state: State): UserRequest => {
  // 请求用户数据
  const getUsers = async () => {
    try {
      const { data: res } = await request({
        method: 'GET',
        url: 'users',
        params: state.queryInfo,
      });
      state.userList = res.users; // 保存用户列表
      state.totalUsers = res.total; // 所有用户数量
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  // 带有加载状态的请求用户数据
  const loadingGetUser = async () => {
    await nextTick();
    const loading = ElLoading.service({
      target: '.user-table-loading',
      lock: true,
    });

    await getUsers();
    // 加载完成，关闭 loading
    loading.close();
  };

  // 修改用户状态
  const changeState = async (userInfo: State['userList'][1]) => {
    await request({
      method: 'PUT',
      url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
    });
  };

  // 添加用户
  const postUser = async (userInfo: State['addUserForm']) => {
    try {
      // 发送请求
      const result: Result = await request({
        method: 'POST',
        url: 'users',
        data: userInfo,
      });
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      // 发送失败时返回类似接口的值
      return failResult;
    }
  };

  // 编辑用户
  const editUserReq = async (
    userInfo: State['editUserForm'],
    userId: number
  ) => {
    try {
      const result: Result = await request.put(`users/${userId}`, {
        email: userInfo.email,
        mobile: userInfo.mobile,
      });
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      // 发送失败时返回类似接口的值
      return failResult;
    }
  };

  // 删除用户
  const deleteUserRequest = async (userId: number) => {
    try {
      const result: Result = await request.delete(`users/${userId}`);
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      // 发送失败时返回类似接口的值
      return failResult;
    }
  };

  // 获取角色列表
  const getRoles = async () => {
    try {
      const { data: res } = await request.get('roles');
      state.rolesList = res;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  //
  const assignRoleRequest = async () => {
    try {
      const result: Result = await request.put(
        `users/${state.toAssign.id}/role`,
        {
          rid: state.selectId,
        }
      );
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      // 发送失败时返回类似接口的值
      return failResult;
    }
  };

  return {
    getUsers,
    loadingGetUser,
    changeState,
    postUser,
    editUserReq,
    deleteUserRequest,
    getRoles,
    assignRoleRequest,
  };
};

export default userRequest;
