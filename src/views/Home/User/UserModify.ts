import { State } from './UserLogic';
import userRequest from './UserRequest';

type ModifyUser = {
  changeUserState: (userInfo: State['userList'][1]) => void;
  searchUser: () => void;
  addUser: () => void;
};

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

  // 添加用户
  const addUser = () => {
    // 打开 dialog
    state.dialogVisible = !state.dialogVisible;
  };

  return {
    changeUserState,
    searchUser,
    addUser,
  };
};

export default modifyUser;
