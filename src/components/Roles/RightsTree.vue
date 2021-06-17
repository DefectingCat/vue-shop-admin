<template>
  <el-dialog
    title="分配权限"
    v-model="dialogVisible"
    width="40%"
    @close="emit('closeRightsTree')"
  >
    <el-tree
      show-checkbox
      default-expand-all
      highlight-current
      :props="treeProps"
      :data="rightsList"
      class="roles-tree-loading"
      node-key="id"
      :default-checked-keys="checkKeys"
      ref="treeRef"
    ></el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <LoadingBtn
          msg="确定"
          :loading="loading"
          @btn-click="emit('assignRights')"
        />
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps, ref } from '@vue/runtime-core';
import type { State } from '@/views/Roles/rolesLogic';
import { useContext } from 'vue';
import { useVModel } from '@vueuse/core';
// 登录加载按钮
import LoadingBtn from '@/components/common/LoadingBtn.vue';

const props =
  defineProps<{
    rightsTreeVisible: boolean;
    rightsList: State['rightsList'];
    treeProps: State['treeProps'];
    checkKeys: State['checkKeys'];
    loading: State['loading'];
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
