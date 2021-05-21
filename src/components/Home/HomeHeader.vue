<template>
  <div class="head-left">
    <svg
      class="icon head-icon"
      :class="{ 'trans-icon': !isCollapse }"
      aria-hidden="true"
      @click="foldMenu"
    >
      <use xlink:href="#xfy-zhankai"></use>
    </svg>
    <span>后台管理系统</span>
  </div>

  <div class="head-right">
    <ElButton type="info" plain @click="logout">退出</ElButton>
  </div>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from '@vue/runtime-core';
import { ElButton, ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const props =
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

// 通知父组件折叠菜单
const foldMenu = () => {
  emit('fold-menu');
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
}
.head-right {
  display: flex;
}
</style>
