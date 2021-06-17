import request from '@/hook/network/request';
import { ElMessage } from 'element-plus';
import type { State, attr } from './ParamsLogic';
import { failResult, Result } from '@/types/requestType';

type paramsRequest = {
  toGetCategories: () => Promise<void>;
  toGetAttribute: () => Promise<attr[] | undefined>;
  toAddAttribute: (row: attr) => Promise<void>;
  toAddParam: () => Promise<Result>;
  toEditManyParam: () => Promise<Result>;
  toDeleteParam: (row: attr) => Promise<Result>;
};

const paramsRequest = (state: State): paramsRequest => {
  // 获取 cascader 列表（分类列表）
  const toGetCategories = async () => {
    try {
      const { data: res } = await request.get('categories');
      state.cascaderOptions = res;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  // 获取详细参数
  const toGetAttribute = async () => {
    try {
      const result: attr[] = await request
        .get(`categories/${state.cateId}/attributes`, {
          params: {
            sel: state.activeName,
          },
        })
        .then((res) => res.data);
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  // 添加 tag
  const toAddAttribute = async (row: attr) => {
    try {
      await request.put(`categories/${row.cat_id}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_vals: row.attr_vals,
        attr_sel: state.activeName,
      });
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  // 添加参数
  const toAddParam = async () => {
    try {
      const result: Result = await request.post(
        `categories/${state.cateId}/attributes`,
        {
          attr_name: state.paramForm.paramName,
          attr_sel: state.activeName,
        }
      );
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      return failResult;
    }
  };

  // 编辑动态参数
  const toEditManyParam = async () => {
    const row = state.row;
    try {
      const result: Result = await request.put(
        `categories/${row.cat_id}/attributes/${row.attr_id}`,
        {
          attr_name: state.paramForm.paramName,
          attr_sel: state.activeName,
        }
      );
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      return failResult;
    }
  };

  // 删除分类参数
  const toDeleteParam = async (row: attr) => {
    try {
      const result: Result = await request.delete(
        `categories/${row.cat_id}/attributes/${row.attr_id}`
      );
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      return failResult;
    }
  };

  return {
    toGetCategories,
    toGetAttribute,
    toAddAttribute,
    toAddParam,
    toEditManyParam,
    toDeleteParam,
  };
};

export default paramsRequest;
