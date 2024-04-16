import http from '../core/http'
import type { AxiosRequestConfig } from 'axios'

const { VITE_BASE } = import.meta.env // 以下请求为直连模式 当url为完整路径时axios 不会进行追加baseUrl

// 获取字典数据
export const dictConfigGet = (options?: AxiosRequestConfig) => {
  return http({
    method: 'GET',
    url: `${VITE_BASE}/api/biz/case/company/v2/dict/config`,
    ...options
  })
}

// 查询订单详情
export const orderDetailGet = (options?: AxiosRequestConfig) => {
  const { orderId } = options?.params || ''
  return http({
    method: 'GET',
    showErrMsg: false,
    url: `${VITE_BASE}/api/biz//order/detail/${orderId}`,
    ...options
  })
}

// 查询进件详情
export const caseDetailGet = (options?: AxiosRequestConfig) => {
  const { caseInId } = options?.params || ''
  return http({
    method: 'GET',
    showErrMsg: false,
    url: `${VITE_BASE}/api/biz/case/company/detail/${caseInId}`,
    ...options
  })
}

// step1-债务人信息录入
export const step1Post = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    url: `${VITE_BASE}/api/biz/case/company/v2/step1`,
    showErrMsg: false,
    ...options
  })
}

// step2-债务人信息录入
export const step2Post = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    showErrMsg: false,
    url: `${VITE_BASE}/api/biz/case/company/v2/step2`,
    ...options
  })
}

// step3-债务人信息录入
export const step3Post = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    showErrMsg: false,
    url: `${VITE_BASE}/api/biz/case/company/v2/step3`,
    ...options
  })
}

// 提交进件
export const submitPost = (options?: AxiosRequestConfig) => {
  const { caseInId } = options?.params || ''
  return http({
    method: 'POST',
    showErrMsg: false,
    url: `${VITE_BASE}/api/biz/case/company/v2/submit/${caseInId}`,
    ...options
  })
}
