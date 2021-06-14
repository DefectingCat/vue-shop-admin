<template>
  <el-dialog title="添加分类" v-model="visible" width="35%" destroy-on-close>
    <!-- 主体区域 -->
    <el-form
      ref="formRef"
      :model="addCateForm"
      label-width="100px"
      :rules="addCateRules"
    >
      <el-form-item
        prop="cateName"
        label="分类名称"
        @keyup.enter="emit('btnClick')"
      >
        <el-input
          v-model="addCateForm.cat_name"
          placeholder="分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="cascaderValue"
        label="父级分类"
        v-if="cascaderOptions"
      >
        <el-cascader
          v-model="cascaderValue"
          :options="cascaderOptions"
          :props="cascaderProps"
          clearable
          @change="emit('cateChange')"
        ></el-cascader>
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
import { ref, defineProps, defineEmit, useContext } from 'vue';
// 登录加载按钮
import LoadingBtn from '@/components/common/LoadingBtn.vue';
import type { State } from '@/views/Home/Category/CategoryLogic';
import { useVModels } from '@vueuse/core';

const props =
  defineProps<{
    addCateForm: State['addCateForm'];
    addCateRules: State['addCateRules'];
    cascaderOptions?: State['cascaderOptions'];
    cascaderProps?: State['cascaderProps'];
    cascaderValue?: State['cascaderValue'];
    loading: boolean;
    visible: boolean;
  }>();

const emit = defineEmit([
  'update:addCateForm',
  'update:visible',
  'update:cascaderValue',
  'btnClick',
  'cateChange',
]);

const { addCateForm, cascaderValue, visible } = useVModels(props, emit);

// 表单 ref
const formRef = ref();

// expose component ref
useContext().expose({
  formRef,
});
</script>

<style scoped lang="scss">
.el-cascader {
  width: 100%;
}
</style>
