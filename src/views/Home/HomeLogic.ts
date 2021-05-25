import { reactive } from 'vue';

export type State = {
  menus: {
    id: number;
    authName: string;
    path: string;
    children: {
      id: number;
      authName: string;
      path: string;
      order: string;
    }[];
    order: string;
  }[];
  icons: Record<string, string>;
  isCollapse: boolean;
};

type HomeLogic = {
  state: State;
  foldMenu: () => void;
};

const homeLogic = (): HomeLogic => {
  const state = reactive<State>({
    // 菜单列表
    menus: [],
    // id 对应图标
    icons: {
      '125': '#xfy-yonghu',
      '103': '#xfy-quanxian',
      '101': '#xfy-shangpin',
      '102': '#xfy-dingdan',
      '145': '#xfy-shuju',
    },
    // 是否折叠
    isCollapse: true,
  });

  // 折叠菜单
  const foldMenu = () => {
    state.isCollapse = !state.isCollapse;
  };

  return {
    state,
    foldMenu,
  };
};

export default homeLogic;
