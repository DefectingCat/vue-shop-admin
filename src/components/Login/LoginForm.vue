<template>
  <ElForm ref="loginForm" :model="form" :rules="rules" class="login-body__form">
    <ElFormItem prop="username">
      <ElInput
        v-model="form.username"
        placeholder="用户名"
        @keyup.enter="login"
      >
        <template #prefix>
          <i class="el-input__icon el-icon-user"></i>
        </template>
      </ElInput>
    </ElFormItem>

    <ElFormItem prop="password">
      <ElInput
        v-model="form.password"
        placeholder="密码"
        show-password
        @keyup.enter="login"
      >
        <template #prefix>
          <i class="el-input__icon el-icon-lock"></i>
        </template>
      </ElInput>
    </ElFormItem>

    <ElFormItem class="login-body__btn">
      <LoadingBtn :loading="loading" msg="登录" @btnClick="login" />
      <ElButton type="info" plain @click="resetForm">重置</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
// logical
import loginLogic from '@/views/Login/LoginLogic';
// 登录加载按钮
import LoadingBtn from '@/components/common/LoadingBtn.vue';

// 登录逻辑
const { state, loginForm, login, resetForm } = loginLogic();

// 解构 state
const { form, rules, loading } = toRefs(state);
</script>

<style scoped lang="scss">
.login-body {
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
.hidden-word {
  visibility: hidden;
}
</style>
