<template>
  <ElDialog
    :title="title"
    v-model="dialogVisiable"
    width="30%"
    destroy-on-close
  >
    <ElForm :model="form" :rules="rulesRules" ref="formRef" label-width="80px">
      <ElFormItem label="角色名称" prop="roleName">
        <ElInput v-model="form.roleName" placeholder="角色名称"></ElInput>
      </ElFormItem>
      <ElFormItem label="角色描述" prop="roleDesc">
        <ElInput v-model="form.roleDesc" placeholder="角色描述"></ElInput>
      </ElFormItem>
    </ElForm>

    <!-- footer -->
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="dialogVisiable = false">取消</ElButton>
        <LoadingBtn
          msg="确定"
          :loading="loading"
          @btn-click="emit('btnClick')"
        />
      </span>
    </template>
  </ElDialog>
</template>

<script lang="ts">
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
</script>

<style scoped lang="scss"></style>
