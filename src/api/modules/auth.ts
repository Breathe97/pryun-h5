import http from '../core/http'
import type { AxiosRequestConfig } from 'axios'

const { VITE_BASE } = import.meta.env // 以下请求为直连模式 当url为完整路径时axios 不会进行追加baseUrl

// 发送短信验证码
export const sendSmsCode = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    url: '/users-sendSmsCode',
    ...options
  })
}

// 登录
export const login = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    url: `${VITE_BASE}/api/biz/user/v1/login_password`,
    ...options
  })
}

// 登出
export const logout = (options?: AxiosRequestConfig) => {
  return http({
    method: 'GET',
    url: '/api/auth/login/loginOut',
    ...options
  })
}
