<template>
  <Breadcrumb>
    <template #l1> 权限管理 </template>
    <template #l2> 角色列表 </template>
  </Breadcrumb>

  <ElCard>
    <ElButton type="primary" plain @click="openAddRoles">添加角色</ElButton>
    <RolesTable :rolesList="rolesList" />
  </ElCard>

  <RolesForm
    title="添加角色"
    v-model:rolesForm="rolesForm"
    :rulesRules="rolesRules"
    :loading="loading"
    v-model:visible="dialogVisiable"
    ref="formRef"
    @btnClick="addRoles"
  />
</template>

<script lang="ts" setup>
// element-puls
import { ElCard, ElButton } from 'element-plus';
// common children
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import RolesTable from '@/components/Home/Roles/RolesTable.vue';
import RolesForm from '@/components/Home/Roles/RolesForm.vue';
// logical
import rolesLogic from './rolesLogic';
import rolesRequest from './rolesRequest';
import { toRefs } from '@vue/reactivity';
import addRolesRequest from './addRoles';

const { state } = rolesLogic();
const { rolesList, rolesForm, rolesRules, dialogVisiable, loading } =
  toRefs(state);

const { toGetRoles } = rolesRequest(state);
// Get roles list in create stage
toGetRoles();

// Add roles
const { formRef, addRoles, openAddRoles } = addRolesRequest(state);
</script>

<style scoped lang="scss"></style>
