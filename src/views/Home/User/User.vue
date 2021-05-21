<template>
  <ElBreadcrumb separator-class="el-icon-arrow-right">
    <ElBreadcrumbItem :to="{ path: '/home' }">首页</ElBreadcrumbItem>
    <ElBreadcrumbItem>用户管理</ElBreadcrumbItem>
    <ElBreadcrumbItem>用户列表</ElBreadcrumbItem>
  </ElBreadcrumb>

  <ElCard>
    <ElRow :gutter="20">
      <ElCol :span="8">
        <ElInput placeholder="请输入内容" prefix-icon="el-icon-search">
          <template #append>
            <ElButton icon="el-icon-search"></ElButton>
          </template>
        </ElInput>
      </ElCol>
      <ElCol :span="4">
        <ElButton type="primary" plain>添加用户</ElButton>
      </ElCol>
    </ElRow>
  </ElCard>
</template>

<script lang="ts" setup>
import {
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElCard,
  ElInput,
  ElButton,
  ElRow,
  ElCol,
} from 'element-plus';
</script>

<style scoped lang="scss">
.el-card {
  margin-top: 14px;
  border-radius: 10px;
}
</style>
