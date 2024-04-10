import http from '../core/http'
import type { AxiosRequestConfig } from 'axios'

// 获取字典数据
export const dictConfigGet = (options?: AxiosRequestConfig) => {
  return http({
    method: 'GET',
    url: '/api/biz/case/company/dict/config',
    ...options,
  })
}

// 查询订单详情
export const orderDetailGet = (options?: AxiosRequestConfig) => {
  const { orderId } = options?.params || ''
  return http({
    method: 'GET',
    showErrMsg: false,
    url: `/api/biz//order/detail/${orderId}`,
    ...options,
  })
}
// 查询进件详情
export const caseDetailGet = (options?: AxiosRequestConfig) => {
  const { caseInId } = options?.params || ''
  return http({
    method: 'GET',
    showErrMsg: false,
    url: `/api/biz/case/company/detail/${caseInId}`,
    ...options,
  })
}

// step1-债务人信息录入
export const step1Post = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    url: '/api/biz/case/company/step1',
    showErrMsg: false,
    ...options,
  })
}

// step2-债务人信息录入
export const step2Post = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    showErrMsg: false,
    url: '/api/biz/case/company/step2',
    ...options,
  })
}

// step3-债务人信息录入
export const step3Post = (options?: AxiosRequestConfig) => {
  return http({
    method: 'POST',
    showErrMsg: false,
    url: '/api/biz/case/company/step3',
    ...options,
  })
}
