<template>
  <!-- 面包屑导航 -->
  <Breadcrumb>
    <template #l1> 商品管理 </template>
    <template #l2> 参数列表 </template>
  </Breadcrumb>

  <el-card>
    <!-- alert -->
    <el-alert
      title="注意：只能为第三级分类设置相关参数！"
      type="warning"
      show-icon
    ></el-alert>

    <!-- pick category -->
    <PickCate
      v-model:cascaderValue="cascaderValue"
      :cascaderOptions="cascaderOptions"
      :cascaderProps="cascaderProps"
      @pickChange="getAttribut"
    ></PickCate>

    <!-- table -->
    <el-tabs v-model="activeName" @tab-click="getAttribut">
      <el-tab-pane label="动态参数" name="many">
        <el-button type="primary" plain size="small" @click="openAddForm"
          >添加参数</el-button
        >
        <ParamsTable
          v-model:attributes="manyData"
          @addAttr="addAttribute"
          @editParam="openEdit"
          @deleteParam="deleteParam"
          @closeTag="closeTag"
        />
        <ParamsForm
          title="添加动态参数"
          v-model:paramForm="paramForm"
          v-model:visible="visible"
          :paramRule="paramRule"
          :loading="loading"
          @btnClick="addManyParam"
        />
        <ParamsForm
          title="编辑动态参数"
          v-model:paramForm="paramForm"
          v-model:visible="editVisible"
          :paramRule="paramRule"
          :loading="loading"
          @btnClick="editManyParam"
        />
      </el-tab-pane>
      <el-tab-pane label="静态属性" name="only">
        <el-button type="primary" plain size="small" @click="openAddForm"
          >添加属性</el-button
        >
        <ParamsTable
          v-model:attributes="onlyData"
          @addAttr="addAttribute"
          @editParam="openEdit"
          @deleteParam="deleteParam"
          @closeTag="closeTag"
        />
        <ParamsForm
          title="添加动态参数"
          v-model:paramForm="paramForm"
          v-model:visible="onlyVisible"
          :paramRule="paramRule"
          :loading="loading"
          @btnClick="addManyParam"
        />
        <ParamsForm
          title="编辑动态参数"
          v-model:paramForm="paramForm"
          v-model:visible="eidtOnlyVisible"
          :paramRule="paramRule"
          :loading="loading"
          @btnClick="editManyParam"
        />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
// 通用组件
import Breadcrumb from '@/components/common/Breadcrumb.vue';
// children
import PickCate from '@/components/Home/Params/PickCate.vue';
import ParamsTable from '@/components/Home/Params/ParamsTable.vue';
import ParamsForm from '@/components/Home/Params/ParamsForm.vue';
// logical
import paramsLogic from './ParamsLogic';
import modifyParams from './modifyParams';
import { toRefs } from '@vueuse/core';

const { state, openAddForm } = paramsLogic();
const {
  cascaderValue,
  cascaderOptions,
  cascaderProps,
  manyData,
  onlyData,
  paramForm,
  paramRule,
  loading,
  visible,
  onlyVisible,
  editVisible,
  eidtOnlyVisible,
  activeName,
} = toRefs(state);

// modify
const {
  getAttribut,
  addAttribute,
  addManyParam,
  openEdit,
  editManyParam,
  deleteParam,
  closeTag,
} = modifyParams(state);
</script>

<style scoped lang="scss"></style>
