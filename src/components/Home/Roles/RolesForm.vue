<template>
  <el-dialog :title="title" v-model="visible" width="30%" destroy-on-close>
    <el-form
      :model="rolesForm"
      :rules="rulesRules"
      ref="formRef"
      label-width="80px"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="rolesForm.roleName"
          placeholder="角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input
          v-model="rolesForm.roleDesc"
          placeholder="角色描述"
        ></el-input>
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
import type { State } from '@/views/Home/Roles/rolesLogic';
import { defineEmit, defineProps, ref, useContext } from 'vue';
import { useVModels } from '@vueuse/core';

const props =
  defineProps<{
    title: string;
    rolesForm: State['rolesForm'];
    rulesRules: State['rolesRules'];
    visible: boolean;
    loading: boolean;
  }>();

const emit = defineEmit(['update:rolesForm', 'update:visible', 'btnClick']);

const { rolesForm, visible } = useVModels(props, emit);

// 表单 ref
const formRef = ref();

// expose component ref
useContext().expose({
  formRef,
});
</script>

<!-- <script lang="ts">
import { ElForm, ElFormItem, ElDialog, ElInput, ElButton } from 'element-plus';
// 登录加载按钮
import LoadingBtn from '@/components/common/LoadingBtn.vue';
import type { State } from '@/views/Home/Roles/rolesLogic';
import { computed, defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  props: {
    title: {
      required: true,
      type: String as PropType<string>,
    },
    rolesForm: {
      required: true,
      type: Object as PropType<State['rolesForm']>,
    },
    rulesRules: {
      required: true,
      type: Object as PropType<State['rolesRules']>,
    },
    visible: {
      required: true,
      type: Boolean as PropType<boolean>,
    },
    loading: Boolean,
  },
  emits: ['update:rolesForm', 'update:visible', 'btnClick'],
  components: {
    ElForm,
    ElFormItem,
    ElDialog,
    ElInput,
    ElButton,
    LoadingBtn,
  },
  setup(props, { emit }) {
    // 组件双向绑定 form 数据
    const form = ref({
      roleName: computed({
        get() {
          return props.rolesForm.roleName;
        },
        set(val) {
          emit('update:rolesForm', { ...props.rolesForm, roleName: val });
        },
      }),
      roleDesc: computed({
        get() {
          return props.rolesForm.roleDesc;
        },
        set(val) {
          emit('update:rolesForm', { ...props.rolesForm, roleDesc: val });
        },
      }),
    });

    // 双向绑定 dialogVisible 数据
    const dialogVisiable = computed<boolean>({
      get() {
        return props.visible;
      },
      set(value) {
        emit('update:visible', value);
      },
    });

    // 表单 ref
    const formRef = ref();

    return {
      emit,
      form,
      dialogVisiable,
      formRef,
    };
  },
});
</script> -->

<style scoped lang="scss"></style>
