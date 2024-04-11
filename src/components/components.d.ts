import Footer from '@/components/Footer/Footer.vue'
import PrPageView from '@/components/PrPageView/PrPageView.vue'
import ContentTable from '@/components/ContentTable/ContentTable.vue'
import PrSelectVanField from '@/components/PrSelectVanField/PrSelectVanField.vue'
import PrUploaderVanField from '@/components/PrUploaderVanField/PrUploaderVanField.vue'
import prSignatureVanField from '@/components/prSignatureVanField/prSignatureVanField.vue'

declare module 'vue' {
  export interface GlobalComponents {
    Footer: typeof Footer
    PrPageView: typeof PrPageView
    ContentTable: typeof ContentTable
    PrSelectVanField: typeof PrSelectVanField
    PrUploaderVanField: typeof PrUploaderVanField
    prSignatureVanField: typeof prSignatureVanField
  }
}
