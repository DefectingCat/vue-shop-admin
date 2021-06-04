import { ElMessage } from 'element-plus';
import request from '@/hook/network/request';
import type { State } from './CategoryLogic';

const categoryRequest = (state: State) => {
  const toGetCategories = async () => {
    try {
      const { data: res } = await request.get('categories', {
        params: state.queryInfo,
      });
      state.categoriesList = res.result;
      state.categoriesTotal = res.total;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  return {
    toGetCategories,
  };
};

export default categoryRequest;
