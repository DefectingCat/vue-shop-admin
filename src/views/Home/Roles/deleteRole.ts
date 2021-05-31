import rolesRequest from './rolesRequest';
import { ElMessage, ElMessageBox } from 'element-plus';
import { State } from './rolesLogic';

type deleteRolesRequest = {
  deleteRolesClick: (roleId: number) => Promise<void>;
  deleteRight: (role: State['rolesList'][1], rightId: number) => Promise<void>;
};

const deleteRolesRequest = (state: State): deleteRolesRequest => {
  const { toGetRoles, toDeleteRole, toDeleteRight } = rolesRequest(state);

  // 删除单个角色
  const deleteRolesClick = async (roleId: number) => {
    try {
      await ElMessageBox({
        title: '删除角色',
        message: '该操作会永久删除该角色，是否确定？',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
      });

      // 发起请求
      const result = await toDeleteRole(roleId);

      // 返回状态验证
      switch (result.meta.msg) {
        case '删除成功':
          ElMessage.success('删除成功');
          // 重新获取列表
          toGetRoles();
          break;
        case '请求发送失败':
          throw new Error('请求发送失败');
      }
    } catch (e) {
      ElMessage('取消删除');
    }
  };

  // 删除角色的权限
  const deleteRight = async (role: State['rolesList'][1], rightId: number) => {
    try {
      await ElMessageBox({
        title: '取消权限',
        message: '该操作会取消删除该权限，是否确定？',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
      });
      // 发起请求
      const result = await toDeleteRight(role.id, rightId);
      const item = state.rolesList.find((item) => item.id === role.id);
      console.log(result.data);

      // 返回状态验证
      switch (result.meta.msg) {
        case '取消权限成功':
          // 使用返回值更新单行数据
          if (item) item.children = result.data;
          // role.children = result.data;
          ElMessage.success('取消权限成功');
          console.log(role);
          break;
        case '请求发送失败':
          throw new Error('请求发送失败');
      }
    } catch (e) {
      ElMessage('取消删除');
    }
  };

  return {
    deleteRolesClick,
    deleteRight,
  };
};

export default deleteRolesRequest;
