import Footer from '@/components/Footer/Footer.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
export default {
  install: (app: any) => {
    app.use(Vant)
    app.component('Footer', Footer)
  },
}
