import 'vue-router'

type Type_animationName = 'none' | 'pop-from-right' | 'pop-from-left' | 'fade-in' | 'fade-out' // 页面过渡的动画
// 扩展路由Meta信息
declare module 'vue-router' {
  interface RouteMeta {
    title?: string // 标题
    zIndex?: number // 页面层级 规则等同于css中z-index
    animationTypes?: {
      in: Type_animationName
      out: Type_animationName
    }
    keepAlive?: boolean // 缓存路由 默认true
    showFooter?: boolean // 显示页尾 默认true
  }
}
