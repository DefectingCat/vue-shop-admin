import { ElMessage } from 'element-plus';
import _FormItem from 'element-plus/lib/el-form-item';
import type { State, attr } from './ParamsLogic';
import paramsRequest from './paramsRequest';
import { toLoadingRequest } from '@/hook/network/request';

type modifyParams = {
  getAttribut: () => void;
  addAttribute: (row: attr) => void;
  addManyParam: () => void;
};

const modifyParams = (state: State): modifyParams => {
  const { toGetAttribute, toAddAttribute, toAddParam } = paramsRequest(state);

  // 处理 cascader change 事件
  const getAttribut = async () => {
    // 取得数组最后一项，获取三级分类
    state.cateId = state.cascaderValue[state.cascaderValue.length - 1];
    const result = await toGetAttribute();
    if (result) state.attributes = result;
    // 处理一下 result
    // 将字符串分割为数组
    state.attributes.map((item) => {
      item.showInput = false;
      item.attr_vals
        ? (item.attrTags = item.attr_vals.split(' '))
        : (item.attrTags = []);
    });
  };

  // 添加 attr
  const addAttribute = (row: attr) => {
    toAddAttribute(row, 'many');
  };

  // 添加动态参数
  const addManyParam = async () => {
    // 开始加载
    state.loading = true;
    const result = await toAddParam('many');
    // 返回状态验证
    switch (result.meta.msg) {
      case '创建成功':
        ElMessage.success('创建成功');
        // 成功后关闭窗口
        toLoadingRequest('.param-table-loading', getAttribut);
        state.visible = false;
        state.paramForm.paramName = '';
        break;
      case '请求发送失败':
        // 修改按钮加载状态
        state.loading = false;
        throw new Error('请求发送失败');
    }
    state.loading = false;
  };

  return {
    getAttribut,
    addAttribute,
    addManyParam,
  };
};

export default modifyParams;
