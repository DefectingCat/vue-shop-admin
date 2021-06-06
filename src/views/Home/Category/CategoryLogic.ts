import { reactive } from 'vue-demi';
import categoryRequest from './CategoryRequest';
import { toLoadingRequest } from '@/hook/network/request';

type CateRes = {
  cat_id: number;
  cat_name: string;
  cat_pid: number;
  cat_level: number;
  cat_deleted: boolean;
  children: CateRes[];
};

type form = {
  cat_id?: number;
  cat_name?: string;
  cat_pid?: number;
  cat_level?: number;
};

export type State = {
  queryInfo: {
    type: number;
    pagenum: number;
    pagesize: number;
  };
  categoriesList: CateRes[];
  categoriesTotal: number;
  loading: boolean;
  addCateForm: form;
  addCateRules: {
    cat_name: [{ required: true; message: '请输入分类'; trigger: 'blur' }];
  };
  cascaderOptions: CateRes[];
  cascaderValue: number[];
  cascaderProps: {
    value: 'cat_id';
    label: 'cat_name';
    children: 'children';
    checkStrictly: true;
  };
  visible: boolean;
  editCateForm: form;
  editVisible: boolean;
};

type categoryLogic = {
  state: State;
  handleSizeChange: (val: number) => void;
  handleCurrentChange: (val: number) => void;
};

/**
 * 分类页面基本逻辑
 * state 与两个处理分页的函数
 * @returns categoryLogic
 */
const categoryLogic = (): categoryLogic => {
  const state: State = reactive({
    // 查询参数
    queryInfo: {
      type: 3,
      pagenum: 1,
      pagesize: 5,
    },
    // 分类信息
    categoriesList: [],
    // 分类总数
    categoriesTotal: 0,
    // 加载按钮状态
    loading: false,
    // 添加分类表单
    addCateForm: {
      // 分类名称
      cat_name: '',
      // 父级id
      cat_pid: 0,
      // 分类层级
      cat_level: 0,
    },
    // 添加分类表单验证
    addCateRules: {
      cat_name: [{ required: true, message: '请输入分类', trigger: 'blur' }],
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
      checkStrictly: true,
    },
    // 添加分类dialog可见性
    visible: false,
    // 修改分类表单
    editCateForm: {
      cat_id: 0,
      cat_name: '',
    },
    // 编辑分类可见性
    editVisible: false,
  });

  // 请求第一次数据
  const { toGetCategories } = categoryRequest(state);
  // 带有加载状态的请求用户数据
  toLoadingRequest('.category-table-loading', toGetCategories);

  // 分页回调方法
  // 每页显式条数
  const handleSizeChange = (val: number) => {
    state.queryInfo.pagesize = val;
    toLoadingRequest('.category-table-loading', toGetCategories);
  };
  // 当前页
  const handleCurrentChange = (val: number) => {
    state.queryInfo.pagenum = val;
    toLoadingRequest('.category-table-loading', toGetCategories);
  };

  return {
    state,
    handleSizeChange,
    handleCurrentChange,
  };
};

export default categoryLogic;
