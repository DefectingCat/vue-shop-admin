<template>
  <el-dialog title="修改地址" v-model="visible" width="30%" destroy-on-close>
    <el-form label-width="80px">
      <el-form-item prop="addr1" label="省市区/县">
        <el-cascader :options="citydata" placeholder="请选择" />
      </el-form-item>
      <el-form-item prop="addr1" label="详细地址">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
// 登录加载按钮
import LoadingBtn from '@/components/common/LoadingBtn.vue';
import { defineEmit, defineProps } from 'vue';
import { useVModels } from '@vueuse/core';
// city data
import citydata from '@/views/Orders/citydata';

const props =
  defineProps<{
    visible: boolean;
  }>();

const emit = defineEmit(['update:form', 'update:visible', 'btnClick']);

const { visible } = useVModels(props, emit);
</script>

<style scoped lang="scss">
:deep(.el-cascader) {
  display: block;
}
</style>
