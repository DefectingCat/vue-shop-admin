<template>
  <!-- 搜索 -->
  <ElRow :gutter="20">
    <ElCol :span="6">
      <ElInput
        placeholder="键入用户名以搜索"
        prefix-icon="el-icon-search"
        v-model="queryInfo.query"
        clearable
        @keyup.enter="emit('searchUser')"
        @clear="emit('searchUser')"
      >
        <template #append>
          <ElButton
            icon="el-icon-search"
            @click="emit('searchUser')"
          ></ElButton>
        </template>
      </ElInput>
    </ElCol>
    <ElCol :span="4">
      <ElButton type="primary" plain @click="emit('addUser')"
        >添加用户</ElButton
      >
    </ElCol>
  </ElRow>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from '@vue/runtime-core';
import { ElInput, ElButton, ElRow, ElCol } from 'element-plus';
import type { State } from '@/views/Home/User/UserLogic';

defineProps<{
  queryInfo: State['queryInfo'];
}>();

const emit = defineEmit(['searchUser', 'addUser']);
</script>

<style scoped lang="scss"></style>
