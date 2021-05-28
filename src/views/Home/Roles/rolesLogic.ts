import { reactive } from '@vue/reactivity';

type Roles = {
  id: number;
  roleName: string;
  roleDesc: string;
  children: [
    {
      id: number;
      authName: string;
      path: null;
      children: [
        {
          id: number;
          authName: string;
          path: null;
          children: [
            {
              id: number;
              authName: string;
              path: null;
            }
          ];
        }
      ];
    }
  ];
};

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
  });

  return {
    state,
  };
};

export default rolesLogic;
