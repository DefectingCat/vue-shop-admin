<template>
  <div class="login-wrapper">
    <!-- 24列响应式布局 -->
    <el-row class="login-row">
      <el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="5">
        <div class="login-body">
          <!-- 头像 -->
          <div class="login-body__avatar">
            <img src="@/assets/img/login/avatar.png" alt="" />
          </div>
          <!-- 登录表单 -->
          <LoginForm />
        </div>
      </el-col>
    </el-row>
  </div>
  <Particles
    id="tsparticles"
    :options="{
      background: {
        color: {
          value: '#232741',
        },
      },
      fullScreen: {
        enable: true,
        zIndex: 1,
      },
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'repulse',
          },
          onHover: {
            enable: true,
            mode: 'bubble',
          },
        },
        modes: {
          bubble: {
            distance: 250,
            duration: 2,
            opacity: 0,
            size: 0,
          },
          grab: {
            distance: 400,
          },
          repulse: {
            distance: 400,
          },
        },
      },
      particles: {
        color: {
          value: '#ffffff',
        },
        links: {
          color: {
            value: '#ffffff',
          },
          distance: 150,
          opacity: 0.4,
        },
        move: {
          attract: {
            rotate: {
              x: 600,
              y: 600,
            },
          },
          enable: true,
          outModes: {
            bottom: 'out',
            left: 'out',
            right: 'out',
            top: 'out',
          },
          random: true,
          speed: 1,
        },
        number: {
          density: {
            enable: true,
          },
          value: 160,
        },
        opacity: {
          random: {
            enable: true,
          },
          value: {
            min: 0,
            max: 1,
          },
          animation: {
            enable: true,
            speed: 1,
          },
        },
        size: {
          random: {
            enable: true,
          },
          value: {
            min: 1,
            max: 3,
          },
          animation: {
            speed: 4,
            minimumValue: 0.3,
          },
        },
      },
    }"
  />
</template>

<script lang="ts" setup>
import LoginForm from '@/components/Login/LoginForm.vue';
</script>

<style scoped lang="scss">
.login-wrapper {
  // background-color: #2b4b6b;
  height: 100%;
}
.login-row {
  justify-content: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
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
