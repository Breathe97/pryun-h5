import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from './router'

import componentInit from '@/components/component-init'
import './styles/iconfont.js'
import './style.css'

const app = createApp(App) // 创建实例

const pinia = createPinia() // 创建store
pinia.use(piniaPluginPersistedstate) // 持久化store

app.use(pinia) // 挂载store
app.use(router) // 挂载路由
app.use(componentInit) // 注册全局组件

app.mount('#app')
