<template>
  <el-menu
    :collapse="isCollapse"
    unique-opened
    router
    :default-active="$route.path"
  >
    <el-submenu
      v-for="item of menus"
      :key="item.id"
      :index="item.id.toString()"
    >
      <template #title>
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="icons[item.id]"></use>
        </svg>
        <span>{{ item.authName }}</span>
      </template>

      <el-menu-item-group>
        <el-menu-item
          v-for="subItem of item.children"
          :key="subItem.id"
          :index="`/${subItem.path}`"
        >
          <template #title>
            <i class="el-icon-menu"></i>
            {{ subItem.authName }}
          </template>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from '@vue/runtime-core';
import type { State } from '@/layouts/HomeLogic';

const props =
  defineProps<{
    state: State;
  }>();

const { menus, icons, isCollapse } = toRefs(props.state);
</script>

<style scoped lang="scss">
.el-menu {
  border-right: 0;
}
.icon {
  width: 25px;
  margin-right: 4px;
}
</style>
