import 'vue-router'
// 扩展路由Meta信息
declare module 'vue-router' {
  interface RouteMeta {
    title?: string // 标题
    zIndex: 99 // 页面层级 规则等同于css中z-index
    keepAlive?: boolean // 缓存路由 默认true
    showFooter?: boolean // 显示页尾 默认true
  }
}
