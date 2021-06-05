import request from '@/hook/network/request';
import { State } from './HomeLogic';

type HomeRequest = {
  getMenuList: () => Promise<void>;
};

/**
 * 首页请求
 * @param  {State} state 首页状态
 * @returns HomeRequest
 */
const homeRequest = (state: State): HomeRequest => {
  // 发送请求，获取菜单项目
  const getMenuList = async () => {
    const { data: res } = await request({
      method: 'GET',
      url: 'menus',
    });
    state.menus = res;
  };

  return {
    getMenuList,
  };
};

export default homeRequest;
