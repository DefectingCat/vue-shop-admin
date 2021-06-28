import request from '@/hook/network/request';
import { ElMessage } from 'element-plus';
import type { State } from './GoodsLogic';
import { toLoadingRequest } from '@/hook/network/request';
import { parseDate } from '@/hook/util/parseDate';
import { failResult, Result } from '@/types/requestType';

type goodsRequest = {
  toGetGoodsList: () => Promise<void>;
  toSearchGoods: () => void;
  toDeleteGoods: () => Promise<Result>;
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

      // 格式化时间
      state.goodsList.map((item) => (item.add_time = parseDate(item.add_time)));
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  const toSearchGoods = () => {
    toLoadingRequest('.goods-table-loading', toGetGoodsList);
  };

  const toDeleteGoods = async () => {
    try {
      const result: Result = await request.delete(`goods/${state.rowId}`);
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      // 发送失败时返回类似接口的值
      return failResult;
    }
  };

  return {
    toGetGoodsList,
    toSearchGoods,
    toDeleteGoods,
  };
};

export default goodsRequest;
