<template>
  <ElTable
    :data="attributes"
    stripe
    row-key="attr_id"
    class="param-table-loading"
  >
    <ElTableColumn type="expand">
      <template #default="scope">
        <ElTag v-for="item of scope.row.attrTags" :key="item" closable>
          {{ item }}
        </ElTag>
        <ElInput
          v-if="scope.row.showInput"
          v-model="inputValue"
          ref="saveTagInput"
          class="input-new-tag"
          size="small"
          @keyup.enter="handleInputConfirm(scope.row)"
          @blur="handleInputConfirm(scope.row)"
        ></ElInput>
        <ElButton v-else @click="btnInput(scope.row)" class="button-new-tag"
          >添加属性</ElButton
        >
      </template>
    </ElTableColumn>
    <ElTableColumn type="index" label="序号"></ElTableColumn>
    <ElTableColumn label="参数名称" prop="attr_name"></ElTableColumn>
    <ElTableColumn label="操作">
      <template #default="scope">
        <el-button
          size="mini"
          icon="el-icon-edit"
          @click="emit('editParam', scope.row)"
        ></el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="emit('deleteParam', scope.row.id)"
        ></el-button>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn, ElTag, ElInput, ElButton } from 'element-plus';
import { defineEmit, defineProps, nextTick, ref } from 'vue-demi';
import type { State, attr } from '@/views/Home/Params/ParamsLogic';
import { useVModels } from '@vueuse/core';

const props =
  defineProps<{
    attributes: State['attributes'];
  }>();

const emit = defineEmit([
  'update:attrTags',
  'addAttr',
  'editParam',
  'deleteParam',
]);

// 双向绑定
const { attributes } = useVModels(props, emit);

// 组件内部状态
// input ref
const saveTagInput = ref();
// 输入内容
const inputValue = ref('');
// 按钮点击
const btnInput = async (row: attr) => {
  row.showInput = true;
  await nextTick();
  saveTagInput.value.input.focus();
};
// 输入完成
const handleInputConfirm = (row: attr) => {
  row.showInput = false;
  // 更新双向绑定
  if (inputValue.value) {
    // 找到对应的 attr
    row.attrTags.push(inputValue.value);
    row.attr_vals = row.attrTags.join(' ');
    inputValue.value = '';
    // 散发发送请求
    emit('addAttr', row);
  }
};
</script>

<style scoped lang="scss">
.el-tag {
  margin-right: 15px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  min-height: 32px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
}
</style>
