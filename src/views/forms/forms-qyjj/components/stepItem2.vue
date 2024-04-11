<template>
  <cardVue :collapse="false" title="企业简介">
    <van-form ref="vanFormRef" required="auto" label-width="100">
      <van-cell-group inset>
        <pr-select-van-field v-model="inf.companyAttr" :columns="dictConfigRes.companyAttr" is-link readonly name="企业属性" label="企业属性" placeholder="请选择" :rules="[{ required: true, message: '请选择企业属性' }]" />
        <pr-select-van-field v-model="inf.isProceed" :columns="dictConfigRes.isProceed" is-link readonly name="企业涉诉情况" label="企业涉诉情况" placeholder="请选择" :rules="[{ required: true, message: '请选择企业涉诉情况' }]" />
        <pr-select-van-field v-model="inf.businessStatus" :columns="dictConfigRes.businessStatus" is-link readonly name="经营状况" label="经营状况" placeholder="请选择" :rules="[{ required: true, message: '请选择经营状况' }]" />
        <van-field v-model="inf.registerMoney" name="注册资本" label="注册资本" placeholder="请输入注册资本" maxlength="5" :rules="[{ required: true, message: '请填写注册资本' }]" type="digit">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <pr-select-van-field v-model="inf.payType" :columns="dictConfigRes.payType" is-link readonly name="缴纳方式" label="缴纳方式" placeholder="请选择" :rules="[{ required: true, message: '请选择缴纳方式' }]" />
        <pr-select-van-field v-model="inf.industrialNature" :columns="dictConfigRes.industrialNature" is-link readonly name="产业性质" label="产业性质" placeholder="请选择" :rules="[{ required: true, message: '请选择产业性质' }]" />
        <van-field v-model="inf.totalAssets" name="企业总资产" label="企业总资产" placeholder="请输入企业总资产" maxlength="5" :rules="[{ required: true, message: '请填写企业总资产' }]" type="digit">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field v-model="inf.totalDebt" name="企业总负债" label="企业总负债" placeholder="请输入企业总负债" maxlength="5" :rules="[{ required: true, message: '请填写企业总负债' }]" type="digit">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field v-model="inf.totalProceed" name="涉诉总金额" label="涉诉总金额" placeholder="请输入涉诉总金额" maxlength="5" :rules="[{ required: true, message: '请填写涉诉总金额' }]" type="digit">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field v-model="inf.lastYearIncome" name="上年度营收" label="上年度营收" placeholder="请输入上年度营收" maxlength="5" :rules="[{ required: true, message: '请填写上年度营收' }]" type="digit">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field v-model="inf.lastYearTax" name="上年度纳税额" label="上年度纳税额" placeholder="请输入上年度纳税额" maxlength="5" :rules="[{ required: true, message: '请填写上年度纳税额' }]" type="digit">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field v-model="inf.lastYearProfit" name="上年度净利润" label="上年度净利润" placeholder="请输入上年度净利润" maxlength="5" :rules="[{ required: true, message: '请填写上年度净利润' }]" type="digit">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field label-width="88" class="textarea-bg" maxlength="200" show-word-limit label-align="top" type="textarea" v-model="inf.businessScopes" name="主营业务描述" label="主营业务描述" placeholder="请输入主营业务描述" :rules="[{ required: true, message: '请输入主营业务描述' }]"> </van-field>
        <van-field class="textarea-bg" maxlength="200" show-word-limit label-align="top" type="textarea" v-model="inf.companyCurrInfo" name="企业现状说明" label="企业现状说明" placeholder="请输入企业现状说明"> </van-field>
      </van-cell-group>
    </van-form>
  </cardVue>
</template>
<script lang="ts" setup>
import cardVue from '../../components/card/card.vue'
import { ref, watch } from 'vue'
import * as api from '@/api/modules/forms_qyjj'
import { dictConfigRes, getDetail, throttle, rules } from '../../static/index'

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
  businessStatus: '', // 企业经营状况
  companyAttr: '', // 企业属性
  companyCurrInfo: '', // 企业现状说明
  industrialNature: '', // 产业性质
  isProceed: '', // 企业涉诉情况
  lastYearIncome: '', // 上年度营收
  lastYearProfit: '', // 上年度净利润
  lastYearTax: '', // 上年度纳税
  payType: '', // 缴纳方式
  registerMoney: '', // 注册资本
  totalAssets: '', // 企业总资产
  totalDebt: '', // 企业总负债
  totalProceed: '', // 诉讼总金额

  last: false, // 是否为上一步
  next: false, // 是否为下一步
  id: '', // 进件ID
  orderId: '', // 订单ID
})

const init = async () => {
  let keys = Object.keys(inf.value)
  let obj: any = await getDetail(props.orderDetail.caseInId, keys)
  obj.orderId = props.orderDetail?.orderId
  obj.isProceed = Number(obj.isProceed)
  inf.value = { ...inf.value, ...obj }
}
init()

// 保存
const save = async ({ last = false, next = false, showErrMsg = false } = {}) => {
  let obj = JSON.parse(JSON.stringify(inf.value))
  obj.isProceed = Boolean(obj.isProceed)
  obj = { ...obj, last, next }
  return api.step2Post({ data: obj, showErrMsg })
}

// 校验表单
const validate = () => {
  return vanFormRef.value.validate()
}

// 监听当前表单
watch(
  () => inf.value,
  () => throttle(save, 500),
  { deep: true }
)

defineExpose({ save, validate })
</script>
<style lang="scss" scoped></style>
