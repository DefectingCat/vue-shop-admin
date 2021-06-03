import { ElMessage, ElMessageBox } from 'element-plus';
import userRequest from './UserRequest';
import { State } from './UserLogic';
import { toLoadingRequest } from '@/hook/network/request';

type toDeleteUser = {
  deleteUser: (userId: number) => Promise<void>;
};

const toDeleteUser = (state: State): toDeleteUser => {
  const { getUsers, deleteUserRequest } = userRequest(state);

  const deleteUser = async (userId: number) => {
    try {
      await ElMessageBox({
        title: '删除用户',
        message: '该操作会永久删除该用户，是否确定？',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
      });
      const result = await deleteUserRequest(userId);

      // 返回状态验证
      switch (result.meta.msg) {
        case '删除成功':
          ElMessage.success('删除成功');
          // 删除成功后刷新用户列表
          toLoadingRequest('.user-table-loading', getUsers);
          break;
        case '请求发送失败':
          throw new Error('请求发送失败');
      }
    } catch (e) {
      ElMessage('取消删除');
    }
  };

  return {
    deleteUser,
  };
};

export default toDeleteUser;
