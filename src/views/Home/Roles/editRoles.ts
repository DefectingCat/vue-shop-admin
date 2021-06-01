import rolesRequest from './rolesRequest';
import { ElMessage } from 'element-plus';
import { State } from './rolesLogic';
import { Ref, ref } from 'vue';

type editRolesRequest = {
  editRef: Ref<unknown>;
  openEditRoles: (role: State['rolesList'][1]) => void;
  editRolesClick: () => Promise<void>;
};

const editRolesRequest = (state: State): editRolesRequest => {
  const { toGetRoles, toEditRole } = rolesRequest(state);

  // 表单对象
  const editRef = ref();

  const openEditRoles = (role: State['rolesList'][1]) => {
    state.editVisiable = true;
    state.editRoles.id = role.id;
    state.editRoles.roleName = role.roleName;
    state.editRoles.roleDesc = role.roleDesc;
  };

  const editRolesClick = async () => {
    // 拿到子组件
    const formNode = editRef.value.formRef;

    formNode.validate(async (validate: boolean) => {
      // 验证表单
      if (!validate) return;
      // 修改按钮加载状态
      state.loading = true;
      // 发起请求
      const result = await toEditRole(state.editRoles);
      // 返回状态验证
      switch (result.meta.msg) {
        case '获取成功':
          ElMessage.success('修改成功');
          // 成功后关闭窗口
          state.editVisiable = false;
          break;
        case '请求发送失败':
          throw new Error('请求发送失败');
      }
      // 修改按钮加载状态
      state.loading = false;
      toGetRoles();
    });
  };
  return {
    editRef,
    openEditRoles,
    editRolesClick,
  };
};

export default editRolesRequest;
