<template>
  <ElDialog
    title="分配权限"
    v-model="dialogVisible"
    width="40%"
    @close="emit('closeRightsTree')"
  >
    <ElTree
      show-checkbox
      default-expand-all
      highlight-current
      :props="treeProps"
      :data="rightsList"
      class="roles-tree-loading"
      node-key="id"
      :default-checked-keys="checkKeys"
      ref="treeRef"
    ></ElTree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="emit('assignRights')">
          确 定
        </el-button>
      </span>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps, ref } from '@vue/runtime-core';
import { ElDialog, ElButton, ElTree } from 'element-plus';
import type { State } from '@/views/Home/Roles/rolesLogic';
import { useContext } from 'vue';
import { useVModel } from '@vueuse/core';

const props =
  defineProps<{
    rightsTreeVisible: boolean;
    rightsList: State['rightsList'];
    treeProps: State['treeProps'];
    checkKeys: State['checkKeys'];
  }>();

// component ref
const treeRef = ref();

// expose component ref
useContext().expose({
  treeRef,
});

const emit = defineEmit([
  'update:rightsTreeVisible',
  'closeRightsTree',
  'assignRights',
]);

// two-way binding
const dialogVisible = useVModel(props, 'rightsTreeVisible', emit);
// like use computed
// const dialogVisible = computed<boolean>({
//   get() {
//     return props.rightsTreeVisible;
//   },
//   set(value) {
//     return emit('update:rightsTreeVisible', value);
//   },
// });
</script>

<style scoped lang="scss"></style>
