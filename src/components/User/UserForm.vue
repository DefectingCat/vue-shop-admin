<template>
  <el-dialog :title="title" v-model="visible" width="30%" destroy-on-close>
    <!-- 主体区域 -->
    <el-form ref="formRef" :model="form" label-width="66px" :rules="rules">
      <el-form-item
        prop="username"
        label="用户名"
        @keyup.enter="emit('btnClick')"
      >
        <el-input
          v-model="form.username"
          placeholder="用户名"
          :disabled="editForm"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        label="密码"
        v-if="!editForm"
        @keyup.enter="emit('btnClick')"
      >
        <el-input
          v-model="form.password"
          show-password
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" @keyup.enter="emit('btnClick')">
        <el-input v-model="form.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机" @keyup.enter="emit('btnClick')">
        <el-input v-model="form.mobile" placeholder="手机"></el-input>
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
import type { State } from '@/views/User/UserLogic';
import { useVModels } from '@vueuse/core';

const props =
  defineProps<{
    title: string;
    form: State['addUserForm'];
    rules: State['addUserRules'];
    loading: boolean;
    visible: boolean;
    editForm?: boolean;
  }>();

const emit = defineEmit(['update:form', 'update:visible', 'btnClick']);

const { form, visible } = useVModels(props, emit);

// 表单 ref
const formRef = ref();

// expose component ref
useContext().expose({
  formRef,
});
</script>

<!-- <script lang="ts">
import { computed, ref, defineComponent, PropType } from 'vue';
import { ElInput, ElButton, ElDialog, ElForm, ElFormItem } from 'element-plus';
// 登录加载按钮
import LoadingBtn from '@/components/common/LoadingBtn.vue';
import type { State } from '@/views/User/UserLogic';

export default defineComponent({
  props: {
    title: {
      required: true,
      type: String as PropType<string>,
    },
    form: {
      required: true,
      type: Object as PropType<State['addUserForm']>,
    },
    rules: {
      required: true,
      type: Object as PropType<State['addUserRules']>,
    },
    loading: {
      required: true,
      type: Boolean as PropType<boolean>,
    },
    visible: {
      required: true,
      type: Boolean as PropType<boolean>,
    },
    editForm: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['update:form', 'update:visible', 'btnClick'],
  components: {
    ElInput,
    ElButton,
    ElDialog,
    ElForm,
    ElFormItem,
    LoadingBtn,
  },
  setup(props, { emit }) {
    // 组件双向绑定 form 数据
    const userForm = ref({
      username: computed({
        get() {
          return props.form?.username;
        },
        set(value) {
          emit('update:form', { ...props.form, username: value });
        },
      }),
      password: computed({
        get() {
          return props.form?.password;
        },
        set(value) {
          emit('update:form', { ...props.form, password: value });
        },
      }),
      email: computed({
        get() {
          return props.form?.email;
        },
        set(value) {
          emit('update:form', { ...props.form, email: value });
        },
      }),
      mobile: computed({
        get() {
          return props.form?.mobile;
        },
        set(value) {
          emit('update:form', { ...props.form, mobile: value });
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
      userForm,
      dialogVisiable,
      formRef,
    };
  },
});
</script> -->

<style scoped lang="scss"></style>
