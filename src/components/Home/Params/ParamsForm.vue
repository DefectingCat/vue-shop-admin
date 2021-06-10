<template>
  <ElDialog :title="title" v-model="visible" width="30%" destroy-on-close>
    <ElForm
      :model="paramForm"
      ref="formRef"
      :rules="paramRule"
      label-width="80px"
    >
      <ElFormItem label="参数名称" prop="paramName">
        <ElInput v-model="paramForm.paramName"></ElInput>
      </ElFormItem>
    </ElForm>

    <!-- footer -->
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="visible = false">取消</ElButton>
        <LoadingBtn
          msg="确定"
          :loading="loading"
          @btn-click="emit('btnClick')"
        />
      </span>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { ElForm, ElFormItem, ElDialog, ElInput, ElButton } from 'element-plus';
// 登录加载按钮
import LoadingBtn from '@/components/common/LoadingBtn.vue';
import type { State } from '@/views/Home/Params/ParamsLogic';
import { defineEmit, defineProps, ref, useContext } from 'vue';
import { useVModels } from '@vueuse/core';

const props =
  defineProps<{
    title: string;
    paramForm: State['paramForm'];
    paramRule: State['paramRule'];
    loading: boolean;
    visible: boolean;
  }>();

const emit = defineEmit(['update:rolesForm', 'update:visible', 'btnClick']);

const { paramForm, visible } = useVModels(props, emit);

// 表单 ref
const formRef = ref();

// expose component ref
useContext().expose({
  formRef,
});
</script>
