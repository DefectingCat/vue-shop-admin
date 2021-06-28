<template>
  <el-dialog title="编辑商品" v-model="dialogVisible" width="30%">
    <el-form
      ref="form"
      :model="editForm"
      label-width="80px"
      :rules="editFormRules"
    >
      <el-form-item label="活动名称" prop="goods_name">
        <el-input v-model="editForm.goods_name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="emit('editGoods')">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useVModels } from '@vueuse/core';
import type { State } from '@/views/Goods/GoodsLogic';
import { defineEmit, defineProps } from 'vue-demi';
import { ref, useContext } from 'vue';
import type { formRef } from '@/types/formRules';

const props =
  defineProps<{
    dialogVisible: State['dialogVisible'];
    editForm: State['editForm'];
    editFormRules: State['editFormRules'];
  }>();

const emit = defineEmit([
  'update:dialogVisible',
  'update:editForm',
  'editGoods',
]);

const { dialogVisible, editForm } = useVModels(props, emit);

const form = ref<formRef>();

useContext().expose({
  form,
});
</script>

<style scoped lang="scss"></style>
