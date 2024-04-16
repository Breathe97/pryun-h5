<template>
  <div class="forms-qyjj-preview">
    <div class="table">
      <pr-table-preview-view :cells="cells"></pr-table-preview-view>
    </div>
    <div style="height: 12px"></div>
    <van-cell-group inset>
      <van-field v-if="detail.otherInfo" is-link readonly name="otherInfo" label="其他资料" placeholder="去查看" @click="previews('otherInfo')" />
    </van-cell-group>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { showImagePreview } from 'vant'
import { getDetail, dictConfigRes } from '../static/index'
import { filePreviewUrl } from '@/api/modules/common'

const props = defineProps({
  orderDetail: {
    type: [Object],
    require: true,
    default: () => {}
  }
})

type Type_col = { text: string; value: any; textStyle?: {}; valueStyle?: {} }

// 企业债务纾困信息登记表
const cells = ref<Array<Type_col[]>>([
  // 行
  [{ text: '', value: '企业债务纾困信息登记表', valueStyle: { 'font-size': '12px', 'font-weight': 'bold' } }]
])

const detail: any = ref({
  otherInfo: ''
})

type Type_info = { text: string; value: any }

const mapValue = (val: string, key = '') => {
  let arr: Type_info[] = dictConfigRes[key]
  let { text = val } = arr.find((item) => item.value) || {}
  return text
}

const init = async () => {
  let obj: any = await getDetail(props.orderDetail.caseInId, [])
  obj.orderId = props.orderDetail?.orderId
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:obj`, obj)
  {
    const { companyName, companyCreditCode } = obj
    let row = [
      { text: '企业名称', value: companyName },
      { text: '统一社会信用代码', value: companyCreditCode }
    ]
    cells.value.push(row)
  }

  {
    const { companyAddr, companyRegisterAt } = obj
    let row = [
      { text: '公司地址', value: companyAddr },
      { text: '注册时间', value: companyRegisterAt }
    ]
    cells.value.push(row)
  }
  {
    const { corpUser, corpMobile } = obj
    let row = [
      { text: '法定代表人姓名', value: corpUser },
      { text: '法定代表人电话', value: corpMobile }
    ]
    cells.value.push(row)
  }
  {
    const { corpCardNo, corpCredit } = obj
    let row = [
      { text: '法定代表人身份证号', value: corpCardNo },
      { text: '法人征信情况', value: mapValue(corpCredit, 'corpCredit') }
    ]
    cells.value.push(row)
  }
  {
    const { contactUser, contactMobile } = obj
    let row = [
      { text: '联系人', value: contactUser },
      { text: '联系人电话', value: contactMobile }
    ]
    cells.value.push(row)
  }
  {
    let row = [{ text: '', value: '企业简介', valueStyle: { 'font-size': '10px' } }]
    cells.value.push(row)
  }
  {
    const { companyAttr, isProceed, businessStatus } = obj
    let row = [
      { text: '企业属性', value: mapValue(companyAttr, 'companyAttr') },
      { text: '企业涉诉情况', value: mapValue(isProceed, 'isProceed') },
      { text: '企业经营状况', value: mapValue(businessStatus, 'businessStatus') }
    ]
    cells.value.push(row)
  }

  {
    const { registerMoney, payType, industrialNature } = obj
    let row = [
      { text: '注册资本', value: registerMoney },
      { text: '缴纳方式', value: mapValue(payType, 'payType') },
      { text: '产业性质', value: mapValue(industrialNature, 'industrialNature') }
    ]
    cells.value.push(row)
  }
  {
    const { totalAssets, totalDebt, totalProceed } = obj
    let row = [
      { text: '企业总资产', value: totalAssets },
      { text: '企业总负债', value: totalDebt },
      { text: '诉讼总金额', value: totalProceed }
    ]
    cells.value.push(row)
  }
  {
    const { lastYearIncome, lastYearTax, lastYearProfit } = obj
    let row = [
      { text: '上年度营收', value: lastYearIncome },
      { text: '上年度纳税', value: lastYearTax },
      { text: '上年度净利润', value: lastYearProfit }
    ]
    cells.value.push(row)
  }
  {
    const { businessScopes } = obj
    let row = [{ text: '主营业务描述', value: businessScopes }]
    cells.value.push(row)
  }

  {
    const { debtList = [] } = obj
    for (const [index, debtItem] of debtList.entries()) {
      {
        let row = [{ text: '', value: `债务信息(${index + 1})`, valueStyle: { 'font-size': '10px' } }]
        cells.value.push(row)
      }

      {
        const { debtType, debtPrincipal, debtInterest } = debtItem
        let row = [
          { text: '债务性质', value: mapValue(debtType, 'debtType') },
          { text: '债务本金', value: debtPrincipal },
          { text: '利息加罚息', value: debtInterest }
        ]
        cells.value.push(row)
      }
      {
        const { debtCreditUser, overdue } = debtItem
        let row = [
          { text: '债权人名称', value: debtCreditUser },
          { text: '逾期时间', value: overdue }
        ]
        cells.value.push(row)
      }
      {
        const { hockIntro, hockWorth } = debtItem
        let row = [
          { text: '抵押物介绍', value: hockIntro },
          { text: '抵押物可变现价值', value: hockWorth }
        ]
        cells.value.push(row)
      }
      {
        const { jugProcess, debtSurplus } = debtItem
        let row = [
          { text: '司法程序进展', value: mapValue(jugProcess, 'jugProcess') },
          { text: '抵偿后剩余债务', value: debtSurplus }
        ]
        cells.value.push(row)
      }
    }
  }

  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:cells.value`, cells.value)
  detail.value = obj
}
init()

const previews = (key = '') => {
  const str = detail.value[key]
  let arr = str ? str.split(',') : []
  arr = Array.from(arr, (url) => `${filePreviewUrl}${url}`)
  showImagePreview(arr)
}
</script>
<style lang="scss" scoped>
.forms-qyjj-preview {
  position: relative;
}
</style>
