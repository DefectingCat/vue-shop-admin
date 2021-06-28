import type { State, goods } from '@/views/Goods/GoodsLogic';
import type { formRef } from '@/types/formRules';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import goodsRequest from './GoodsRequest';

type modifyGood = {
  openForm: (row: goods) => void;
  editGoods: () => void;
  deleteGoods: (id: goods['goods_id']) => Promise<void>;
};

const modifyGood = (state: State): modifyGood => {
  const { toSearchGoods, toDeleteGoods } = goodsRequest(state);

  // 打开 dialog
  const openForm = (row: goods) => {
    // 拿到行的数据 name
    state.dialogVisible = true;
    // 传递给表单
    state.editForm.goods_name = row.goods_name;
    state.rowId = row.goods_id;
  };

  // 表单 ref
  const editForm =
    ref<{
      form: formRef;
    }>();

  const editGoods = () => {
    editForm.value?.form.validate((valid) => {
      if (!valid) {
        return;
      }
    });
    ElMessage.warning('接口限制，无法操作');
    // 接口限制
  };

  const deleteGoods = async (id: goods['goods_id']) => {
    state.rowId = id;

    try {
      await ElMessageBox({
        title: '删除用户',
        message: '该操作会永久删除该商品，是否确定？',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
      });
      const result = await toDeleteGoods();

      // 返回状态验证
      switch (result.meta.msg) {
        case '删除成功':
          ElMessage.success('删除成功');
          // 删除成功后刷新用户列表
          toSearchGoods();
          break;
        case '请求发送失败':
          throw new Error('请求发送失败');
      }
    } catch (e) {
      ElMessage('取消删除');
    }
  };

  return {
    openForm,
    editGoods,
    deleteGoods,
  };
};

export default modifyGood;
