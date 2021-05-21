<template>
  <div class="login-wrapper">
    <!-- 24列响应式布局 -->
    <ElRow class="login-row">
      <ElCol :xs="24" :sm="10" :md="10" :lg="8" :xl="5">
        <div class="login-body">
          <!-- 头像 -->
          <div class="login-body__avatar">
            <img src="@/assets/img/login/avatar.png" alt="" />
          </div>
          <!-- 登录表单 -->
          <LoginForm />
        </div>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import { ElRow, ElCol } from 'element-plus';
import LoginForm from '@/components/Login/LoginForm.vue';
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
