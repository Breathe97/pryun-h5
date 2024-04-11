import http from '../core/http'
import type { AxiosRequestConfig } from 'axios'

export const imageBaseUrl = 'https://hbzx-shop.oss-cn-chengdu.aliyuncs.com'
export const uploadBaseUrl = 'https://gateway.api.huabeistore.com'

// 文件上传
export const uploadPost = (options?: AxiosRequestConfig) => {
  const bucket = '' // 容器名称
  return http({
    method: 'POST',
    // url: `/api/biz/tool/upload/${bucket}`,
    url: `${uploadBaseUrl}/api/tool/oss/upload/uni`,
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options,
  })
}
