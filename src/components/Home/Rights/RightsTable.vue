<template>
  <!-- Table -->
  <ElTable :data="rightsList">
    <ElTableColumn type="index"></ElTableColumn>
    <ElTableColumn label="权限名称" prop="authName"></ElTableColumn>
    <ElTableColumn label="路径" prop="path"></ElTableColumn>
    <ElTableColumn label="权限等级" prop="level">
      <template #default="scope">
        <ElTag v-if="scope.row.level === '0'" effect="plain">一级权限</ElTag>
        <ElTag
          v-else-if="scope.row.level === '1'"
          type="success"
          effect="plain"
        >
          二级权限
        </ElTag>
        <ElTag v-else type="warning" effect="plain">三级权限</ElTag>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core';
import { ElTable, ElTableColumn, ElTag } from 'element-plus';
import type { State } from '@/views/Home/Rights/rightsLogic';

defineProps<{
  rightsList: State['rightsList'];
}>();
</script>

<style scoped lang="scss"></style>
