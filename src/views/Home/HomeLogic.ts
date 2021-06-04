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
  // 拿取上次的用户偏好
  const isCollapse = localStorage.getItem('isCollapse');

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
    isCollapse: isCollapse ? JSON.parse(isCollapse) : false,
  });

  // 折叠菜单
  const foldMenu = () => {
    state.isCollapse = !state.isCollapse;
    // 保存到 localStorage
    localStorage.setItem('isCollapse', state.isCollapse.toString());
  };

  return {
    state,
    foldMenu,
  };
};

export default homeLogic;
