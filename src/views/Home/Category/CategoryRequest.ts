import { ElMessage } from 'element-plus';
import request from '@/hook/network/request';
import type { State } from './CategoryLogic';
import { Result } from '@/types/requestType';

// 请求发送失败时返回的对象
const failResult = {
  data: {
    token: '1',
  },
  meta: {
    msg: '请求发送失败',
    status: 400,
  },
};

type categoryRequest = {
  toGetCategories: (toAdd?: boolean) => Promise<void>;
  toAddCategory: () => Promise<Result>;
  toEditCategory: () => Promise<Result>;
  toDeleteCategory: (catId: number) => Promise<Result>;
};

/**
 * 这个函数主要为分类页面提供请求方法
 * @param  {State} state 分类页面状态
 * @returns categoryRequest
 */
const categoryRequest = (state: State): categoryRequest => {
  // 获取分类列表数据
  const toGetCategories = async (toAdd = false) => {
    try {
      // 如果是添加分类时获取的父级菜单
      // 就不使用 state 中的queryInfo
      if (toAdd) {
        const { data: res } = await request.get('categories', {
          params: {
            type: 2,
          },
        });
        state.cascaderOptions = res;
      } else {
        // 否则就使用 queryInfo
        const { data: res } = await request.get('categories', {
          params: state.queryInfo,
        });
        state.categoriesList = res.result;
        state.categoriesTotal = res.total;
      }
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  // 添加请求
  const toAddCategory = async () => {
    try {
      const result: Result = await request.post(
        'categories',
        state.addCateForm
      );
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      // 发送失败时返回类似接口的值
      return failResult;
    }
  };

  // 编辑请求
  const toEditCategory = async () => {
    try {
      const result: Result = await request.put(
        `categories/${state.editCateForm.cat_id}`,
        {
          cat_name: state.editCateForm.cat_name,
        }
      );
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      // 发送失败时返回类似接口的值
      return failResult;
    }
  };

  // 删除请求
  const toDeleteCategory = async (catId: number) => {
    try {
      const result: Result = await request.delete(`categories/${catId}`);
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      // 发送失败时返回类似接口的值
      return failResult;
    }
  };

  return {
    toGetCategories,
    toAddCategory,
    toEditCategory,
    toDeleteCategory,
  };
};

export default categoryRequest;
