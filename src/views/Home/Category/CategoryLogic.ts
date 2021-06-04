import { reactive } from 'vue-demi';
import categoryRequest from './CategoryRequest';

type CateRes = {
  cat_id: number;
  cat_name: string;
  cat_pid: number;
  cat_level: number;
  cat_deleted: boolean;
  children: CateRes[];
};

export type State = {
  queryInfo: {
    type: string;
    pagenum: number;
    pagesize: number;
  };
  categoriesList: CateRes[];
  categoriesTotal: number;
};

const categoryLogic = () => {
  const state: State = reactive({
    // 查询参数
    queryInfo: {
      type: '',
      pagenum: 1,
      pagesize: 10,
    },
    // 分类信息
    categoriesList: [],
    categoriesTotal: 0,
  });

  // 请求第一次数据
  const { toGetCategories } = categoryRequest(state);
  toGetCategories();

  return {
    state,
  };
};

export default categoryLogic;
