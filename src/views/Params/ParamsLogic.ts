import { reactive } from 'vue-demi';
import { ElMessage } from 'element-plus';
import paramsRequest from './paramsRequest';
import type { CateRes } from '@/views/Category/CategoryLogic';

export type attr = {
  attr_id: number;
  attr_name: string;
  cat_id: number;
  attr_sel: string;
  attr_write: string;
  attr_vals: string;
  attrTags: string[];
  showInput: boolean;
};

export type State = {
  queryInfo: {
    type: number;
    pagenum: number;
    pagesize: number;
  };
  cascaderOptions: CateRes[];
  cascaderValue: number[];
  cascaderProps: {
    value: 'cat_id';
    label: 'cat_name';
    children: 'children';
    expandTrigger: 'hover';
  };
  cateId: number;
  manyData: attr[];
  onlyData: attr[];
  paramForm: {
    paramName: string;
  };
  paramRule: {
    paramName: {
      required: boolean;
      message: string;
      trigger: string;
    }[];
  };
  loading: boolean;
  visible: boolean;
  onlyVisible: boolean;
  editVisible: boolean;
  eidtOnlyVisible: boolean;
  row: attr;
  activeName: string;
};

type paramsLogic = {
  state: State;
  openAddForm: () => void;
};

// table 切换验证 key
export const validKeys: {
  [key: string]: 'manyData' | 'onlyData';
} = {
  many: 'manyData',
  only: 'onlyData',
};

const paramsLogic = (): paramsLogic => {
  const state: State = reactive({
    // 查询参数
    queryInfo: {
      type: 3,
      pagenum: 1,
      pagesize: 5,
    },
    // 多级选择器选中项
    cascaderValue: [],
    // 多级选择器数据项 2 级分类
    cascaderOptions: [],
    // 多级选择器配置项
    cascaderProps: {
      value: 'cat_id',
      label: 'cat_name',
      children: 'children',
      expandTrigger: 'hover',
    },
    // 分类 id
    cateId: 0,
    // 动态属性列表
    manyData: [],
    // 静态属性列表
    onlyData: [],
    // 添加参数表单
    paramForm: {
      paramName: '',
    },
    // 表单验证
    paramRule: {
      paramName: [
        { required: true, message: '请输入参数名称', trigger: 'blur' },
      ],
    },
    // 加载按钮状态
    loading: false,
    // 动态属性 paramForm 可见性
    visible: false,
    // 静态属性 paramForm 可见性
    onlyVisible: false,
    // 编辑动态参数表单
    editVisible: false,
    // 编辑静态参数表单
    eidtOnlyVisible: false,
    // 行的数据
    row: {
      attr_id: 0,
      attr_name: '',
      cat_id: 0,
      attr_sel: '',
      attr_write: '',
      attr_vals: '',
      attrTags: [],
      showInput: false,
    },
    // tabs 当前激活标签
    activeName: 'many',
  });

  const { toGetCategories } = paramsRequest(state);
  // 为 Cascader 获取分类列表
  toGetCategories();

  const openAddForm = () => {
    const name = state.activeName;
    // 如果没有选择三级分类，则不允许打开
    if (!state[validKeys[name]].length) {
      ElMessage.error('请先选择分类！');
      return;
    }
    name === 'many' ? (state.visible = true) : (state.onlyVisible = true);
  };

  return {
    state,
    openAddForm,
  };
};

export default paramsLogic;
