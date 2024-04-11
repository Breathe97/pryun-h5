import Footer from '@/components/Footer/Footer.vue'
import PrPageView from '@/components/PrPageView/PrPageView.vue'
import PrSelectVanField from '@/components/PrSelectVanField/PrSelectVanField.vue'
import PrCalendarVanField from '@/components/PrCalendarVanField/PrCalendarVanField.vue'
import PrUploaderVanField from '@/components/PrUploaderVanField/PrUploaderVanField.vue'
import prSignatureVanField from '@/components/prSignatureVanField/prSignatureVanField.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
export default {
  install: (app: any) => {
    app.use(Vant)
    app.component('Footer', Footer)
    app.component('PrPageView', PrPageView)
    app.component('PrSelectVanField', PrSelectVanField)
    app.component('PrCalendarVanField', PrCalendarVanField)
    app.component('PrUploaderVanField', PrUploaderVanField)
    app.component('prSignatureVanField', prSignatureVanField)
  },
}
