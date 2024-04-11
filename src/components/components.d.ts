import Footer from '@/components/Footer/Footer.vue'
import PrPageView from '@/components/PrPageView/PrPageView.vue'
import ContentTable from '@/components/ContentTable/ContentTable.vue'
import PrSelectVanField from '@/components/PrSelectVanField/PrSelectVanField.vue'
import PrTablePreviewView from '@/components/PrTablePreviewView/PrTablePreviewView.vue'
import PrCalendarVanField from '@/components/PrCalendarVanField/PrCalendarVanField.vue'
import PrUploaderVanField from '@/components/PrUploaderVanField/PrUploaderVanField.vue'
import prSignatureVanField from '@/components/prSignatureVanField/prSignatureVanField.vue'

declare module 'vue' {
  export interface GlobalComponents {
    Footer: typeof Footer
    PrPageView: typeof PrPageView
    ContentTable: typeof ContentTable
    PrSelectVanField: typeof PrSelectVanField
    PrTablePreviewView: typeof PrTablePreviewView
    PrCalendarVanField: typeof PrCalendarVanField
    PrUploaderVanField: typeof PrUploaderVanField
    prSignatureVanField: typeof prSignatureVanField
  }
}
