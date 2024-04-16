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

// 企业项目申报表
const cells = ref<Array<Type_col[]>>([
  // 行
  [{ text: '', value: '企业项目申报表', valueStyle: { 'font-size': '12px', 'font-weight': 'bold' } }]
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
    const { companyName, companyAddr } = obj
    let row = [
      { text: '提交机构', value: companyName },
      { text: '机构地址', value: companyAddr }
    ]
    cells.value.push(row)
  }

  {
    const { projectName, projectAddr } = obj
    let row = [
      { text: '项目单位名称', value: projectName },
      { text: '项目地址', value: projectAddr }
    ]
    cells.value.push(row)
  }
  {
    const { corpUser, corpMobile } = obj
    let row = [
      { text: '法人姓名', value: corpUser },
      { text: '法定代表人电话', value: corpMobile }
    ]
    cells.value.push(row)
  }
  {
    const { ownership } = obj
    let row = [{ text: '股权情况', value: mapValue(ownership, 'ownership') }]
    cells.value.push(row)
  }
  {
    const { landNature } = obj
    let row = [{ text: '土地性质', value: mapValue(landNature, 'landNature') }]
    cells.value.push(row)
  }
  {
    const { landUseNature } = obj
    let row = [{ text: '土地使用性质', value: mapValue(landUseNature, 'landUseNature') }]
    cells.value.push(row)
  }
  {
    const { companyBuildNature1, companyBuildNature2 } = obj
    let row = [
      { text: '企业建筑性质 - 工业', value: mapValue(companyBuildNature1, 'companyBuildNature1') },
      { text: '企业建筑性质 - 房地产', value: mapValue(companyBuildNature2, 'companyBuildNature2') }
    ]
    cells.value.push(row)
  }
  {
    const { landArea, landUnit } = obj
    let row = [
      { text: '土地面积', value: landArea },
      { text: '土地所属单位', value: landUnit }
    ]
    cells.value.push(row)
  }
  {
    const { owner, companyCurrInfo } = obj
    let row = [
      { text: '产权人', value: owner },
      { text: '公司目前情况', value: mapValue(companyCurrInfo, 'companyCurrInfo') }
    ]
    cells.value.push(row)
  }
  {
    const { lawCategory } = obj
    let row = [{ text: '司法类别', value: mapValue(lawCategory, 'lawCategory') }]
    cells.value.push(row)
  }
  {
    const { thisYearIncome, thisYearProfit } = obj
    let row = [
      { text: '目前营业额（年） 毛利', value: thisYearIncome },
      { text: '目前营业额（年） 净利', value: thisYearProfit }
    ]
    cells.value.push(row)
  }
  {
    const { rentRate, rentMoney } = obj
    let row = [
      { text: '租赁比（年）', value: rentRate },
      { text: '租赁金额（年）', value: rentMoney }
    ]
    cells.value.push(row)
  }
  {
    let row = [{ text: '', value: '资产总量', valueStyle: { 'font-size': '10px' } }]
    cells.value.push(row)
  }
  {
    const { unMoveAssets } = obj
    let row = [{ text: '不动产说明', value: unMoveAssets }]
    cells.value.push(row)
  }
  {
    const { fixedAssets } = obj
    let row = [{ text: '固定资产说明', value: fixedAssets }]
    cells.value.push(row)
  }
  {
    const { flowAssets } = obj
    let row = [{ text: '流动资产说明', value: flowAssets }]
    cells.value.push(row)
  }
  {
    const { invisibleAssets } = obj
    let row = [{ text: '无形资产', value: invisibleAssets }]
    cells.value.push(row)
  }
  {
    const { fixedAssetsTotal } = obj
    let row = [{ text: '固定资产总价', value: fixedAssetsTotal }]
    cells.value.push(row)
  }
  {
    const { flowAssetsTotal } = obj
    let row = [{ text: '流动/无形资产总价', value: flowAssetsTotal }]
    cells.value.push(row)
  }
  {
    const { totalAssets } = obj
    let row = [{ text: '资产合计', value: totalAssets }]
    cells.value.push(row)
  }
  {
    let row = [{ text: '', value: '债务总量', valueStyle: { 'font-size': '10px' } }]
    cells.value.push(row)
  }
  {
    const { bankLoan, smallLoan } = obj
    let row = [
      { text: '银行贷款', value: bankLoan },
      { text: '小额贷款', value: smallLoan }
    ]
    cells.value.push(row)
  }
  {
    const { owedTaxMoney, unSaleMoney } = obj
    let row = [
      { text: '已欠税金', value: owedTaxMoney },
      { text: '未售部分核定税金', value: unSaleMoney }
    ]
    cells.value.push(row)
  }
  {
    const { ensureMoney, ensureCount } = obj
    let row = [
      { text: '对外担保金额', value: ensureMoney },
      { text: '担保人数/企业户数', value: ensureCount }
    ]
    cells.value.push(row)
  }
  {
    const { owedWorkerMoney, workerCount } = obj
    let row = [
      { text: '欠工人工资', value: owedWorkerMoney },
      { text: '工人人数', value: workerCount }
    ]
    cells.value.push(row)
  }
  {
    const { privateLendAmount, privateLendCount } = obj
    let row = [
      { text: '民间借贷金额', value: privateLendAmount },
      { text: '民间借贷人数', value: privateLendCount }
    ]
    cells.value.push(row)
  }
  {
    const { otherOwed } = obj
    let row = [{ text: '其他欠款说明', value: otherOwed }]
    cells.value.push(row)
  }
  {
    const { debtAmount } = obj
    let row = [{ text: '债务总量统计', value: debtAmount }]
    cells.value.push(row)
  }
  {
    const { companyPetition } = obj
    let row = [{ text: '企业诉求', value: mapValue(companyPetition, 'companyPetition') }]
    cells.value.push(row)
  }
  {
    const { companyPetitionOther } = obj
    let row = [{ text: '企业其他诉求', value: companyPetitionOther }]
    cells.value.push(row)
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
