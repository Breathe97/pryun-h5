import axios from 'axios'
import { showNotify } from 'vant'
import { StoreUser } from '@/store/user'

const { VITE_BASE_PATH } = import.meta.env

const http = axios.create({
  baseURL: `/api-${VITE_BASE_PATH}`,
  showErrMsg: true //是否显示消息
})

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:config`, config)
    const storeUser = StoreUser()
    const headers: any = { Authorization: storeUser.token }
    // 在发送请求之前做些什么
    config.headers = { ...headers, ...config.headers }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:response`, response)
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const { config, status = 200, data } = response

    // 判断业务代码是否正常
    const { code = 0, message = '服务器繁忙' } = data || {}
    if (config.showErrMsg && code !== 200) {
      showNotify({ message, type: 'warning' })
    }

    // 只要服务器状态栏正常就返回
    if (status === 200) return data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:请求错误`, error)
    const { message = '网络繁忙' } = error
    showNotify({ message, type: 'warning' })
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default http
