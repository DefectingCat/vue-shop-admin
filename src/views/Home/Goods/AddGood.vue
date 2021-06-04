<template>
  <!-- 面包屑导航 -->
  <ElBreadcrumb separator-class="el-icon-arrow-right">
    <ElBreadcrumbItem :to="{ path: '/home' }">首页</ElBreadcrumbItem>
    <ElBreadcrumbItem> 商品管理 </ElBreadcrumbItem>
    <ElBreadcrumbItem :to="{ path: '/goods' }"> 商品列表 </ElBreadcrumbItem>
    <ElBreadcrumbItem> 添加商品 </ElBreadcrumbItem>
  </ElBreadcrumb>

  <ElCard>
    <el-alert title="添加商品" type="info" center show-icon :closable="false">
    </el-alert>

    <el-steps :active="1" simple>
      <el-step
        v-for="item in addGoodSteps"
        :key="item.id"
        :title="item.title"
        icon="el-icon-edit"
      ></el-step>
    </el-steps>

    <el-tabs tab-position="left" style="height: 200px">
      <el-tab-pane
        v-for="item in addGoodSteps"
        :key="item.id"
        :label="item.title"
      >
        {{ item.title }}
      </el-tab-pane>
    </el-tabs>
  </ElCard>
</template>

<script lang="ts" setup>
// common components
import { toRefs } from '@vueuse/core';
import {
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElCard,
  ElAlert,
  ElSteps,
  ElStep,
  ElTabs,
  ElTabPane,
} from 'element-plus';
import { reactive } from 'vue';
export type State = {
  addGoodSteps: {
    id: number;
    title: string;
  }[];
};

const state: State = reactive({
  // 添加商品步骤
  addGoodSteps: [
    { id: 0, title: '基本信息' },
    { id: 1, title: '商品参数' },
    { id: 2, title: '商品属性' },
    { id: 3, title: '商品图片' },
    { id: 4, title: '商品内容' },
  ],
});
const { addGoodSteps } = toRefs(state);
</script>

<style scoped lang="scss"></style>
