<template>
  <el-dialog :title="title" v-model="visible" width="30%" destroy-on-close>
    <el-form
      :model="paramForm"
      ref="formRef"
      :rules="paramRule"
      label-width="80px"
    >
      <el-form-item label="参数名称" prop="paramName">
        <el-input v-model="paramForm.paramName"></el-input>
      </el-form-item>
    </el-form>

    <!-- footer -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <LoadingBtn
          msg="确定"
          :loading="loading"
          @btn-click="emit('btnClick')"
        />
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
// 登录加载按钮
import LoadingBtn from '@/components/common/LoadingBtn.vue';
import type { State } from '@/views/Params/ParamsLogic';
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
