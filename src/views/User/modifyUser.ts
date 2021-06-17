import { State } from './UserLogic';
import userRequest from './UserRequest';
import { toLoadingRequest } from '@/hook/network/request';
import { ElMessage } from 'element-plus';

type ModifyUser = {
  changeUserState: (userInfo: State['userList'][1]) => void;
  searchUser: () => void;
};

/**
 * 这里是一些操作用户基本表单的方法
 * @param {State} 传入 state 用于保存状态
 * @return {ModifyUser} 一些操作用户的方法
 */
const modifyUser = (state: State): ModifyUser => {
  // 请求方法
  const { getUsers, changeState } = userRequest(state);

  // 修改用户状态 在 beforeChange 时发送
  // type: State 中 userList 中的某一条
  const changeUserState = async (userInfo: State['userList'][1]) => {
    try {
      state.loading = true;
      await changeState(userInfo);
    } catch (e) {
      // 如果请求发送失败
      // 获取到操作的用户
      const user = state.userList.find((item) => item.id === userInfo.id);
      // 将状态改为未修改的状态
      if (user) user.mg_state = !userInfo.mg_state;
      ElMessage.error('切换失败');
      console.error('test', e);
    }
    state.loading = false;
  };

  // 搜索用户
  const searchUser = () => {
    toLoadingRequest('.user-table-loading', getUsers);
  };

  return {
    changeUserState,
    searchUser,
  };
};

export default modifyUser;
