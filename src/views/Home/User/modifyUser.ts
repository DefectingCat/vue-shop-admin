import { State } from './UserLogic';
import userRequest from './UserRequest';

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

  // 修改用户状态
  // type: State 中 userList 中的某一条
  const changeUserState = (userInfo: State['userList'][1]) => {
    changeState(userInfo);
  };

  // 搜索用户
  const searchUser = () => {
    getUsers();
  };

  return {
    changeUserState,
    searchUser,
  };
};

export default modifyUser;
