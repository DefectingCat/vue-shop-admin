import rolesRequest from './rolesRequest';
import { ElMessage } from 'element-plus';
import { State } from './rolesLogic';
import { ref } from '@vue/reactivity';
import { Ref } from 'vue';

type addRolesRequest = {
  formRef: Ref<unknown>;
  addRoles: () => Promise<void>;
  openAddRoles: () => void;
};

const addRolesRequest = (state: State): addRolesRequest => {
  const { toGetRoles, toAddRole } = rolesRequest(state);

  // 表单对象
  const formRef = ref();

  const openAddRoles = () => {
    state.dialogVisiable = true;
  };

  const addRoles = async () => {
    // 拿到子组件
    const formNode = formRef.value.$refs.formRef;
    formNode.validate(async (validate: boolean) => {
      // 验证表单
      if (!validate) return;
      // 修改按钮加载状态
      state.loading = true;
      // 发送请求
      const result = await toAddRole();

      // 返回状态验证
      switch (result.meta.msg) {
        case '创建成功':
          ElMessage.success('创建成功');
          // 关闭 dialog
          state.dialogVisiable = false;
          // 创建成功时重置表单字段
          state.rolesForm = {
            roleName: '',
            roleDesc: '',
          };
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
    formRef,
    addRoles,
    openAddRoles,
  };
};

export default addRolesRequest;
