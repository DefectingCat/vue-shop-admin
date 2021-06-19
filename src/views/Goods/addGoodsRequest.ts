import request from '@/hook/network/request';
import { ElMessage } from 'element-plus';
import { State } from './AddGoodLogic';
import { failResult, Result } from '@/types/requestType';

type addGoodsRequest = {
  toGetGoodsCate: () => Promise<void>;
  toGetAttr: (catId: number, sel: 'many' | 'only') => Promise<void>;
  toAddGoods: () => Promise<Result>;
};

const addGoodsRequest = (state: State): addGoodsRequest => {
  // 获取分类
  const toGetGoodsCate = async () => {
    try {
      const { data: res } = await request.get('categories');
      state.cateList = res;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  // 获取属性
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

  // 添加属性
  const toAddGoods = async () => {
    try {
      const result: Result = await request.post('goods', state.addForm);
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      return failResult;
    }
  };

  return {
    toGetGoodsCate,
    toGetAttr,
    toAddGoods,
  };
};

export default addGoodsRequest;
