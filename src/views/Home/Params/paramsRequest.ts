import request from '@/hook/network/request';
import { ElMessage } from 'element-plus';
import type { State, attr } from './ParamsLogic';
import { failResult, Result } from '@/types/requestType';

type paramsRequest = {
  toGetCategories: () => Promise<void>;
  toGetAttribute: () => Promise<attr[] | undefined>;
  toAddAttribute: (row: attr, sel: 'only' | 'many') => Promise<void>;
  toAddParam: (attr_sel: 'only' | 'many') => Promise<Result>;
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
            sel: 'many',
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
  const toAddAttribute = async (row: attr, sel: 'only' | 'many') => {
    try {
      await request.post(`categories/${row.cat_id}/${row.attr_id}`, {
        attr_name: row.attr_name,
        sel,
        attr_vals: row.attr_vals,
      });
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  // 添加参数
  const toAddParam = async (attr_sel: 'only' | 'many') => {
    try {
      const result: Result = await request.post(
        `categories/${state.cateId}/attributes`,
        {
          attr_name: state.paramForm.paramName,
          attr_sel,
        }
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
  };
};

export default paramsRequest;
