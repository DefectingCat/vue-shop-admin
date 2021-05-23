import { reactive } from '@vue/reactivity';
import userRequest from './UserRequest';

export type State = {
  // 查询参数
  queryInfo: {
    query: string;
    // 当前页面
    pagenum: number;
    // 每页显式条数
    pagesize: number;
  };
  // 用户列表
  userList: {
    id?: number;
    username?: string;
    mobile?: string;
    type?: number;
    email?: string;
    create_time?: string;
    mg_state?: boolean; // 当前用户的状态
    role_name?: string;
  }[];
  // 用户总数量
  totalUsers: number;
};

const userLogic = () => {
  const state: State = reactive({
    queryInfo: {
      query: '',
      pagenum: 1,
      pagesize: 10,
    },
    userList: [],
    totalUsers: 0,
  });

  // 请求方法
  const { getUsers, changeState } = userRequest(state);
  // 第一次发送请求
  getUsers();

  // 分页回调方法
  // 每页显式条数
  const handleSizeChange = (val: number) => {
    console.log(`每页 ${val} 条`);
    state.queryInfo.pagesize = val;
    getUsers();
  };
  // 当前页
  const handleCurrentChange = (val: number) => {
    console.log(`当前页: ${val}`);
    state.queryInfo.pagenum = val;
    getUsers();
  };

  // 修改用户状态
  // type: State 中 userList 中的某一条
  const changeUserState = (userInfo: State['userList'][1]) => {
    changeState(userInfo);
  };

  return {
    state,
    handleSizeChange,
    handleCurrentChange,
    changeUserState,
  };
};

export default userLogic;
