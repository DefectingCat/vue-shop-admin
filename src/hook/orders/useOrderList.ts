import { onMounted, Ref, ref } from 'vue';
import request from '@/hook/network/request';
import { ElMessage } from 'element-plus';
import type { QueryInfo, Orders } from '@/types/orders/index';
import { ElLoading } from 'element-plus';
import { nextTick } from 'vue';
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';

type useOrderList = (queryInfo: QueryInfo) => {
  total: Ref<number | undefined>;
  orderList: Ref<Orders['goods'] | undefined>;
  getOrderList: () => Promise<void>;
};

/**
 * 获取订单列表请求
 * 第一次调用时直接返回列表数据
 */
const useOrderList: useOrderList = (queryInfo: QueryInfo) => {
  const total = ref<number>();
  const orderList = ref<Orders['goods']>();
  let loading: ILoadingInstance;

  /**
   * 发送获取订单列表请求
   * 该函数后续可以直接更新订单列表
   */
  const getOrderList = async () => {
    try {
      // 对表格进行 loading 动画
      await nextTick();
      loading = ElLoading.service({
        target: '.orders-table-loading',
        lock: true,
      });
      // 发送请求
      const { data: res } = await request.get('/orders', {
        params: queryInfo,
      });
      total.value = res.total;
      orderList.value = res.goods;
    } catch (e) {
      ElMessage.error('请求超时！');
    } finally {
      // 加载完成，关闭 loading
      loading.close();
    }
  };
  // 在 onMounted 阶段发送请求
  onMounted(getOrderList);

  return {
    total,
    orderList,
    getOrderList,
  };
};

export default useOrderList;
