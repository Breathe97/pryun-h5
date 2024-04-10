<template>
  <cardVue :collapse="false" title="企业简介">
    <van-form ref="vanFormRef">
      <van-cell-group inset>
        <van-field label-width="100" :required="true" v-model="inf.companyAttr" is-link readonly name="企业属性" label="企业属性" placeholder="请选择" @click="select('picker', 'companyAttr')" :rules="[{ required: true, message: '请选择企业属性' }]" />
        <van-field label-width="100" :required="true" v-model="inf.isProceed" is-link readonly name="企业涉诉情况" label="企业涉诉情况" placeholder="请选择" @click="select('picker', 'isProceed')" :rules="[{ required: true, message: '请选择企业涉诉情况' }]" />
        <van-field label-width="100" :required="true" v-model="inf.businessStatus" is-link readonly name="经营状况" label="经营状况" placeholder="请选择" @click="select('picker', 'businessStatus')" :rules="[{ required: true, message: '请选择经营状况' }]" />
        <van-field label-width="100" :required="true" v-model="inf.registerMoney" name="注册资本" label="注册资本" placeholder="请输入注册资本" :rules="[{ required: true, message: '请填写注册资本' }]">
          <template #right-icon>万元</template>
        </van-field>
        <van-field label-width="100" :required="true" v-model="inf.payType" is-link readonly name="缴纳方式" label="缴纳方式" placeholder="请选择" @click="select('picker', 'payType')" :rules="[{ required: true, message: '请选择缴纳方式' }]" />
        <van-field label-width="100" :required="true" v-model="inf.industrialNature" is-link readonly name="产业性质" label="产业性质" placeholder="请选择" @click="select('picker', 'industrialNature')" :rules="[{ required: true, message: '请选择产业性质' }]" />
        <van-field label-width="100" :required="true" v-model="inf.totalAssets" name="企业总资产" label="企业总资产" placeholder="请输入企业总资产" :rules="[{ required: true, message: '请填写企业总资产' }]">
          <template #right-icon>万元</template>
        </van-field>
        <van-field label-width="100" :required="true" v-model="inf.totalDebt" name="企业总负债" label="企业总负债" placeholder="请输入企业总负债" :rules="[{ required: true, message: '请填写企业总负债' }]">
          <template #right-icon>万元</template>
        </van-field>
        <van-field label-width="100" :required="true" v-model="inf.totalProceed" name="涉诉总金额" label="涉诉总金额" placeholder="请输入涉诉总金额" :rules="[{ required: true, message: '请填写涉诉总金额' }]">
          <template #right-icon>万元</template>
        </van-field>
        <van-field label-width="100" :required="true" v-model="inf.lastYearIncome" name="上年度营收" label="上年度营收" placeholder="请输入上年度营收" :rules="[{ required: true, message: '请填写上年度营收' }]">
          <template #right-icon>万元</template>
        </van-field>
        <van-field label-width="100" :required="true" v-model="inf.lastYearTax" name="上年度纳税额" label="上年度纳税额" placeholder="请输入上年度纳税额" :rules="[{ required: true, message: '请填写上年度纳税额' }]">
          <template #right-icon>万元</template>
        </van-field>
        <van-field label-width="100" :required="true" v-model="inf.lastYearProfit" name="上年度净利润" label="上年度净利润" placeholder="请输入上年度净利润" :rules="[{ required: true, message: '请填写上年度净利润' }]">
          <template #right-icon>万元</template>
        </van-field>
        <van-field class="textarea-bg" label-width="100" label-align="top" type="textarea" v-model="inf.businessScopes" name="主营业务描述" label="主营业务描述" placeholder="请输入主营业务描述" :rules="[{ required: true, message: '请填写主营业务描述' }]"> </van-field>
        <van-field class="textarea-bg" label-width="100" label-align="top" type="textarea" v-model="inf.companyCurrInfo" name="企业现状说明" label="企业现状说明" placeholder="请输入企业现状说明" :rules="[{ required: true, message: '请填写企业现状说明' }]"> </van-field>
      </van-cell-group>
    </van-form>
    <van-calendar v-model:show="showCalendar" @confirm="selectConfirm" />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker :columns="columns" @confirm="selectConfirm" @cancel="showPicker = false" />
    </van-popup>
  </cardVue>
</template>
<script lang="ts" setup>
import { timeFormat } from 'pr-tools'
import cardVue from '../../components/card/card.vue'
import { ref, watch } from 'vue'
import * as api from '@/api/modules/forms_qyjj'
import { dictConfigRes, transformObj, getDetail, throttle } from '../../static/index'

const vanFormRef = ref()

const props = defineProps({
  orderDetail: {
    type: [Object],
    require: true,
    default: () => {},
  },
})

const inf = ref<any>({
  businessScopes: '', // 主营业务描述
  businessStatus: '', // 企业经营状况（提交时需要转为 KEY）
  companyAttr: '', // 企业属性（提交时需要转为 KEY）
  companyCurrInfo: '', // 企业现状说明
  industrialNature: '', // 产业性质（提交时需要转为 KEY）
  isProceed: '', // 企业涉诉情况（提交时需要转为 boolean）
  lastYearIncome: '', // 上年度营收
  lastYearProfit: '', // 上年度净利润
  lastYearTax: '', // 上年度纳税
  payType: '', // 缴纳方式（提交时需要转为 KEY）
  registerMoney: '', // 注册资本
  totalAssets: '', // 企业总资产
  totalDebt: '', // 企业总负债
  totalProceed: '', // 诉讼总金额

  last: false, // 是否为上一步
  next: false, // 是否为下一步
  id: '', // 进件ID
  orderId: '', // 订单ID
})

const columns = ref([])

const init = async () => {
  let keys = Object.keys(inf.value)
  let obj: any = await getDetail(props.orderDetail.caseInId, keys)
  obj.orderId = props.orderDetail?.orderId
  obj = transformObj(obj, 'down') // 转化为客户端能用的数据
  inf.value = obj
}
init()

const showPicker = ref(false)
const showCalendar = ref(false)
const selectKey = ref('')
const select = (type = '', key = '') => {
  if (type === 'calendar') {
    showCalendar.value = true
  }
  if (type === 'picker') {
    columns.value = dictConfigRes[key]
    showPicker.value = true
  }
  selectKey.value = key
}

const selectConfirm = (e: any) => {
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:e`, e)
  // 选择的是列表
  if (showPicker.value) {
    const [{ text, value }] = e.selectedOptions
    inf.value[selectKey.value] = text
    showPicker.value = false
  }
  // 选择的是日期
  if (showCalendar.value) {
    inf.value[selectKey.value] = timeFormat(e, 'yyyy-mm-dd')
    showCalendar.value = false
  }
}

// 保存
const save = async ({ last = false, next = false } = {}) => {
  let showErrMsg = false
  if (last || next) {
    await vanFormRef.value.validate()
    showErrMsg = true
  }
  let obj = JSON.parse(JSON.stringify(inf.value))
  obj = { ...obj, last, next }
  obj = transformObj(obj, 'up') // 转换为服务端需要的数据
  api.step2Post({ data: obj, showErrMsg }).then((res) => {
    const { code = 0, message, data } = res
    if (code !== 200) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:err`, res)
      return
    }
  })
}

// 监听当前表单
watch(
  () => inf.value,
  (newObj, oldObj) => {
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:newObj, oldObj`, newObj, oldObj)
    // throttle(save, 500)
  },
  {
    deep: true,
  }
)

defineExpose({ save })
</script>
<style lang="scss" scoped></style>
