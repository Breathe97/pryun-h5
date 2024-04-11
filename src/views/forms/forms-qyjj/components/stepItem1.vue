<template>
  <cardVue :collapse="false" title="债务人信息">
    <van-form ref="vanFormRef">
      <van-cell-group inset>
        <van-field label-width="100" :required="true" v-model="inf.companyName" name="企业名称" label="企业名称" placeholder="请输入企业名称" :rules="[{ required: true, message: '请填写企业名称' }]" />
        <van-field label-width="100" :required="true" v-model="inf.companyCreditCode" name="统一社会代码" label="统一社会代码" placeholder="统一社会代码" :rules="[{ required: true, message: '请填写统一社会代码' }]" />
        <van-field label-width="100" :required="true" v-model="inf.companyAddr" name="公司地址" label="公司地址" placeholder="公司地址（省/市/区/门牌号）" :rules="[{ required: true, message: '请填写公司地址' }]" />
        <pr-calendar-van-field label-width="100" :required="true" v-model="inf.companyRegisterAt" is-link readonly name="注册时间" label="注册时间" placeholder="点击选择日期" :rules="[{ required: true, message: '请选择注册时间' }]" />
        <van-field label-width="100" :required="true" v-model="inf.corpUser" name="法定代表人" label="法定代表人" placeholder="请输入法定代表人" :rules="[{ required: true, message: '请填写法定代表人' }]" />
        <van-field label-width="100" :required="true" v-model="inf.corpMobile" name="联系电话" label="联系电话" placeholder="请输入联系电话" :rules="[{ required: true, message: '请填写联系电话' }]" />
        <van-field label-width="100" :required="true" v-model="inf.corpCardNo" name="身份证号" label="身份证号" placeholder="请输入身份证号" :rules="[{ required: true, message: '请填写身份证号' }]" />
        <pr-select-van-field label-width="100" :required="true" v-model="inf.corpCredit" :columns="dictConfigRes.corpCredit" is-link readonly name="法人征信情况" label="法人征信情况" placeholder="点击选择征信情况" :rules="[{ required: true, message: '请填写法人征信情况' }]" />
        <van-field label-width="100" :required="true" v-model="inf.contactUser" name="联系人" label="联系人" placeholder="请输入联系人" :rules="[{ required: true, message: '请填写联系人' }]" />
        <van-field label-width="100" :required="true" v-model="inf.contactMobile" name="联系人电话" label="联系人电话" placeholder="请输入联系人电话" :rules="[{ required: true, message: '请填写联系人电话' }]" />
      </van-cell-group>
    </van-form>
  </cardVue>
</template>
<script lang="ts" setup>
import cardVue from '../../components/card/card.vue'
import { ref, watch } from 'vue'
import * as api from '@/api/modules/forms_qyjj'
import { dictConfigRes, getDetail, throttle } from '../../static/index'

const vanFormRef = ref()

const props = defineProps({
  orderDetail: {
    type: [Object],
    require: true,
    default: () => {},
  },
})

const inf: any = ref({
  companyAddr: '', // 公司地址
  companyCreditCode: '', // 统一社会信用代码
  companyName: '', // 企业名称
  companyRegisterAt: '', // 注册时间
  contactMobile: '', // 联系人电话
  contactUser: '', // 联系人
  corpCardNo: '', // 法定代表人身份证号
  corpCredit: '', // 法人征信情况
  corpMobile: '', // 	法定代表人电话
  corpUser: '', // 法定代表人姓名

  last: false, // 是否为上一步
  next: false, // 是否为下一步
  id: '', // 进件ID
  orderId: '', // 订单ID
})

const init = async () => {
  let keys = Object.keys(inf.value)
  let obj: any = await getDetail(props.orderDetail.caseInId, keys)
  obj.orderId = props.orderDetail?.orderId
  inf.value = obj
}
init()

// 保存
const save = async ({ last = false, next = false, showErrMsg = false } = {}) => {
  let obj = JSON.parse(JSON.stringify(inf.value))
  obj = { ...obj, last, next }
  return api.step1Post({ data: obj, showErrMsg })
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
