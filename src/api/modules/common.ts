import http from '../core/http'
import type { AxiosRequestConfig } from 'axios'

const { VITE_UPLOAD_BASE, VITE_FILE_PREVIEW_BASE } = import.meta.env // 以下请求为直连模式 当url为完整路径时axios 不会进行追加baseUrl

export const fileUploadUrl = VITE_UPLOAD_BASE // 文件上传地址
export const filePreviewUrl = VITE_FILE_PREVIEW_BASE // 文件预览地址

// 文件上传
export const uploadPost = (options?: AxiosRequestConfig) => {
  const bucket = '' // 容器名称
  return http({
    method: 'POST',
    // url: `/api/biz/tool/upload/${bucket}`,
    url: `${fileUploadUrl}/api/tool/oss/upload/uni`,
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options
  })
}
