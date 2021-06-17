<template>
  <Breadcrumb>
    <template #l1> 权限管理 </template>
    <template #l2> 权限列表 </template>
  </Breadcrumb>

  <el-card>
    <RightsTable :rightsList="rightsList" class="rights-table-loading" />
  </el-card>
</template>

<script lang="ts" setup>
// common children
import Breadcrumb from '@/components/common/Breadcrumb.vue';
// children component
import RightsTable from '@/components/Rights/RightsTable.vue';
// logical
import rightsLogic from './rightsLogic';

import { toRefs } from '@vue/reactivity';

const { state } = rightsLogic();
const { rightsList } = toRefs(state);
</script>

<style scoped lang="scss"></style>
