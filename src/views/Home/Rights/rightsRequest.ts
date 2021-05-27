import request from '@/hook/network/request';
import { ElMessage } from 'element-plus';
import { State } from './rightsLogic';

type rightsRequest = {
  toGetRightsList: (state: State) => Promise<void>;
};

const rightsRequest = (): rightsRequest => {
  const toGetRightsList = async (state: State) => {
    try {
      const { data: res } = await request.get('/rights/list');
      state.rightsList = res;
    } catch (e) {
      ElMessage.error('请求发送失败');
      console.error(e);
    }
  };

  return {
    toGetRightsList,
  };
};

export default rightsRequest;
