import Footer from '@/components/Footer/Footer.vue'
import PrPageView from '@/components/PrPageView/PrPageView.vue'
import ContentTable from '@/components/ContentTable/ContentTable.vue'

declare module 'vue' {
  export interface GlobalComponents {
    Footer: typeof Footer
    PrPageView: typeof PrPageView
    ContentTable: typeof ContentTable
  }
}
