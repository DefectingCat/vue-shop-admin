import request from '@/hook/network/request';
import { ElMessage } from 'element-plus';
import { State } from './rightsLogic';

type rightsRequest = {
  toGetRightsList: (display: 'list' | 'tree') => Promise<void>;
};

const rightsRequest = (state: State): rightsRequest => {
  const toGetRightsList = async (display: 'list' | 'tree') => {
    try {
      const { data: res } = await request.get(`/rights/${display}`);
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
