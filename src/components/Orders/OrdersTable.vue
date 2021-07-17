<template>
  <el-table :data="orderList" stripe class="orders-table-loading">
    <el-table-column type="index"></el-table-column>
    <el-table-column label="订单编号" prop="order_number"></el-table-column>
    <el-table-column label="订单价格" prop="order_price"></el-table-column>
    <el-table-column label="付款状态" prop="pay_status">
      <template #default="{ row }">
        <el-tag type="success" v-if="Number(row.pay_status)">已付款</el-tag>
        <el-tag type="danger" v-else>未付款</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="是否发货" prop="is_send"></el-table-column>
    <el-table-column label="下单时间" prop="update_time">
      <template #default="{ row }">
        {{ parseDate(row.update_time) }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default>
        <!-- 打开修改地址按钮 -->
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          @click="emit('openAddr')"
        ></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import type { Orders } from '@/types/orders/index';
import { defineEmit, defineProps } from 'vue';
import { parseDate } from '@/hook/util/parseDate';

defineProps<{
  orderList: Orders['goods'];
}>();

const emit = defineEmit(['openAddr']);
</script>

<style scoped lang="scss"></style>
