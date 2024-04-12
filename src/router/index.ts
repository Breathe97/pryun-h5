import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { nextTick } from 'vue'

// 静态路由
// 静态路由不会校验权限如果没有找到路由会跳转到404、403
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/load-index',
    meta: {
      keepAlive: false
    }
  },
  {
    name: 'load-index',
    path: '/load-index',
    meta: {
      title: '欢迎',
      keepAlive: false
    },
    component: () => import('@/views/load/load-index.vue')
  },
  {
    name: 'home-index',
    path: '/home-index',
    meta: {
      zIndex: 9,
      title: '首页',
      keepAlive: true
    },
    component: () => import('@/views/home/home-index.vue')
  },
  {
    name: 'forms-index',
    path: '/forms-index',
    meta: {
      title: '表单',
      keepAlive: true
    },
    component: () => import('@/views/forms/forms-index.vue')
  },
  {
    name: 'login-index',
    path: '/login-index',
    meta: {
      title: '登录',
      keepAlive: true,
      zIndex: 999,
      transition: 'slide-left'
    },
    component: () => import('@/views/login/login-index.vue')
  },
  {
    path: '/:path(.*)',
    meta: {
      title: '页面找不到',
      keepAlive: false,
      zIndex: 99999
    },
    component: () => import('@/views/error/error-404.vue')
  }
]

const { VITE_BASE_PATH } = import.meta.env

const router = createRouter({
  history: false ? createWebHistory(`/${VITE_BASE_PATH}`) : createWebHashHistory(`/${VITE_BASE_PATH}`), // 路由模式
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {})

export default router
