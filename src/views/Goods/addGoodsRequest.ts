import request from '@/hook/network/request';
import { ElMessage } from 'element-plus';
import { State } from './AddGoodLogic';

type addGoodsRequest = {
  toGetGoodsCate: () => Promise<void>;
  toGetAttr: (catId: number, sel: 'many' | 'only') => Promise<void>;
};

const addGoodsRequest = (state: State): addGoodsRequest => {
  const toGetGoodsCate = async () => {
    try {
      const { data: res } = await request.get('categories');
      state.cateList = res;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  const toGetAttr = async (catId: number, sel: 'many' | 'only') => {
    const vaildKeys: {
      [key: string]: 'manyTableData' | 'onlyTableData';
    } = {
      many: 'manyTableData',
      only: 'onlyTableData',
    };
    try {
      const { data: res } = await request.get(
        `categories/${catId}/attributes`,
        {
          params: {
            sel,
          },
        }
      );
      state[vaildKeys[sel]] = res;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  return {
    toGetGoodsCate,
    toGetAttr,
  };
};

export default addGoodsRequest;
