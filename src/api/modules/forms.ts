import http from '../core/http'
import type { AxiosRequestConfig } from 'axios'

// 获取字典数据
export const getGoodsSale = (options?: AxiosRequestConfig) => {
  return http({
    method: 'GET',
    url: '/case/company/dict/config',
    ...options,
  })
}
// 查询商品统计
export const getGoodsStat = (options?: AxiosRequestConfig) => {
  return http({
    method: 'GET',
    url: '/api/supply/index/workbench',
    ...options,
  })
}
// 查询商品统计图
export const getGoodsStatChart = (options?: AxiosRequestConfig) => {
  return http({
    method: 'GET',
    url: '/api/supply/index/order/trend?type=0',
    ...options,
  })
}
