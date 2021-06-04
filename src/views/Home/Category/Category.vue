<template>
  <!-- 面包屑导航 -->
  <Breadcrumb>
    <template #l1> 商品管理 </template>
    <template #l2> 商品分类 </template>
  </Breadcrumb>

  <ElCard>
    <CategoryTable :tableData="categoriesList" />
  </ElCard>
</template>

<script lang="ts" setup>
// common components
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import { ElCard } from 'element-plus';
import categoryLogic from './CategoryLogic';
// children
import CategoryTable from '@/components/Home/Category/CategoryTable.vue';
import { toRefs } from '@vueuse/core';

const { state } = categoryLogic();
const { categoriesList } = toRefs(state);
</script>

<style scoped lang="scss"></style>
