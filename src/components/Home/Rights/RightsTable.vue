<template>
  <!-- Table -->
  <el-table :data="rightsList">
    <el-table-column type="index"></el-table-column>
    <el-table-column label="权限名称" prop="authName"></el-table-column>
    <el-table-column label="路径" prop="path"></el-table-column>
    <el-table-column label="权限等级" prop="level">
      <template #default="scope">
        <el-tag v-if="scope.row.level === '0'" effect="plain">一级权限</el-tag>
        <el-tag
          v-else-if="scope.row.level === '1'"
          type="success"
          effect="plain"
        >
          二级权限
        </el-tag>
        <el-tag v-else type="warning" effect="plain">三级权限</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core';
import type { State } from '@/views/Home/Rights/rightsLogic';

defineProps<{
  rightsList: State['rightsList'];
}>();
</script>

<style scoped lang="scss"></style>
