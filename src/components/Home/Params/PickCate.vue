<template>
  <div class="picker">
    <span>请选择商品分类：</span>
    <el-cascader
      v-model="cascaderValue"
      :options="cascaderOptions"
      :props="cascaderProps"
      @change="emit('pickChange')"
    ></el-cascader>
  </div>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from 'vue-demi';
import type { State } from '@/views/Home/Params/ParamsLogic';
import { useVModels } from '@vueuse/core';

const props =
  defineProps<{
    cascaderValue: State['cascaderValue'];
    cascaderOptions: State['cascaderOptions'];
    cascaderProps: State['cascaderProps'];
  }>();

const emit = defineEmit(['update:cascaderValue', 'pickChange']);

const { cascaderValue } = useVModels(props, emit);
</script>

<style scoped lang="scss">
.picker {
  margin-top: 10px;
}
.el-cascader .el-input {
  width: 250px;
}
</style>
