<template>
  <Breadcrumb>
    <template #l1> 权限管理 </template>
    <template #l2> 角色列表 </template>
  </Breadcrumb>

  <ElCard>
    <RolesTable :rolesList="rolesList" />
  </ElCard>
</template>

<script lang="ts" setup>
// element-puls
import { ElCard } from 'element-plus';
// common children
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import RolesTable from '@/components/Home/Roles/RolesTable.vue';
// logical
import rolesLogic from './rolesLogic';
import rolesRequest from './rolesRequest';
import { toRefs } from '@vue/reactivity';

const { state } = rolesLogic();
const { rolesList } = toRefs(state);

const { toGetRoles } = rolesRequest();
// Get roles list in create stage
toGetRoles(state);
</script>

<style scoped lang="scss"></style>
