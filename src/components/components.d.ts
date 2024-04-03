import Footer from '@/components/Footer/Footer.vue'
import PageView from '@/components/PageView/PageView.vue'
import ContentTable from '@/components/ContentTable/ContentTable.vue'

declare module 'vue' {
  export interface GlobalComponents {
    Footer: typeof Footer
    PageView: typeof PageView
    ContentTable: typeof ContentTable
  }
}
