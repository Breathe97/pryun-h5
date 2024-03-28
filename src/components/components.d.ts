import Footer from '@/components/Footer/Footer.vue'
import ContentTable from '@/components/ContentTable/ContentTable.vue'

declare module 'vue' {
  export interface GlobalComponents {
    Footer: typeof Footer
    ContentTable: typeof ContentTable
  }
}
