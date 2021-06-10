<template>
  <!-- 面包屑导航 -->
  <Breadcrumb>
    <template #l1> 商品管理 </template>
    <template #l2> 参数列表 </template>
  </Breadcrumb>

  <ElCard>
    <!-- alert -->
    <ElAlert
      title="注意：只能为第三级分类设置相关参数！"
      type="warning"
      show-icon
    ></ElAlert>

    <!-- pick category -->
    <PickCate
      v-model:cascaderValue="cascaderValue"
      :cascaderOptions="cascaderOptions"
      :cascaderProps="cascaderProps"
      @pickChange="getAttribut"
    ></PickCate>

    <!-- table -->
    <ElTabs>
      <ElTabPane label="动态参数">
        <ElButton type="primary" plain size="small" @click="openAddForm"
          >添加参数</ElButton
        >
        <ParamsTable v-model:attributes="attributes" @addAttr="addAttribute" />
        <ParamsForm
          title="添加动态参数"
          v-model:paramForm="paramForm"
          v-model:visible="visible"
          :paramRule="paramRule"
          :loading="loading"
          @btnClick="addManyParam"
        />
      </ElTabPane>
      <ElTabPane label="静态属性">
        <ElButton type="primary" plain size="small">添加属性</ElButton>
      </ElTabPane>
    </ElTabs>
  </ElCard>
</template>

<script lang="ts" setup>
import { ElCard, ElAlert, ElTabs, ElTabPane, ElButton } from 'element-plus';
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
  attributes,
  paramForm,
  paramRule,
  loading,
  visible,
} = toRefs(state);

// modify
const { getAttribut, addAttribute, addManyParam } = modifyParams(state);
</script>

<style scoped lang="scss"></style>
