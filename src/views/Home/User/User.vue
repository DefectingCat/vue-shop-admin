<template>
  <ElBreadcrumb separator-class="el-icon-arrow-right">
    <ElBreadcrumbItem :to="{ path: '/home' }">首页</ElBreadcrumbItem>
    <ElBreadcrumbItem>用户管理</ElBreadcrumbItem>
    <ElBreadcrumbItem>用户列表</ElBreadcrumbItem>
  </ElBreadcrumb>

  <ElCard>
    <!-- 搜索 -->
    <ElRow :gutter="20">
      <ElCol :span="6">
        <ElInput
          placeholder="键入用户名以搜索"
          prefix-icon="el-icon-search"
          v-model="queryInfo.query"
          clearable
          @keyup.enter="searchUser"
          @clear="searchUser"
        >
          <template #append>
            <ElButton icon="el-icon-search" @click="searchUser"></ElButton>
          </template>
        </ElInput>
      </ElCol>
      <ElCol :span="4">
        <ElButton type="primary" plain @click="addUser">添加用户</ElButton>
      </ElCol>
    </ElRow>

    <!-- 表格 -->
    <ElTable :data="userList" stripe>
      <ElTableColumn type="index"></ElTableColumn>
      <ElTableColumn label="姓名" prop="username" width="180"></ElTableColumn>
      <ElTableColumn label="电话" prop="mobile" width="180"></ElTableColumn>
      <ElTableColumn label="角色" prop="role_name" width="180"></ElTableColumn>
      <ElTableColumn label="状态" width="80">
        <!--
          通过 scoped slot 拿到子组件的状态
          也就是每一行的状态
        -->
        <template #default="scope">
          <ElSwitch
            v-model="scope.row.mg_state"
            @change="changeUserState(scope.row)"
          ></ElSwitch>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="editUser(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </ElTableColumn>
    </ElTable>

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

  <UserDialog
    title="添加用户"
    v-model:form="addUserForm"
    v-model:visible="dialogVisible"
    :rules="addUserRules"
    :loading="loading"
    @btnClick="addUserRequset"
    ref="formRef"
  />

  <UserDialog
    title="编辑用户"
    v-model:form="editUserForm"
    v-model:visible="editVisible"
    :rules="addUserRules"
    :loading="loading"
    @btnClick="editUserRequest"
    ref="editFormRef"
    :editForm="true"
  />
</template>

<script lang="ts" setup>
import { toRefs } from '@vue/reactivity';
import {
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElCard,
  ElInput,
  ElButton,
  ElRow,
  ElCol,
  ElTable,
  ElTableColumn,
  ElSwitch,
  ElPagination,
} from 'element-plus';
// 编辑用户表单
import UserDialog from '@/components/common/UserDialog.vue';
import userLogic from './UserLogic';
import modifyUser from './UserModify';

// 表单主体逻辑
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
} = toRefs(state);

// 操作用户逻辑
const {
  changeUserState,
  searchUser,
  addUser,
  formRef,
  editFormRef,
  addUserRequset,
  editUser,
  editUserRequest,
} = modifyUser(state);
</script>

<style scoped lang="scss">
.el-card {
  margin-top: 14px;
  border-radius: 10px;
}
.el-table,
.el-pagination {
  margin-top: 15px;
}
</style>
