<template>
  <ElContainer>
    <ElHeader>
      <!-- header child component -->
      <HomeHeader @fold-menu="foldMenu" :isCollapse="isCollapse" />
    </ElHeader>

    <ElContainer>
      <ElAside :width="isCollapse ? '64px' : '270px'">
        <!-- side child component -->
        <HomeSide :state="state" />
      </ElAside>

      <ElMain class="home-body">
        <router-view v-slot="{ Component }">
          <keep-alive exclude="">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script lang="ts" setup>
import { toRefs } from '@vue/reactivity';
import { ElContainer, ElHeader, ElMain, ElAside } from 'element-plus';
// child components
import HomeHeader from '@/components/Home/HomeHeader.vue';
import HomeSide from '@/components/Home/HomeSide.vue';
// logical
import homeLogic from './HomeLogic';
import homeRequest from './HomeRequest';

// 主要逻辑
const { state, foldMenu } = homeLogic();
const { isCollapse } = toRefs(state);

// 发送菜单请求
const { getMenuList } = homeRequest(state);
getMenuList();
</script>
<style scoped lang="scss">
.home-body {
  height: 100%;
  background-color: #edf1f7;
}
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  background-color: #fff;
  transition: all 0.3s ease;
}
.el-container {
  height: 100%;
}
</style>
