/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE: string // 默认接口地址
  readonly VITE_BASE_PATH: string // 全局前置路径
  readonly VITE_UPLOAD_BASE: string // 文件上传地址
  readonly VITE_FILE_PREVIEW_BASE: string // 文件预览地址
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { defineComponent } from 'vue'
  const Component: defineComponent<{}, {}, any>
  export default Component
}
declare module '*.js'
declare module '*.mjs'
declare interface Window {}
declare module 'postcss-px-to-viewport'
