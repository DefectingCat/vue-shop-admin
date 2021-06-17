import { ElMessage, ElMessageBox } from 'element-plus';
import type { State, attr } from './ParamsLogic';
import { validKeys } from './ParamsLogic';
import paramsRequest from './paramsRequest';
import { toLoadingRequest } from '@/hook/network/request';

type modifyParams = {
  getAttribut: () => void;
  addAttribute: (row: attr) => void;
  addManyParam: () => void;
  openEdit: (row: attr) => void;
  editManyParam: () => Promise<void>;
  deleteParam: (row: attr) => Promise<void>;
  closeTag: (index: number, row: attr) => void;
};

const modifyParams = (state: State): modifyParams => {
  const {
    toGetAttribute,
    toAddAttribute,
    toAddParam,
    toEditManyParam,
    toDeleteParam,
  } = paramsRequest(state);

  // 处理 cascader change 事件
  const getAttribut = async () => {
    const len = state.cascaderValue.length;
    if (len !== 3) {
      state.cascaderValue = [];
      state.manyData = [];
      return;
    }
    // 取得数组最后一项，获取三级分类
    state.cateId = state.cascaderValue[len - 1];
    const result = await toGetAttribute();
    if (result) {
      const name = state.activeName;
      state[validKeys[name]] = result;
      // 处理一下 result
      // 将字符串分割为数组
      state[validKeys[name]].map((item) => {
        item.showInput = false;
        item.attr_vals
          ? (item.attrTags = item.attr_vals.split(' '))
          : (item.attrTags = []);
      });
    }
  };

  // 添加 attr
  const addAttribute = (row: attr) => {
    toAddAttribute(row);
  };

  // 添加动态参数
  const addManyParam = async () => {
    // 开始加载
    state.loading = true;
    const result = await toAddParam();
    // 返回状态验证
    switch (result.meta.msg) {
      case '创建成功':
        ElMessage.success('创建成功');
        // 成功后关闭窗口
        toLoadingRequest('.param-table-loading', getAttribut);
        state.visible = false;
        state.onlyVisible = false;
        state.paramForm.paramName = '';
        break;
      case '请求发送失败':
        // 修改按钮加载状态
        state.loading = false;
        throw new Error('请求发送失败');
    }
    state.loading = false;
  };

  const openEdit = (row: attr) => {
    state.activeName === 'many'
      ? (state.editVisible = true)
      : (state.eidtOnlyVisible = true);
    // 保存当前行的数据
    state.row = row;
    // 绑定编辑表格数据
    state.paramForm.paramName = row.attr_name;
  };

  // 编辑动态参数
  const editManyParam = async () => {
    // 开始加载
    state.loading = true;
    const result = await toEditManyParam();
    // 返回状态验证
    switch (result.meta.msg) {
      case '更新成功':
        ElMessage.success('更新成功');
        // 成功后关闭窗口
        toLoadingRequest('.param-table-loading', getAttribut);
        state.editVisible = false;
        state.eidtOnlyVisible = false;
        state.paramForm.paramName = '';
        state.row = {
          attr_id: 0,
          attr_name: '',
          cat_id: 0,
          attr_sel: '',
          attr_write: '',
          attr_vals: '',
          attrTags: [],
          showInput: false,
        };
        break;
      case '请求发送失败':
        // 修改按钮加载状态
        state.loading = false;
        throw new Error('请求发送失败');
    }
    state.loading = false;
  };

  // 删除
  const deleteParam = async (row: attr) => {
    try {
      await ElMessageBox({
        title: '删除参数',
        message: '该操作会永久删除该参数，是否确定？',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
      });
      const result = await toDeleteParam(row);
      // 返回状态验证
      switch (result.meta.msg) {
        case '删除成功':
          ElMessage.success('删除成功');
          // 删除成功后刷新用户列表
          toLoadingRequest('.param-table-loading', getAttribut);
          break;
        case '删除失败':
          ElMessage.error('删除失败');
          break;
        case '请求发送失败':
          throw new Error('请求发送失败');
      }
    } catch (e) {
      ElMessage('取消删除');
    }
  };

  // 删除标签
  const closeTag = (index: number, row: attr) => {
    // 找到并删除
    row.attrTags.splice(index, 1);
    // 将字符串合并为数组
    row.attr_vals = row.attrTags.join(' ');
    toAddAttribute(row);
  };

  return {
    getAttribut,
    addAttribute,
    addManyParam,
    openEdit,
    editManyParam,
    deleteParam,
    closeTag,
  };
};

export default modifyParams;
