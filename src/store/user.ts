import * as userApi from '@/api/modules/user'
import * as authApi from '@/api/modules/auth'
import { defineStore } from 'pinia'

// 系统相关的
export const StoreUser = defineStore('StoreUser', {
  // 持久化列表
  persist: [
    {
      paths: ['token'],
      storage: localStorage,
    },
  ],
  state: () => {
    return {
      token: '', // 用户凭证
      userInfo: {}, // 用户信息
    }
  },
  actions: {
    setToken(token: string) {
      this['token'] = token
    },
    // 获取用户信息
    async usersGetInfo() {
      const res = await userApi.usersGetInfo()
      // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res);
      const { code = 0, message, data } = res
      if (code === 200) {
        this['userInfo'] = data
      } else {
        throw res
      }
    },
    // 注销登录
    logout() {
      return authApi.logout()
    },
  },
})
