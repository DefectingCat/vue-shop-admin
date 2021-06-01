import { State } from './rolesLogic';
import rolesRequest from './rolesRequest';
import { ElLoading, ElMessage } from 'element-plus';
import { nextTick, ref } from '@vue/runtime-core';

const toAssignRoles = (state: State) => {
  // 请求方法
  const { toLoadingRoles, toGetRightsList, toAssignRequest } =
    rolesRequest(state);

  const openAssignDialog = async (role: State['rolesList'][1]) => {
    // 展示 dialog
    state.rightsTreeVisible = true;

    // 加载状态
    await nextTick();
    const loading = ElLoading.service({
      target: '.roles-tree-loading',
      lock: true,
    });

    try {
      // 它会修改 state 中的同名属性 rightsList
      await toGetRightsList('tree');
      // 加载完成，关闭 loading
      loading.close();

      // 同理，三层 for 循环
      // const test: number[] = [];
      // for (const i of role.children) {
      //   for (const o of i.children) {
      //     for (const p of o.children) {
      //       test.push(p.id);
      //     }
      //   }
      // }
      // console.log(test);

      // 循环三次拿到角色已经有的属性; 用于选中已有权限
      state.checkKeys = role.children
        .map((item) =>
          item.children.map((item) => item.children.map((item) => item.id))
        )
        .flat(Infinity);

      // 保存操作的角色 id
      state.assignId = role.id;
    } catch (e) {
      console.log(e);
    }
  };

  // 关闭分配权限 dialog 回调
  const closeRightsTree = () => {
    // when closed dialog, clear the array
    state.checkKeys = [];
  };

  // get child component ref
  const rightsRef = ref();

  // assign rights
  const assignRights = async () => {
    // get child component ref method
    const tree = rightsRef.value.treeRef;
    // calculate checked id
    const rids = {
      rids: [...tree.getCheckedKeys(), ...tree.getHalfCheckedKeys()].join(','),
    };

    try {
      const result = await toAssignRequest(state.assignId, rids);

      // 返回状态验证
      switch (result.meta.msg) {
        case '更新成功':
          ElMessage.success('更新成功');
          // 关闭 dialog
          state.rightsTreeVisible = false;
          // 更新成功时重新请求数据
          toLoadingRoles();
          break;
        case '请求发送失败':
          throw new Error('请求发送失败');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    openAssignDialog,
    closeRightsTree,
    rightsRef,
    assignRights,
  };
};

export default toAssignRoles;
