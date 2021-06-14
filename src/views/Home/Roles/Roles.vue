<template>
  <Breadcrumb>
    <template #l1> 权限管理 </template>
    <template #l2> 角色列表 </template>
  </Breadcrumb>

  <el-card>
    <el-button type="primary" plain @click="openAddRoles">添加角色</el-button>
    <RolesTable
      :rolesList="rolesList"
      @editRole="openEditRoles"
      @deleteRole="deleteRolesClick"
      @handleClose="deleteRight"
      @assignRights="openAssignDialog"
      class="roles-table-loading"
    />
  </el-card>

  <RolesForm
    title="添加角色"
    v-model:rolesForm="rolesForm"
    :rulesRules="rolesRules"
    :loading="loading"
    v-model:visible="dialogVisiable"
    ref="formRef"
    @btnClick="addRoles"
  />

  <RolesForm
    title="编辑角色"
    v-model:rolesForm="editRoles"
    :rulesRules="rolesRules"
    :loading="loading"
    v-model:visible="editVisiable"
    ref="editRef"
    @btnClick="editRolesClick"
  />

  <RightsTree
    v-model:rightsTreeVisible="rightsTreeVisible"
    :treeProps="treeProps"
    :rightsList="rightsList"
    :checkKeys="checkKeys"
    :loading="loading"
    @closeRightsTree="closeRightsTree"
    @assignRights="assignRights"
    ref="rightsRef"
  />
</template>

<script lang="ts" setup>
// common children
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import RolesTable from '@/components/Home/Roles/RolesTable.vue';
import RolesForm from '@/components/Home/Roles/RolesForm.vue';
import RightsTree from '@/components/Home/Roles/RightsTree.vue';
// logical
import rolesLogic from './rolesLogic';
import { toRefs } from '@vue/reactivity';
import addRolesRequest from './addRoles';
import editRolesRequest from './editRoles';
import deleteRolesRequest from './deleteRole';
import toAssignRoles from './assignRoles';

const { state } = rolesLogic();
const {
  rolesList,
  rolesForm,
  rolesRules,
  dialogVisiable,
  loading,
  editRoles,
  editVisiable,
  rightsTreeVisible,
  rightsList,
  treeProps,
  checkKeys,
} = toRefs(state);

// Add roles
const { formRef, addRoles, openAddRoles } = addRolesRequest(state);

// Edit roles
const { editRef, openEditRoles, editRolesClick } = editRolesRequest(state);

// delete role
const { deleteRolesClick, deleteRight } = deleteRolesRequest(state);

// assign roles
const { openAssignDialog, closeRightsTree, rightsRef, assignRights } =
  toAssignRoles(state);
</script>

<style scoped lang="scss"></style>
