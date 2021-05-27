<template>
  <ElBreadcrumb separator-class="el-icon-arrow-right">
    <ElBreadcrumbItem :to="{ path: '/home' }">首页</ElBreadcrumbItem>
    <ElBreadcrumbItem>
      <slot name="l1">用户管理</slot>
    </ElBreadcrumbItem>
    <ElBreadcrumbItem>
      <slot name="l2">用户列表</slot>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<script lang="ts" setup>
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
</script>

<style scoped lang="scss"></style>
