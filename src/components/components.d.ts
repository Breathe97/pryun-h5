import Footer from '@/components/Footer/Footer.vue'
import PrPageView from '@/components/PrPageView/PrPageView.vue'
import ContentTable from '@/components/ContentTable/ContentTable.vue'
import PrSignatureView from '@/components/PrSignatureView/PrSignatureView.vue'
import PrSelectVanField from '@/components/PrSelectVanField/PrSelectVanField.vue'

declare module 'vue' {
  export interface GlobalComponents {
    Footer: typeof Footer
    PrPageView: typeof PrPageView
    ContentTable: typeof ContentTable
    PrSignatureView: typeof PrSignatureView
    PrSelectVanField: typeof PrSelectVanField
  }
}
