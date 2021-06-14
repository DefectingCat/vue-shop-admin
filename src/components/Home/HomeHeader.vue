<template>
  <div class="head-left">
    <svg
      class="icon head-icon"
      :class="{ 'trans-icon': !isCollapse }"
      aria-hidden="true"
      @click="emit('fold-menu')"
    >
      <use xlink:href="#xfy-zhankai"></use>
    </svg>
    <span class="head-left__title" @click="goHome">后台管理系统</span>
  </div>

  <div class="head-right">
    <el-button type="info" plain @click="logout">退出</el-button>
  </div>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from '@vue/runtime-core';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

defineProps<{
  isCollapse: boolean;
}>();
const emit = defineEmit(['fold-menu']);

const router = useRouter();

// 注销按钮
const logout = () => {
  sessionStorage.clear();
  ElMessage({
    showClose: true,
    message: '退出成功！',
    type: 'success',
  });
  router.push('login');
};

// 单击标题返回首页 welcome
const goHome = () => {
  router.push('welcome');
};
</script>

<style scoped lang="scss">
.head-left {
  display: flex;
  align-items: center;
  font-size: 18px;
  .head-icon {
    cursor: pointer;
    margin-right: 10px;
    transition: all 0.3s ease;
  }
  .trans-icon {
    transform: rotateZ(180deg);
  }
  &__title {
    user-select: none;
    cursor: pointer;
  }
}
.head-right {
  display: flex;
}
</style>
