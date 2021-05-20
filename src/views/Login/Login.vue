<template>
  <div class="login-wrapper">
    <!-- 24列响应式布局 -->
    <ElRow class="login-row">
      <ElCol :xs="24" :sm="10" :md="10" :lg="8" :xl="5">
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
              <ElButton type="primary" plain @click="login">
                <span :class="{ 'hidden-word': loading }">登录</span>
                <!-- loading icon -->
                <img
                  v-show="loading"
                  class="login-body__loading"
                  src="@/assets/img/loading.svg"
                />
              </ElButton>
              <ElButton type="info" plain @click="resetForm">重置</ElButton>
            </ElFormItem>
          </ElForm>
          <!-- 表单结束 -->
        </div>
        <!-- 登录选项卡结束 -->
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import {
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
} from 'element-plus';
import { useRoute } from 'vue-router';
import loginLogic from './LoginLogic';

const router = useRoute();

// 登录逻辑
const { state, loginForm, login, resetForm } = loginLogic();

// 解构 state
const { form, rules, loading } = toRefs(state);
</script>

<style scoped lang="scss">
.login-wrapper {
  background-color: #2b4b6b;
  height: 100%;
}
.login-row {
  justify-content: center;
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
    position: relative;
    display: flex;
    justify-content: flex-end;
  }
  &__loading {
    position: absolute;
    left: 10%;
    top: 0;
    transition: all 0.3s;
  }
}
.hidden-word {
  visibility: hidden;
}
</style>
