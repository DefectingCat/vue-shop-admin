<template>
  <!-- 面包屑导航 -->
  <Breadcrumb>
    <template #l1> 用户管理 </template>
    <template #l2> 用户列表 </template>
  </Breadcrumb>

  <ElCard>
    <!-- 搜索 -->
    <ToSearch
      v-model:queryInfo="queryInfo"
      placeholder="键入用户名以搜索"
      btnMsg="添加用户"
      @toSearch="searchUser"
      @toAdd="addUser"
    />

    <!-- 表格 -->
    <UserTable
      :userList="userList"
      @changeUserState="changeUserState"
      @editUser="editUser"
      @deleteUser="deleteUser"
      @assignRole="assignRole"
    />

    <!-- 分页 -->
    <ElPagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalUsers"
    />
  </ElCard>

  <!-- 添加用户表单 -->
  <UserForm
    title="添加用户"
    v-model:form="addUserForm"
    v-model:visible="dialogVisible"
    :rules="addUserRules"
    :loading="loading"
    @btnClick="addUserRequset"
    ref="formRef"
  />

  <!-- 编辑用户表单 -->
  <UserForm
    title="编辑用户"
    v-model:form="editUserForm"
    v-model:visible="editVisible"
    :rules="addUserRules"
    :loading="loading"
    @btnClick="editUserRequest"
    ref="editFormRef"
    :editForm="true"
  />

  <!-- 分配角色 -->
  <AssignRole
    v-model:assignVisible="assignVisible"
    :toAssign="toAssign"
    :rolesList="rolesList"
    v-model:selectId="selectId"
    @confirmClick="doAssign"
    :loading="loading"
  />
</template>

<script lang="ts" setup>
import { toRefs } from '@vue/reactivity';
import { ElCard, ElPagination } from 'element-plus';
// 通用组件
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import ToSearch from '@/components/common/ToSearch.vue';
// 子组件
import UserTable from '@/components/Home/User/UserTable.vue';
import AssignRole from '@/components/Home/User/AssignRole.vue';
import UserForm from '@/components/Home/User/UserForm.vue';
// 用户逻辑
import userLogic from './UserLogic';
import modifyUser from './modifyUser';
import toAddUser from './addUser';
import toEditUser from './editUser';
import toDeleteUser from './deleteUser';
import toAssignRole from './assignRole';

// 主体逻辑
const { state, handleSizeChange, handleCurrentChange } = userLogic();
const {
  queryInfo,
  userList,
  totalUsers,
  dialogVisible,
  loading,
  addUserForm,
  addUserRules,
  editVisible,
  editUserForm,
  assignVisible,
  toAssign,
  rolesList,
  selectId,
} = toRefs(state);

// 操作用户逻辑
const { changeUserState, searchUser } = modifyUser(state);
// 添加用户
const { addUser, formRef, addUserRequset } = toAddUser(state);
// 编辑用户
const { editFormRef, editUser, editUserRequest } = toEditUser(state);
// 删除用户
const { deleteUser } = toDeleteUser(state);
// 分配角色
const { assignRole, doAssign } = toAssignRole(state);
</script>

<style scoped lang="scss">
.el-table,
.el-pagination {
  margin-top: 15px;
}
</style>
