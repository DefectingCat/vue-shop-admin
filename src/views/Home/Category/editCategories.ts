import { ElMessage, ElMessageBox } from 'element-plus';
import { Ref, ref } from 'vue';
import type { State } from './CategoryLogic';
import categoryRequest from './CategoryRequest';
import { toLoadingRequest } from '@/hook/network/request';

type editCategories = {
  openEdit: (row: State['categoriesList'][1]) => void;
  editFormRef: Ref<unknown>;
  editCategory: () => void;
  deleteCategory: (catId: number) => Promise<void>;
};

/**
 * 编辑分类方法
 * @param  {State} state 分类页状态
 */
const editCategories = (state: State): editCategories => {
  const { toGetCategories, toEditCategory, toDeleteCategory } =
    categoryRequest(state);

  const openEdit = (row: State['categoriesList'][1]) => {
    // 打开dialog
    state.editVisible = true;
    // 绑定
    state.editCateForm.cat_id = row.cat_id;
    state.editCateForm.cat_name = row.cat_name;
  };

  // 编辑表单
  const editFormRef = ref();

  // 编辑分类
  const editCategory = () => {
    // 拿到表单
    const formNode = editFormRef.value.formRef;
    formNode.validate(async (validate: boolean) => {
      // 验证表单
      if (!validate) return;

      // 修改按钮加载状态
      state.loading = true;
      // 发送请求
      const result = await toEditCategory();

      // 返回状态验证;
      switch (result.meta.msg) {
        case '更新成功':
          ElMessage.success('更新成功');
          // 关闭 dialog
          state.editVisible = false;
          break;
        case '请求发送失败':
          // 修改按钮加载状态
          state.loading = false;
          throw new Error('请求发送失败');
      }

      // 修改按钮加载状态
      state.loading = false;
      state.editCateForm = {
        cat_id: 0,
        cat_name: '',
      };
      // 重新获取用户列表
      toLoadingRequest('.category-table-loading', toGetCategories);
    });
  };

  // 删除分类
  const deleteCategory = async (catId: number) => {
    try {
      await ElMessageBox({
        title: '删除分类',
        message: '该操作会永久删除该分类，是否确定？',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
      });
      const result = await toDeleteCategory(catId);

      // 返回状态验证
      switch (result.meta.msg) {
        case '删除成功':
          ElMessage.success('删除成功');
          // 删除成功后刷新用户列表
          toLoadingRequest('.category-table-loading', toGetCategories);
          break;
        case '请求发送失败':
          throw new Error('请求发送失败');
      }
    } catch (e) {
      ElMessage('取消删除');
    }
  };

  return {
    openEdit,
    editFormRef,
    editCategory,
    deleteCategory,
  };
};
export default editCategories;
