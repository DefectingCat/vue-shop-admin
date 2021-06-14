<template>
  <!-- 搜索 -->
  <el-row :gutter="20">
    <el-col :span="6">
      <el-input
        :placeholder="placeholder"
        prefix-icon="el-icon-search"
        v-model="queryInfo.query"
        clearable
        @keyup.enter="emit('toSearch')"
        @clear="emit('toSearch')"
      >
        <template #append>
          <el-button
            icon="el-icon-search"
            @click="emit('toSearch')"
          ></el-button>
        </template>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" plain @click="emit('toAdd')">
        {{ btnMsg }}
      </el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from '@vue/runtime-core';
import type { State } from '@/views/Home/User/UserLogic';
import { useVModels } from '@vueuse/core';

const props =
  defineProps<{
    queryInfo: State['queryInfo'];
    placeholder: string;
    btnMsg: string;
  }>();

const emit = defineEmit(['update:queryInfo', 'toSearch', 'toAdd']);

const { queryInfo } = useVModels(props, emit);
</script>

<style scoped lang="scss"></style>
