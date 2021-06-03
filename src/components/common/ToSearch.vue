<template>
  <!-- 搜索 -->
  <ElRow :gutter="20">
    <ElCol :span="6">
      <ElInput
        :placeholder="placeholder"
        prefix-icon="el-icon-search"
        v-model="queryInfo.query"
        clearable
        @keyup.enter="emit('toSearch')"
        @clear="emit('toSearch')"
      >
        <template #append>
          <ElButton icon="el-icon-search" @click="emit('toSearch')"></ElButton>
        </template>
      </ElInput>
    </ElCol>
    <ElCol :span="4">
      <ElButton type="primary" plain @click="emit('toAdd')">
        {{ btnMsg }}
      </ElButton>
    </ElCol>
  </ElRow>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from '@vue/runtime-core';
import { ElInput, ElButton, ElRow, ElCol } from 'element-plus';
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
