import request from '@/hook/network/request';
import { ElLoading, ElMessage } from 'element-plus';
import { State } from './rolesLogic';
import { Result } from '@/types/requestType';
import { Roles } from '@/types/requestType';
import { nextTick } from 'vue';

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

type DeleteRes = {
  data: Roles['children'];
  meta: {
    msg: string;
    status: number;
  };
  [key: string]: unknown;
};

type rolesRequest = {
  toGetRoles: () => Promise<void>;
  toLoadingRoles: () => Promise<void>;
  toAddRole: () => Promise<Result>;
  toEditRole: (role: State['editRoles']) => Promise<Result>;
  toDeleteRole: (roleId: number) => Promise<Result>;
  toDeleteRight: (roleId: number, rightId: number) => Promise<DeleteRes>;
  toGetRightsList: (display: 'list' | 'tree') => Promise<void>;
  toAssignRequest: (
    roleId: number,
    rids: {
      rids: string;
    }
  ) => Promise<Result>;
};

const rolesRequest = (state: State): rolesRequest => {
  // 请求角色列表
  const toGetRoles = async () => {
    try {
      const { data: res } = await request.get('roles');
      state.rolesList = res;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  // 为表格添加加载状态的请求角色列表
  const toLoadingRoles = async () => {
    await nextTick();
    const loading = ElLoading.service({
      target: '.roles-table-loading',
      lock: true,
    });

    await toGetRoles();
    // 加载完成，关闭 loading
    loading.close();
  };

  // 添加角色
  const toAddRole = async () => {
    try {
      const result: Result = await request.post('roles', state.rolesForm);
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      return failResult;
    }
  };

  // 编辑角色
  const toEditRole = async (role: State['editRoles']) => {
    try {
      const result: Result = await request.put(`roles/${role.id}`, {
        roleName: role.roleName,
        roleDesc: role.roleDesc,
      });
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      return failResult;
    }
  };

  // 删除角色
  const toDeleteRole = async (roleId: number) => {
    try {
      const result: Result = await request.delete(`roles/${roleId}`);
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      return failResult;
    }
  };

  // 删除角色的权限
  const toDeleteRight = async (roleId: number, rightId: number) => {
    // try {
    const result: DeleteRes = await request.delete(
      `roles/${roleId}/rights/${rightId}`
    );
    return result;
    // } catch (e) {
    //   ElMessage.error('请求发送失败');
    //   console.error(e);
    //   return failResult;
    // }
  };

  // 请求权限列表
  const toGetRightsList = async (display: 'list' | 'tree') => {
    try {
      const { data: res } = await request.get(`/rights/${display}`);
      state.rightsList = res;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  // 指派权限
  const toAssignRequest = async (roleId: number, rids: { rids: string }) => {
    try {
      const result: Result = await request.post(
        `/roles/${roleId}/rights`,
        rids
      );
      return result;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
      return failResult;
    }
  };

  return {
    toGetRoles,
    toLoadingRoles,
    toAddRole,
    toEditRole,
    toDeleteRole,
    toDeleteRight,
    toGetRightsList,
    toAssignRequest,
  };
};

export default rolesRequest;
