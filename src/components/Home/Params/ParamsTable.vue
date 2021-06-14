<template>
  <el-table
    :data="attributes"
    stripe
    row-key="attr_id"
    class="param-table-loading"
  >
    <el-table-column type="expand">
      <template #default="{ row }">
        <el-tag
          v-for="(item, index) of row.attrTags"
          :key="item"
          closable
          @close="emit('closeTag', index, row)"
        >
          {{ item }}
        </el-tag>
        <el-input
          v-if="row.showInput"
          v-model="inputValue"
          ref="saveTagInput"
          class="input-new-tag"
          size="small"
          @keyup.enter="handleInputConfirm(row)"
          @blur="handleInputConfirm(row)"
        ></el-input>
        <el-button v-else @click="btnInput(row)" class="button-new-tag"
          >添加属性</el-button
        >
      </template>
    </el-table-column>
    <el-table-column type="index" label="序号"></el-table-column>
    <el-table-column label="参数名称" prop="attr_name"></el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button
          size="mini"
          icon="el-icon-edit"
          @click="emit('editParam', row)"
        ></el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="emit('deleteParam', row)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
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
  'closeTag',
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
    // 将字符串合并为数组
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
