import { reactive, ref } from '@vue/reactivity';
import userRequest from './UserRequest';
import { ElForm, ElMessage } from 'element-plus';
import { formRules } from '@/types/formRules';

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
  // dialog 控制
  dialogVisible: boolean;
  // 添加用户表单
  addUserForm: {
    username: string;
    password: string;
    email: string;
    mobile: string;
  };
  // 添加用户表单验证
  addUserRules: {
    username: formRules[];
    password: formRules[];
    email: formRules[];
    mobile: formRules[];
  };
};

type UserLogic = {
  state: State;
  userForm: unknown;
  handleSizeChange: (val: number) => void;
  handleCurrentChange: (val: number) => void;
};

const userLogic = (): UserLogic => {
  const state: State = reactive({
    // 查询参数
    queryInfo: {
      query: '',
      pagenum: 1,
      pagesize: 10,
    },
    // 获取到的用户列表
    userList: [],
    // 用户总数量
    totalUsers: 0,
    // dialog 控制
    dialogVisible: false,
    // 添加用户表单
    addUserForm: {
      username: '',
      password: '',
      email: '',
      mobile: '',
    },
    // 添加用户表单验证
    addUserRules: {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' },
      ],
      email: [
        { required: true, message: '请输入电子邮箱', trigger: 'blur' },
        { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' },
      ],
      mobile: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' },
      ],
    },
  });

  // 添加表单对象
  const userForm = ref<typeof ElForm>();

  // 请求方法
  const { getUsers } = userRequest(state);
  // 第一次发送请求
  getUsers();

  // 分页回调方法
  // 每页显式条数
  const handleSizeChange = (val: number) => {
    state.queryInfo.pagesize = val;
    getUsers();
  };
  // 当前页
  const handleCurrentChange = (val: number) => {
    state.queryInfo.pagenum = val;
    getUsers();
  };

  return {
    state,
    userForm,
    handleSizeChange,
    handleCurrentChange,
  };
};

export default userLogic;
