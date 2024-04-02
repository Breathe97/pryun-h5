import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 静态路由
// 静态路由不会校验权限如果没有找到路由会跳转到404、403
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/load',
    meta: {
      keepAlive: false,
      animationTypes: { in: 'none', out: 'none' },
    },
  },
  {
    name: 'load',
    path: '/load',
    meta: {
      title: '欢迎',
      keepAlive: false,
      animationTypes: { in: 'none', out: 'none' },
    },
    component: () => import('@/views/load/load-index.vue'),
  },
  {
    name: 'home',
    path: '/home',
    meta: {
      title: '首页',
      keepAlive: true,
      animationTypes: { in: 'fade-in', out: 'none' },
    },
    component: () => import('@/views/home/home-index.vue'),
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录',
      keepAlive: false,
      zIndex: 1000,
      animationTypes: { in: 'pop-from-left', out: 'pop-from-right' },
    },
    component: () => import('@/views/login/login-index.vue'),
  },
  {
    path: '/:path(.*)',
    meta: {
      title: '页面找不到',
      keepAlive: false,
    },
    component: () => import('@/views/error/error-404.vue'),
  },
]

const VITE_BASE_PATH = import.meta.env.VITE_BASE_PATH

const router = createRouter({
  history: true ? createWebHistory(`/${VITE_BASE_PATH}`) : createWebHashHistory(`/${VITE_BASE_PATH}`), // 路由模式
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {})

export default router
