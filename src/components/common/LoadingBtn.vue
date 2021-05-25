<template>
  <ElButton type="primary" plain @click="clickBtn">
    <span :class="{ 'hidden-word': loading }">{{ msg }}</span>
    <!-- loading icon -->
    <img v-show="loading" class="loading-img" src="@/assets/img/loading.svg" />
  </ElButton>
</template>

<script lang="ts" setup>
/**
 * 这是一个带加载动画的按钮组件
 * 基于 element-plus Button 按钮再次的封装
 * @props {boolean} loading 是否正在加载
 * @props {string} msg 按钮上显示的文本
 * @emit btnClick 点击按钮时的事件回调
 */
import { toRefs } from '@vue/reactivity';
import { defineEmit, defineProps } from '@vue/runtime-core';
import { ElButton } from 'element-plus';

const props =
  defineProps<{
    loading: boolean;
    msg: string;
  }>();
const emit = defineEmit(['btnClick']);

// 点击方法
const clickBtn = () => {
  emit('btnClick');
};

// 解构 props
const { loading, msg } = toRefs(props);
</script>

<style scoped lang="scss">
.el-button {
  position: relative;
}
.hidden-word {
  visibility: hidden;
}
.loading-img {
  position: absolute;
  left: 50%;
  top: 0;
  transition: all 0.3s;
  transform: translateX(-50%);
}
</style>
