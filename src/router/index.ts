import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { ElMessage } from 'element-plus';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
    },
    component: () =>
      import(/* webpackChunkName: "Home" */ '@/views/Home/Home.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 全局导航守卫，检查是否已经登录
router.beforeEach((to) => {
  // 去往 login 页面不检查
  if (to.path === '/login') return true;

  // 检查是否有 token
  const token = sessionStorage.getItem('token');
  if (token) return true;

  // 否则回到 login 页面
  ElMessage({
    showClose: true,
    message: '请先登录！',
    type: 'warning',
  });
  return '/login';
});

router.afterEach((to) => {
  const title = to.meta?.title as string;
  title ? (document.title = title) : void 0;
});

export default router;
