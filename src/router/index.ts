import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
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
    redirect: '/welcome',
    meta: {
      title: '首页',
    },
    component: () =>
      import(/* webpackChunkName: "Home" */ '@/layouts/Home.vue'),
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () =>
          import(
            /* webpackChunkName: "Welcome" */ '@/components/HomeWelcome.vue'
          ),
      },
      {
        path: '/users',
        name: 'Users',
        component: () =>
          import(/* webpackChunkName: "User" */ '@/views/User/User.vue'),
      },
      {
        path: '/rights',
        name: 'Rights',
        component: () =>
          import(/* webpackChunkName: "Rights" */ '@/views/Rights/Rights.vue'),
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () =>
          import(/* webpackChunkName: "Roles" */ '@/views/Roles/Roles.vue'),
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () =>
          import(/* webpackChunkName: "Goods" */ '@/views/Goods/Goods.vue'),
      },
      {
        path: '/goods/add',
        name: 'AddGood',
        component: () =>
          import(/* webpackChunkName: "AddGood" */ '@/views/Goods/AddGood.vue'),
      },
      {
        path: '/params',
        name: 'Params',
        component: () =>
          import(/* webpackChunkName: "Params" */ '@/views/Params/Params.vue'),
      },
      {
        path: '/categories',
        name: 'Category',
        component: () =>
          import(
            /* webpackChunkName: "Category" */ '@/views/Category/Category.vue'
          ),
      },
      {
        path: '/orders',
        name: 'Orders',
        component: () =>
          import(/* webpackChunkName: "Order" */ '@/views/Orders/Orders.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

// 全局导航守卫，检查是否已经登录
router.beforeEach((to) => {
  // 检查是否有 token
  const token = sessionStorage.getItem('token');
  // 去往 login 检查是否已经登录
  if (token && to.path === '/login') {
    ElMessage({
      showClose: true,
      message: '已经登录！',
      type: 'warning',
    });
    return '/home';
  }
  if (!token && to.path === '/login') return true;
  if (token) return true;

  // 否则回到 login 页面
  ElMessage({
    showClose: true,
    message: '请先登录！',
    type: 'warning',
  });
  return '/login';
});

// 修改标题
router.afterEach((to) => {
  const title = to.meta?.title as string;
  title ? (document.title = title) : void 0;
});

export default router;
