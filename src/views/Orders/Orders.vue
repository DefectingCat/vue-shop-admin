<template>
  <!-- 面包屑导航 -->
  <Breadcrumb>
    <template #l1> 订单管理 </template>
    <template #l2> 订单列表 </template>
  </Breadcrumb>

  <el-card>
    <!-- 搜索 -->
    <ToSearch
      v-model:queryInfo="queryInfo"
      placeholder="键入订单号以搜索"
      @toSearch="getOrderList"
    />

    <!-- 表格 -->
    <OrdersTable :orderList="orderList" @openAddr="openAddr" />

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />

    <!-- 修改地址 -->
    <ChangeAddress v-model:visible="visible" />
  </el-card>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, reactive, ref } from 'vue';
// common components
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import ToSearch from '@/components/common/ToSearch.vue';
// types
import type { QueryInfo } from '@/types/orders/index';
// hook
import useOrderList from '@/hook/orders/useOrderList';
// children
import OrdersTable from '@/components/Orders/OrdersTable.vue';
// import ChangeAddress from '@/components/Orders/ChangeAddress.vue';
const ChangeAddress = defineAsyncComponent(
  () => import('@/components/Orders/ChangeAddress.vue')
);

/**
 * 后端查询参数
 */
const queryInfo = reactive<QueryInfo>({
  query: '',
  pagenum: 1,
  pagesize: 10,
});

/**
 * 获取订单列表
 */
const { total, orderList, getOrderList } = useOrderList(queryInfo);

/**
 * 处理分页方法
 * handleSizeChange：每页显示数量
 * handleCurrentChange：翻页
 */
const handleSizeChange = (val: number) => {
  queryInfo.pagesize = val;
  getOrderList();
};
const handleCurrentChange = (val: number) => {
  queryInfo.pagenum = val;
  getOrderList();
};

/**
 * 修改地址方法
 * openAddr：监听自 form OrdersTable
 */
const visible = ref(false);
const openAddr = () => {
  visible.value = true;
};
</script>

<style scoped lang="scss">
.el-table,
.el-pagination {
  margin-top: 15px;
}
</style>
