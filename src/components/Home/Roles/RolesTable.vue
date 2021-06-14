<template>
  <!-- Table -->
  <el-table :data="rolesList" row-key="id">
    <el-table-column type="expand">
      <template #default="scope">
        <el-row
          v-for="(item, i1) of scope.row.children"
          :key="item.id"
          :class="[
            'roles-tag',
            'roles-tag--bot',
            i1 === 0 ? 'roles-tag--top' : '',
          ]"
        >
          <el-col :span="5">
            <!-- 一级权限 -->
            <el-tag closable @close="emit('handleClose', scope.row, item.id)">
              {{ item.authName }}
            </el-tag>
          </el-col>
          <el-col :span="19">
            <el-row
              v-for="(item2, i2) of item.children"
              :key="item2.id"
              :class="[
                'roles-tag',
                i2 === item.children.length - 1 ? '' : 'roles-tag--bot',
              ]"
            >
              <el-col :span="6">
                <!-- 二级权限 -->
                <el-tag
                  type="success"
                  closable
                  @close="emit('handleClose', scope.row, item2.id)"
                >
                  {{ item2.authName }}
                </el-tag>
              </el-col>

              <el-col :span="18">
                <!-- 三级权限 -->
                <el-tag
                  type="warning"
                  v-for="item3 of item2.children"
                  :key="item3.id"
                  closable
                  @close="emit('handleClose', scope.row, item3.id)"
                >
                  {{ item3.authName }}
                </el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column type="index"></el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName"
      width="350"
    ></el-table-column>
    <el-table-column
      label="角色描述"
      prop="roleDesc"
      width="600"
    ></el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <!-- <ElTooltip effect="light" content="编辑角色" placement="top"> -->
        <el-button
          size="mini"
          icon="el-icon-edit"
          @click="emit('editRole', scope.row)"
        ></el-button>
        <!-- </ElTooltip> -->

        <!-- <ElTooltip effect="light" content="删除角色" placement="top"> -->
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="emit('deleteRole', scope.row.id)"
        ></el-button>
        <!-- </ElTooltip> -->

        <!-- <ElTooltip effect="light" content="分配权限" placement="top"> -->
        <el-button
          size="mini"
          type="warning"
          icon="el-icon-setting"
          @click="emit('assignRights', scope.row)"
        ></el-button>
        <!-- </ElTooltip> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from '@vue/runtime-core';
import type { State } from '@/views/Home/Roles/rolesLogic';

defineProps<{
  rolesList: State['rolesList'];
}>();

const emit = defineEmit([
  'editRole',
  'deleteRole',
  'assignRights',
  'handleClose',
]);
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
