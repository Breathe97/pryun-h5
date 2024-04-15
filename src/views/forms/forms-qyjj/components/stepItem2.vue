<template>
  <cardVue :collapse="false" title="资产总量">
    <van-form ref="vanFormRef" required="auto" label-width="130">
      <van-cell-group inset>
        <van-field class="textarea-bg" maxlength="500" show-word-limit label-align="top" type="textarea" v-model="inf.companyCurrInfo" name="companyCurrInfo" label="" placeholder="请输入不动产名称/数量/市价 (商业)" :rules="[{ required: true, message: '请输入不动产名称/数量/市价 (商业)' }]">
          <template #label>
            <div class="pr-form-label">
              <div class="pr-form-label-text">不动产名称/数量/市价 (商业)</div>
              <div class="pr-form-tip-text">说明：指不能移动的财产，例如：建筑物、土地、矿产、林权、海域使用权等。</div>
            </div>
          </template>
        </van-field>
        <van-field class="textarea-bg" maxlength="500" show-word-limit label-align="top" type="textarea" v-model="inf.companyCurrInfo" name="companyCurrInfo" label="" placeholder="请输入固定资产名称/数量/市价 (企业)" :rules="[{ required: true, message: '请输入固定资产名称/数量/市价 (企业)' }]">
          <template #label>
            <div class="pr-form-label">
              <div class="pr-form-label-text">固定资产名称/数量/市价 (企业)</div>
              <div class="pr-form-tip-text">说明：指企业为生产产品、提供劳务、出租或者经营管理而持有的、使用时间超过 12个月的有形资产。例如房屋、建筑物、机器、机械、运输工具以及其他与生产、经营有关的设备、器具、工具等。</div>
            </div>
          </template>
        </van-field>
        <van-field class="textarea-bg" maxlength="500" show-word-limit label-align="top" type="textarea" v-model="inf.companyCurrInfo" name="companyCurrInfo" label="" placeholder="请输入固定资产名称/数量/市价 (企业)" :rules="[{ required: true, message: '请输入固定资产名称/数量/市价 (企业)' }]">
          <template #label>
            <div class="pr-form-label">
              <div class="pr-form-label-text">流动资产名称/数量/市价</div>
              <div class="pr-form-tip-text">说明：指企业可以在一年或者超过一年的一个营业周期内变现或者运用的资产，一般包括库存现金，各种银行存款，以及其他货币资金还有交易性金融资产、应收票据，应收账款，预付账款，其他应收款,待摊费用，预付费用，存货及其他流动性资产。</div>
            </div>
          </template>
        </van-field>
        <van-field class="textarea-bg" maxlength="500" show-word-limit label-align="top" type="textarea" v-model="inf.companyCurrInfo" name="companyCurrInfo" label="" placeholder="请输入固定资产名称/数量/市价 (企业)" :rules="[{ required: true, message: '请输入固定资产名称/数量/市价 (企业)' }]">
          <template #label>
            <div class="pr-form-label">
              <div class="pr-form-label-text">无形资产名称/数量/市价</div>
              <div class="pr-form-tip-text">说明：指企业拥有或控制的、没有实物形态的、能够为企业带来经济利益的资产，例如：专利权、商标权、版权等。</div>
            </div>
          </template>
        </van-field>
        <van-field class="textarea-bg" maxlength="500" show-word-limit label-align="top" type="textarea" v-model="inf.companyCurrInfo" name="companyCurrInfo" label="" placeholder="请输入固定资产名称/数量/市价 (企业)" :rules="[{ required: true, message: '请输入固定资产名称/数量/市价 (企业)' }]">
          <template #label>
            <div class="pr-form-label">
              <div class="pr-form-label-text">其他补充资产</div>
              <div class="pr-form-tip-text">说明：指除固定资产无形资产和流动资产以外的工他资产。例如：长期待摊费用、递延所得税资产等。</div>
            </div>
          </template>
        </van-field>
        <van-field type="number" maxlength="12" v-model="inf.registerMoney" name="固定资产总价" label="固定资产总价" placeholder="请输入固定资产总价" :rules="[{ required: true, message: '请填写固定资产总价' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field type="number" maxlength="12" v-model="inf.registerMoney" name="流动/无形资产总价" label="流动/无形资产总价" placeholder="请输入流动/无形资产总价" :rules="[{ required: true, message: '请填写流动/无形资产总价' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field type="number" maxlength="12" v-model="inf.registerMoney" name="资产合计" label="资产合计" placeholder="请输入资产合计" :rules="[{ required: true, message: '请填写资产合计' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
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
    default: () => {}
  }
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
  orderId: '' // 订单ID
})

const init = async () => {
  let keys = Object.keys(inf.value)
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:props.orderDetail`, props.orderDetail);
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
  (a, b) => b.id && throttle(save, 500),
  { deep: true }
)

defineExpose({ save, validate })
</script>
<style lang="scss" scoped></style>
