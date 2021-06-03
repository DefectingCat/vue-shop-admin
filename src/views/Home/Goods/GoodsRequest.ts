import request from '@/hook/network/request';
import { ElMessage } from 'element-plus';
import type { State } from './GoodsLogic';

const goodsRequest = (state: State) => {
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

  return {
    toGetGoodsList,
  };
};

export default goodsRequest;
