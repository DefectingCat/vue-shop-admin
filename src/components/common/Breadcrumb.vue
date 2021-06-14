<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <slot name="l1">用户管理</slot>
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      <slot name="l2">用户列表</slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss"></style>
