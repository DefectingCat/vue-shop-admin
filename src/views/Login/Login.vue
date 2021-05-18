<template>
  <div class="login-wrapper">
    <!-- 24列响应式布局 -->
    <ElRow class="login-row">
      <ElCol :xs="0" :sm="7" :md="7" :lg="8" :xl="9"></ElCol>
      <ElCol :xs="24" :sm="10" :md="10" :lg="8" :xl="6">
        <!-- 登录选项卡 -->
        <div class="login-body">
          <!-- 头像 -->
          <div class="login-body__avatar">
            <img src="@/assets/img/login/avatar.png" alt="" />
          </div>
          <!-- 登录表单 -->
          <ElForm
            ref="loginForm"
            :model="form"
            :rules="rules"
            class="login-body__form"
          >
            <ElFormItem prop="username">
              <ElInput v-model="form.username" placeholder="用户名">
                <template #prefix>
                  <i class="el-input__icon el-icon-user"></i>
                </template>
              </ElInput>
            </ElFormItem>
            <ElFormItem prop="password">
              <ElInput v-model="form.password" placeholder="密码" show-password>
                <template #prefix>
                  <i class="el-input__icon el-icon-lock"></i>
                </template>
              </ElInput>
            </ElFormItem>
            <ElFormItem class="login-body__btn">
              <ElButton type="primary" plain @click="login">登录</ElButton>
              <ElButton type="info" plain @click="resetForm">重置</ElButton>
            </ElFormItem>
          </ElForm>
          <!-- 表单结束 -->
        </div>
        <!-- 登录选项卡结束 -->
      </ElCol>
      <ElCol :xs="0" :sm="7" :md="7" :lg="8" :xl="9"></ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRef, toRefs } from 'vue';
import {
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
} from 'element-plus';

const state = reactive({
  // 表单绑定数据
  form: {
    username: '',
    password: '',
  },
  // 表单验证规则
  rules: {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 1, max: 99, message: '长度在 1 到 99 个字符', trigger: 'blur' },
    ],
  },
});
// 表单对象
const loginForm = ref<typeof ElForm>();
// 解构 state
const { form, rules } = toRefs(state);

// 登录
const login = () => {
  loginForm.value?.validate((data: boolean) => {
    console.log(data);
  });
};
// 重置表单
const resetForm = () => {
  loginForm.value?.resetFields();
};
</script>

<style scoped lang="scss">
.login-wrapper {
  background-color: #2b4b6b;
  height: 100%;
}
.login-row {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-body {
  height: 350px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1px 1px 4px 0px rgb(155, 155, 155);
  &__avatar {
    display: flex;
    justify-content: center;
    img {
      width: 120px;
      height: 120px;
      transform: translateY(-50%);
      border-radius: 50%;
      background-color: #eee;
      border: 1px solid #eee;
      box-shadow: 1px 1px 4px 0px rgb(155, 155, 155);
    }
  }

  &__form {
    padding: 0 20px;
  }
  &__btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
