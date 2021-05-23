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
      <ElTableColumn label="姓名" prop="username"></ElTableColumn>
      <ElTableColumn label="电话" prop="mobile"></ElTableColumn>
      <ElTableColumn label="角色" prop="role_name"></ElTableColumn>
      <ElTableColumn label="状态">
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
      <ElTableColumn label="操作"></ElTableColumn>
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

  <ElDialog title="添加用户" v-model="dialogVisible" width="30%">
    <!-- 主体区域 -->
    <ElForm
      :model="addUserForm"
      ref="userForm"
      label-width="66px"
      :rules="addUserRules"
    >
      <ElFormItem prop="username" label="用户名">
        <ElInput v-model="addUserForm.username" placeholder="用户名"></ElInput>
      </ElFormItem>
      <ElFormItem prop="password" label="密码" show-password>
        <ElInput v-model="addUserForm.password" placeholder="密码"></ElInput>
      </ElFormItem>
      <ElFormItem prop="email" label="邮箱">
        <ElInput v-model="addUserForm.email" placeholder="邮箱"></ElInput>
      </ElFormItem>
      <ElFormItem prop="mobile" label="手机">
        <ElInput v-model="addUserForm.mobile" placeholder="手机"></ElInput>
      </ElFormItem>
    </ElForm>
    <!-- footer -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </template>
  </ElDialog>
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
  ElDialog,
  ElForm,
  ElFormItem,
} from 'element-plus';
import userLogic from './UserLogic';
import modifyUser from './UserModify';

// 表单主体逻辑
const { state, userForm, handleSizeChange, handleCurrentChange } = userLogic();
const {
  queryInfo,
  userList,
  totalUsers,
  dialogVisible,
  addUserForm,
  addUserRules,
} = toRefs(state);

// 操作用户逻辑
const { changeUserState, searchUser, addUser } = modifyUser(state);
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
