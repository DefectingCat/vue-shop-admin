<template>
  <el-container class="home-wrapper">
    <el-header>
      <!-- header child component -->
      <HomeHeader @fold-menu="foldMenu" :isCollapse="isCollapse" />
    </el-header>

    <el-container class="home-main">
      <el-aside :width="isCollapse ? '64px' : '270px'">
        <!-- side child component -->
        <HomeSide :state="state" />
      </el-aside>

      <el-main class="home-body">
        <!-- <router-view v-slot="{ Component }">
          <keep-alive exclude="">
            <component :is="Component" />
          </keep-alive>
        </router-view> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { toRefs } from '@vue/reactivity';
// child components
import HomeHeader from '@/components/HomeHeader.vue';
import HomeSide from '@/components/HomeSide.vue';
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
  background-color: #edf1f7;
  border-radius: 10px;
  overflow-y: auto;
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
.home-wrapper {
  height: 100%;
  .home-main {
    overflow-y: hidden;
  }
}
</style>
