<template>
  <!-- 表格 -->
  <ElTable :data="userList" stripe class="user-table-loading">
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
          @change="emit('changeUserState', scope.row)"
        ></ElSwitch>
      </template>
    </ElTableColumn>
    <ElTableColumn label="操作">
      <template #default="scope">
        <ElTooltip effect="light" content="编辑用户" placement="top">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="emit('editUser', scope.row)"
          ></el-button>
        </ElTooltip>

        <ElTooltip effect="light" content="删除用户" placement="top">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="emit('deleteUser', scope.row.id)"
          ></el-button>
        </ElTooltip>

        <ElTooltip effect="light" content="分配角色" placement="top">
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-setting"
            @click="emit('assignRole', scope.row)"
          ></el-button>
        </ElTooltip>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from '@vue/runtime-core';
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElSwitch,
  ElTooltip,
} from 'element-plus';
import type { State } from '@/views/Home/User/UserLogic';

defineProps<{
  userList: State['userList'];
}>();

const emit = defineEmit([
  'changeUserState',
  'editUser',
  'deleteUser',
  'assignRole',
]);
</script>

<style scoped lang="scss"></style>
