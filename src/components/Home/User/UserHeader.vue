<template>
  <ElBreadcrumb separator-class="el-icon-arrow-right">
    <ElBreadcrumbItem :to="{ path: '/home' }">首页</ElBreadcrumbItem>
    <ElBreadcrumbItem>用户管理</ElBreadcrumbItem>
    <ElBreadcrumbItem>用户列表</ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<script lang="ts" setup>
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
</script>

<style scoped lang="scss"></style>
