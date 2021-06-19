<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item> 商品管理 </el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/goods' }"> 商品列表 </el-breadcrumb-item>
    <el-breadcrumb-item> 添加商品 </el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>
    <el-alert title="添加商品" type="info" center show-icon :closable="false">
    </el-alert>

    <el-steps :active="activeIndex" simple>
      <el-step
        v-for="item in addGoodSteps"
        :key="item.id"
        :title="item.title"
        icon="el-icon-edit"
      ></el-step>
    </el-steps>

    <AddGoodsForm
      v-model:tabsIndex="tabsIndex"
      v-model:addForm="addForm"
      :addFormRules="addFormRules"
      ref="addFormRef"
      :cateList="cateList"
      :cateProps="cateProps"
      @cascadChange="cascadChange"
      @tabClick="tabClick"
      v-model:manyTableData="manyTableData"
      v-model:onlyTableData="onlyTableData"
      :uploadURL="uploadURL"
      :uploadHeader="uploadHeader"
      @addGoods="addGoods"
    />
  </el-card>
</template>

<script lang="ts" setup>
// logical
import { toRefs } from '@vueuse/core';
import addGoodlogic from './AddGoodLogic';
// Children
import AddGoodsForm from '@/components/Goods/AddGoodsForm.vue';

const { state, tabsIndex, addFormRef, cascadChange, tabClick, addGoods } =
  addGoodlogic();
const {
  activeIndex,
  addGoodSteps,
  addForm,
  addFormRules,
  cateList,
  cateProps,
  manyTableData,
  onlyTableData,
  uploadURL,
  uploadHeader,
} = toRefs(state);
</script>

<style scoped lang="scss">
.el-steps {
  margin-top: 10px;
}
</style>
