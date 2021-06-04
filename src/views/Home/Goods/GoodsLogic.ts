import { reactive } from 'vue-demi';
import goodsRequest from './GoodsRequest';
import { toLoadingRequest } from '@/hook/network/request';

type goods = {
  goods_id: number;
  goods_name: string;
  goods_price: number;
  goods_number: number;
  goods_weight: number;
  goods_state: number;
  add_time: number;
  upd_time: number;
  hot_mumber: number;
  is_promote: boolean;
};

export type State = {
  queryInfo: {
    query: string;
    pagenum: number;
    pagesize: number;
  };
  goodsList: goods[];
  goodsTotal: number;
};

const goodsLogic = () => {
  const state: State = reactive({
    // 查询参数
    queryInfo: {
      query: '',
      pagenum: 1,
      pagesize: 10,
    },
    // 商品列表
    goodsList: [],
    // 商品总数
    goodsTotal: 0,
  });

  // 第一次发送请求
  // 带有加载状态的请求用户数据
  const { toGetGoodsList } = goodsRequest(state);
  toLoadingRequest('.goods-table-loading', toGetGoodsList);

  return {
    state,
  };
};

export default goodsLogic;
