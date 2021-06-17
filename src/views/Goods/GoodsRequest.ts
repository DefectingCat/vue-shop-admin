import request from '@/hook/network/request';
import { ElMessage } from 'element-plus';
import type { State } from './GoodsLogic';
import { toLoadingRequest } from '@/hook/network/request';

type goodsRequest = {
  toGetGoodsList: () => Promise<void>;
  toSearchGoods: () => void;
};

const goodsRequest = (state: State): goodsRequest => {
  const toGetGoodsList = async () => {
    try {
      const { data: res } = await request({
        method: 'GET',
        url: 'goods',
        params: state.queryInfo,
      });
      state.goodsList = res.goods;
      state.goodsTotal = res.total;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  const toSearchGoods = () => {
    toLoadingRequest('.goods-table-loading', toGetGoodsList);
  };

  return {
    toGetGoodsList,
    toSearchGoods,
  };
};

export default goodsRequest;
