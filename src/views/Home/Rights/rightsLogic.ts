import { reactive } from '@vue/reactivity';
import { ElLoading } from 'element-plus';
import { nextTick } from 'vue';
// network
import rightsRequest from './rightsRequest';
// import { toLoadingRequest } from '@/hook/network/request';

type Rights = {
  id: number;
  authName: string;
  level: number;
  pid: number;
  path: string;
};

export type State = {
  rightsList: Rights[];
};

type rightsLogic = {
  state: State;
};

/**
 * 权限列表页主要逻辑
 * @returns rightsLogic
 */
const rightsLogic = (): rightsLogic => {
  const state: State = reactive({
    rightsList: [],
  });

  // Get rights list
  const { toGetRightsList } = rightsRequest(state);
  // Send request in create stage
  // toLoadingRequest('.rights-table-loading', toGetRightsList)
  (async () => {
    await nextTick();
    const loading = ElLoading.service({
      target: '.rights-table-loading',
      lock: true,
    });

    await toGetRightsList('list');
    // 加载完成，关闭 loading
    loading.close();
  })();

  return {
    state,
  };
};

export default rightsLogic;
