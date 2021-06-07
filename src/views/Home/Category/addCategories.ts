import { ElMessage } from 'element-plus';
import { Ref, ref } from 'vue';
import type { State } from './CategoryLogic';
import categoryRequest from './CategoryRequest';
import { toLoadingRequest } from '@/hook/network/request';

type addCategories = {
  openDialog: () => Promise<void>;
  cateChange: () => void;
  formRef: Ref<unknown>;
  addCategory: () => Promise<void>;
};

/**
 * 这个函数主要为添加分类的方法
 * @param  {State} state 分类页面状态
 * @returns addCategories
 */
const addCategories = (state: State): addCategories => {
  const { toGetCategories, toAddCategory } = categoryRequest(state);

  const openDialog = async () => {
    // 修改可见性
    state.visible = true;
    // 打开时获取 2 级父级分类
    await toGetCategories(true);
  };

  const cateChange = () => {
    // 可清空时，无法访问 length
    if (state.cascaderValue && state.cascaderValue.length) {
      // 修改添加分类表单
      const len = state.cascaderValue.length;
      // 父分类 id 始终等于数组最后一项
      state.addCateForm.cat_pid = state.cascaderValue[len - 1];
      // 父分类 level 等于数组长度
      state.addCateForm.cat_level = len;
    } else {
      // 如果没有选择，则创建 1 级分类
      state.addCateForm.cat_pid = 0;
      state.addCateForm.cat_level = 0;
    }
  };

  // 添加用户表单对象
  const formRef = ref();

  // 发送添加分类请求
  const addCategory = async () => {
    // 拿到子组件
    const formNode = formRef.value.formRef;
    formNode.validate(async (validate: boolean) => {
      // 验证表单
      if (!validate) return;
      // 修改按钮加载状态
      state.loading = true;
      // 发送请求
      const result = await toAddCategory();
      // 返回状态验证
      switch (result.meta.msg) {
        case '创建成功':
          ElMessage.success('创建成功');
          // 关闭 dialog
          state.visible = false;
          // 创建成功后重置表单
          state.cascaderValue = [];
          state.addCateForm = {
            cat_name: '',
            cat_pid: 0,
            cat_level: 0,
          };
          break;
        case '用户名已存在':
          ElMessage.error('用户名已存在');
          break;
        case '请求发送失败':
          // 修改按钮加载状态
          state.loading = false;
          throw new Error('请求发送失败');
      }
      // 修改按钮加载状态
      state.loading = false;
      // 重新获取分类列表
      toLoadingRequest('.category-table-loading', toGetCategories);
    });
  };

  return {
    openDialog,
    cateChange,
    formRef,
    addCategory,
  };
};

export default addCategories;
