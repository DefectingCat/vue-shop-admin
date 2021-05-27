<template>
  <Breadcrumb>
    <template #l1> 权限管理 </template>
    <template #l2> 权限列表 </template>
  </Breadcrumb>

  <ElCard>
    <RightsTable :rightsList="rightsList" />
  </ElCard>
</template>

<script lang="ts" setup>
// element-puls
import { ElCard } from 'element-plus';
// common children
import Breadcrumb from '@/components/common/Breadcrumb.vue';
// children component
import RightsTable from '@/components/Home/Rights/RightsTable.vue';
// logical
import rightsLogic from './rightsLogic';
// network
import rightsRequest from './rightsRequest';
import { toRefs } from '@vue/reactivity';

const { state } = rightsLogic();
const { rightsList } = toRefs(state);

// Get rights list
const { toGetRightsList } = rightsRequest();
// Send request in create stage
toGetRightsList(state);
</script>

<style scoped lang="scss"></style>
