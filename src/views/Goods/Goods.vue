<template>
  <!-- 面包屑导航 -->
  <Breadcrumb>
    <template #l1> 商品管理 </template>
    <template #l2> 商品列表 </template>
  </Breadcrumb>

  <el-card>
    <!-- 搜索 -->
    <ToSearch
      v-model:queryInfo="queryInfo"
      placeholder="键入商品名以搜索"
      btnMsg="添加商品"
      @toSearch="toSearchGoods"
      @toAdd="openAddUserDialog"
    />

    <!-- 表格 -->
    <GoodsTable :goodsList="goodsList"></GoodsTable>
  </el-card>
</template>

<script lang="ts" setup>
import { toRefs } from '@vueuse/core';
// common components
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import ToSearch from '@/components/common/ToSearch.vue';
// children
import GoodsTable from '@/components/Goods/GoodsTable.vue';
// logical
import goodsLogic from './GoodsLogic';
import goodsRequest from './GoodsRequest';
import addGoods from './addGoods';

const { state } = goodsLogic();
const { goodsList, queryInfo } = toRefs(state);

// request
const { toSearchGoods } = goodsRequest(state);

// add good
const { openAddUserDialog } = addGoods(state);
</script>

<style scoped lang="scss"></style>
