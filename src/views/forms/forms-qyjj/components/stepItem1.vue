<template>
  <cardVue :collapse="false" title="基础信息">
    <van-form ref="vanFormRef" required="auto" label-width="120">
      <van-cell-group inset>
        <van-field maxlength="100" v-model="inf.companyName" name="companyName" label="机构名称" placeholder="请输入机构名称" :rules="[{ required: true, message: '请填写机构名称' }]" />
        <van-field maxlength="200" v-model="inf.companyAddr" name="companyAddr" label="机构地址" placeholder="机构地址（省/市/区/门牌号）" :rules="[{ required: true, message: '请填写机构地址' }]" />
        <van-field maxlength="20" v-model="inf.companyUser" name="companyUser" label="机构联系人" placeholder="请输入机构联系人" :rules="[{ required: true, message: '请填写机构联系人' }]" />
        <van-field maxlength="12" type="tel" v-model="inf.contactMobile" name="联系人电话" label="联系人电话" placeholder="请输入联系人电话" :rules="rules.mobile" />
        <van-field maxlength="100" v-model="inf.projectName" name="projectName" label="项目单位名称" placeholder="请输入项目单位名称" :rules="[{ required: true, message: '请填写项目单位名称' }]" />
        <van-field maxlength="200" v-model="inf.projectAddr" name="projectAddr" label="项目地址" placeholder="项目地址（省/市/区/门牌号）" :rules="[{ required: true, message: '请填写项目地址' }]" />
        <van-field maxlength="20" v-model="inf.corpUser" name="corpUser" label="法人/实际控制人" placeholder="请输入法人/实际控制人" :rules="[{ required: true, message: '请填写法人/实际控制人' }]" />
        <van-field maxlength="12" type="tel" v-model="inf.corpMobile" name="corpMobile" label="联系方式" placeholder="请输入联系方式" :rules="rules.mobile" />
        <PrSelectVanField :multipleNum="1" v-model="inf.ownership" :columns="dictConfigRes.ownership.columns" is-link readonly name="ownership" label="股权情况" placeholder="点击选择股权情况" :rules="[{ required: true, message: '请填写股权情况' }]" />
        <PrSelectVanField :multipleNum="1" v-model="inf.landNature" :columns="dictConfigRes.landNature.columns" is-link readonly name="landNature" label="土地性质" placeholder="点击选择土地性质" :rules="[{ required: true, message: '请填写土地性质' }]" />
        <PrSelectVanField :multipleNum="0" v-model="inf.landUseNature" :columns="dictConfigRes.landUseNature.columns" is-link readonly name="landUseNature" label="土地使用性质" placeholder="点击选择土地使用性质" :rules="[{ required: true, message: '请填写土地使用性质' }]" />
        <PrSelectVanField :multipleNum="1" v-model="inf.companyBuildNature1" :columns="dictConfigRes.companyBuildNature1.columns" is-link readonly name="companyBuildNature1" label="企业建筑性质" placeholder="点击选择工业类型" :rules="[{ required: true, message: '请填写工业类型' }]" />
        <PrSelectVanField :multipleNum="1" class="required-hide" v-model="inf.corpCredit" :columns="dictConfigRes.companyBuildNature2.columns" is-link readonly name="companyBuildNature2" label=" " placeholder="点击选择房地产类型" :rules="[{ required: true, message: '请填写房地产类型' }]" />
        <van-field maxlength="12" type="number" v-model="inf.landArea" name="landArea" label="土地面积" placeholder="请输入土地面积" :rules="[{ required: true, message: '请填写土地面积' }]">
          <template #right-icon>
            <span style="margin-right: 12px">M <sup>2</sup> </span>
          </template>
        </van-field>
        <van-field maxlength="100" v-model="inf.landUnit" name="landUnit" label="土地所属单位" placeholder="请输入土地所属单位" :rules="[{ required: true, message: '请填写土地所属单位' }]" />
        <van-field maxlength="20" v-model="inf.owner" name="owner" label="产权人" placeholder="请输入产权人" :rules="[{ required: true, message: '请填写产权人' }]" />
        <PrSelectVanField :multipleNum="1" v-model="inf.companyCurrInfo" :columns="dictConfigRes.companyCurrInfo.columns" is-link readonly name="companyCurrInfo" label="公司目前情况" placeholder="点击选择公司目前情况" :rules="[{ required: true, message: '请填写公司目前情况' }]" />
        <PrSelectVanField :multipleNum="1" v-model="inf.lawCategory" :columns="dictConfigRes.lawCategory.columns" is-link readonly name="lawCategory" label="司法类别" placeholder="点击选择司法类别" :rules="[{ required: true, message: '请填写司法类别' }]" />
        <van-field v-model="inf.thisYearIncome" name="thisYearIncome" label="目前营业额(年)" placeholder="请输入经营毛利" :rules="[{ required: true, message: '请输入经营毛利' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field class="required-hide" v-model="inf.thisYearProfit" name="thisYearProfit" label=" " placeholder="请输入经营净利" :rules="[{ required: true, message: '请输入经营净利' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field maxlength="12" type="number" v-model="inf.rentRate" name="rentRate" label="租赁比(年)" placeholder="请输入租赁比(年)" :rules="[{ required: true, message: '请填写租赁比(年)' }]"> </van-field>
        <van-field maxlength="12" type="number" v-model="inf.rentMoney" name="rentMoney" label="租赁金额(年)" placeholder="请输入租赁金额(年)" :rules="[{ required: true, message: '请填写租赁金额(年)' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
      </van-cell-group>
    </van-form>
  </cardVue>
</template>
<script lang="ts" setup>
import cardVue from '../../components/card/card.vue'
import { ref, watch, nextTick } from 'vue'
import * as api from '@/api/modules/forms_qyjj'
import { dictConfigRes, getDetail, throttle, rules } from '../static/index'

const vanFormRef = ref()

const props = defineProps({
  orderDetail: {
    type: [Object],
    require: true,
    default: () => {}
  }
})

const inf: any = ref({
  companyName: '', // 机构名称
  companyAddr: '', // 机构地址
  companyUser: '', // 机构联系人
  companyContactMobile: '', // 企业联系电话

  projectName: '', // 项目单位名称
  projectAddr: '', // 项目地址
  corpUser: '', // 法人姓名
  corpMobile: '', // 法人电话
  ownership: '', // 股权情况
  landNature: '', // 土地性质
  landUseNature: '', // 土地使用性质
  companyBuildNature1: '', // 企业建筑性质 - 工业
  companyBuildNature2: '', // 企业建筑性质 - 房地产
  landArea: '', // 土地面积
  landUnit: '', // 土地所属单位
  owner: '', // 产权人
  companyCurrInfo: '', // 公司目前情况
  lawCategory: '', // 司法类别

  thisYearIncome: '', // 目前营业额（年） 毛利
  thisYearProfit: '', // 目前营业额（年） 净利

  rentRate: '', // 租赁比（年）
  rentMoney: '', // 租赁金额（年）

  last: false, // 是否为上一步
  next: false, // 是否为下一步
  id: '', // 进件ID
  orderId: '' // 订单ID
})

const init = async () => {
  let keys = Object.keys(inf.value)
  let obj: any = await getDetail(props.orderDetail.caseInId, keys)
  obj.orderId = props.orderDetail?.orderId
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:obj`, obj);
  inf.value = { ...inf.value, ...obj }
}
init()

// 保存
const save = async ({ last = false, next = false, showErrMsg = false } = {}) => {
  let obj = JSON.parse(JSON.stringify(inf.value))
  obj = { ...obj, last, next }
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:props.orderDetail`, props.orderDetail)
  return api.step1Post({ data: obj, showErrMsg })
}

// 校验表单
const validate = () => {
  return vanFormRef.value.validate()
}

// 监听当前表单
watch(
  () => inf.value,
  (a, b) => a.id && throttle(save, 500),
  { deep: true }
)

defineExpose({ save, validate })
</script>
<style lang="scss" scoped></style>
