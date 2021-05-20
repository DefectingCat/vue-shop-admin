<template>
  <ElContainer>
    <ElHeader>
      <div class="head-left">
        <svg class="icon head-icon" aria-hidden="true" @click="foldMenu">
          <use xlink:href="#xfy-zhankai"></use>
        </svg>
        <span>后台管理系统</span>
      </div>

      <div class="head-right">
        <ElButton type="info" plain @click="logout">退出</ElButton>
      </div>
    </ElHeader>

    <ElContainer>
      <ElAside>
        <ElMenu
          v-for="item of menus"
          :key="item.id"
          :collapse="isCollapse"
          :unique-opened="true"
        >
          <ElSubmenu :index="item.id.toString()">
            <template #title>
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="icons[item.id]"></use>
              </svg>
              <span>{{ item.authName }}</span>
            </template>

            <ElMenuItemGroup>
              <ElMenuItem
                v-for="subItem of item.children"
                :key="subItem.id"
                :index="subItem.id.toString()"
              >
                <template #title>
                  <i class="el-icon-menu"></i>
                  {{ subItem.authName }}
                </template>
              </ElMenuItem>
            </ElMenuItemGroup>
          </ElSubmenu>
        </ElMenu>
      </ElAside>
      <ElMain class="home-body">主体</ElMain>
    </ElContainer>

    <ElFooter>页脚</ElFooter>
  </ElContainer>
</template>

<script lang="ts" setup>
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElButton,
  ElFooter,
  ElMessage,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
} from 'element-plus';
import { useRouter } from 'vue-router';
import request from '@/hook/network/request';
import { reactive, toRefs } from 'vue';

type State = {
  menus: {
    id: number;
    authName: string;
    path: string;
    children: {
      id: number;
      authName: string;
      path: string;
      order: string;
    }[];
    order: string;
  }[];
  icons: Record<string, string>;
  isCollapse: boolean;
};

const router = useRouter();
const state = reactive<State>({
  // 菜单列表
  menus: [],
  // id 对应图标
  icons: {
    '125': '#xfy-yonghu',
    '103': '#xfy-quanxian',
    '101': '#xfy-shangpin',
    '102': '#xfy-dingdan',
    '145': '#xfy-shuju',
  },
  isCollapse: false,
});
const { menus, icons, isCollapse } = toRefs(state);

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
const getMenuList = async () => {
  const { data: res } = await request({
    method: 'GET',
    url: 'menus',
  });
  menus.value = res;
};
getMenuList();

const foldMenu = () => {
  isCollapse.value = !isCollapse.value;
};
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
  .head-left {
    display: flex;
    align-items: center;
    font-size: 18px;
    .head-icon {
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .head-right {
    display: flex;
  }
}
.el-aside {
  background-color: #fff;
  .icon {
    width: 25px;
    margin-right: 4px;
  }
}
.el-container {
  height: 100%;
}
</style>
