<template>
  <!-- Table -->
  <ElTable :data="rolesList">
    <ElTableColumn type="expand">
      <template #default="scope">
        <ElRow
          v-for="(item, i1) of scope.row.children"
          :key="item.id"
          :class="[
            'roles-tag',
            'roles-tag--bot',
            i1 === 0 ? 'roles-tag--top' : '',
          ]"
        >
          <ElCol :span="5">
            <!-- 一级权限 -->
            <ElTag>
              {{ item.authName }}
            </ElTag>
          </ElCol>
          <ElCol :span="19">
            <ElRow
              v-for="(item2, i2) of item.children"
              :key="item2.id"
              :class="[
                'roles-tag',
                i2 === item.children.length - 1 ? '' : 'roles-tag--bot',
              ]"
            >
              <ElCol :span="6">
                <!-- 二级权限 -->
                <ElTag type="success">
                  {{ item2.authName }}
                </ElTag>
              </ElCol>

              <ElCol :span="18">
                <!-- 三级权限 -->
                <ElTag
                  type="warning"
                  v-for="item3 of item2.children"
                  :key="item3.id"
                  closable
                >
                  {{ item3.authName }}
                </ElTag>
              </ElCol>
            </ElRow>
          </ElCol>
        </ElRow>
      </template>
    </ElTableColumn>
    <ElTableColumn type="index"></ElTableColumn>
    <ElTableColumn label="角色名称" prop="roleName" width="350"></ElTableColumn>
    <ElTableColumn label="角色描述" prop="roleDesc" width="600"></ElTableColumn>
    <ElTableColumn label="操作"> </ElTableColumn>
  </ElTable>
</template>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core';
import { ElTable, ElTableColumn, ElTag, ElRow, ElCol } from 'element-plus';
import type { State } from '@/views/Home/Roles/rolesLogic';

defineProps<{
  rolesList: State['rolesList'];
}>();
</script>

<style scoped lang="scss">
.roles-tag {
  display: flex;
  align-items: center;
}
.roles-tag--top {
  border-top: 1px solid #eee;
}
.roles-tag--bot {
  border-bottom: 1px solid #eee;
}
.el-tag {
  margin: 7px;
}
</style>
