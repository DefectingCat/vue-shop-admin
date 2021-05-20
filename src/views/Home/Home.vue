<template>
  <div><ElButton type="info" plain @click="logout">退出</ElButton></div>
</template>

<script lang="ts" setup>
import { ElButton, ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  sessionStorage.clear();
  ElMessage({
    showClose: true,
    message: '退出成功！',
    type: 'success',
  });
  router.push('login');
};
</script>

<style scoped lang="scss"></style>
