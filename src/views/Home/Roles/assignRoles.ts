import { State } from './rolesLogic';
import rolesRequest from './rolesRequest';
import { ElLoading } from 'element-plus';
import { nextTick } from '@vue/runtime-core';

const toAssignRoles = (state: State) => {
  // 复用一下隔壁页面的请求权限列表方法
  const { toGetRightsList } = rolesRequest(state);

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
    } catch (e) {
      console.log(e);
    }
  };

  // 关闭分配权限 dialog 回调
  const closeRightsTree = () => {
    //
    console.log('close tree');

    state.checkKeys = [];
  };

  return {
    openAssignDialog,
    closeRightsTree,
  };
};

export default toAssignRoles;
