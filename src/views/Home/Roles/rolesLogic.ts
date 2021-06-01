import { reactive } from '@vue/reactivity';
import { Roles } from '@/types/requestType';
import rolesRequest from './rolesRequest';

export type State = {
  rolesList: Roles[];
  rolesForm: {
    roleName: string;
    roleDesc: string;
  };
  rolesRules: {
    roleName: {
      required: boolean;
      message: string;
      trigger: string;
    }[];
  };
  dialogVisiable: boolean;
  loading: boolean;
  editRoles: {
    id: number;
    roleName: string;
    roleDesc: string;
  };
  editVisiable: boolean;
  rightsTreeVisible: boolean;
  rightsList: {
    id: number;
    authName: string;
    path: null;
    pid: number;
    children: [
      {
        id: number;
        authName: string;
        path: null;
        pid: number;
        children: [
          {
            id: number;
            authName: string;
            path: null;
            pid: string;
          }
        ];
      }
    ];
  }[];
  treeProps: {
    children: 'children';
    label: 'authName';
  };
  checkKeys: FlatArray<
    number[][],
    | 0
    | 1
    | -1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
  >[];
  assignId: number;
};

type rolesLogic = {
  state: State;
};

const rolesLogic = (): rolesLogic => {
  const state: State = reactive({
    // 请求的角色列表
    rolesList: [],
    // 添加角色表单数据
    rolesForm: {
      roleName: '',
      roleDesc: '',
    },
    // 表单验证规则
    rolesRules: {
      roleName: [
        { required: true, message: '请输入角色名称', trigger: 'blur' },
      ],
    },
    // 打开 dialog
    dialogVisiable: false,
    // 按钮加载状态
    loading: false,
    // 修改用户表单
    editRoles: {
      id: 0,
      roleName: '',
      roleDesc: '',
    },
    // 修改用户表单可见性
    editVisiable: false,
    // 分配权限表单可见性
    rightsTreeVisible: false,
    // 分配权限列表
    rightsList: [],
    // 树形组件展示列表
    treeProps: {
      children: 'children',
      label: 'authName',
    },
    // 树形组件默认勾选数组，来自角色属性中的 id
    checkKeys: [],
    // 分配权限时的角色 id
    assignId: 0,
  });

  // First request
  const { toLoadingRoles } = rolesRequest(state);
  // Get roles list in create stage
  toLoadingRoles();

  return {
    state,
  };
};

export default rolesLogic;
