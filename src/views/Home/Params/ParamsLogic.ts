import { reactive } from 'vue-demi';
import { ElMessage } from 'element-plus';
import paramsRequest from './paramsRequest';

export type CateRes = {
  cat_id: number;
  cat_name: string;
  cat_pid: number;
  cat_level: number;
  cat_deleted: boolean;
  children: CateRes[];
};

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
  attributes: attr[];
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
};

type paramsLogic = {
  state: State;
  openAddForm: () => void;
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
    // 属性列表
    attributes: [],
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
    // paramForm 可见性
    visible: false,
  });

  const { toGetCategories } = paramsRequest(state);
  // 为 Cascader 获取分类列表
  toGetCategories();

  const openAddForm = () => {
    // 如果没有选择三级分类，则不允许打开
    if (!state.attributes.length) {
      ElMessage.error('请先选择分类！');
      return;
    }
    state.visible = true;
  };

  return {
    state,
    openAddForm,
  };
};

export default paramsLogic;
