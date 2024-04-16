<template>
  <div class="step-item-res">
    <div class="icon"><van-icon name="checked" size="48" color="rgba(74, 199, 74, 1)" /></div>
    <div class="title">提交成功</div>
    <div class="tip">您提交的进件信息已提交成功</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import * as api from '@/api/modules/forms_qyjj'
import { getDetail, throttle } from '../static/index'

const vanFormRef = ref()

const props = defineProps({
  orderDetail: {
    type: [Object],
    require: true,
    default: () => {}
  }
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
  orderId: '' // 订单ID
})

const init = async () => {
  let keys = Object.keys(inf.value)
  let obj: any = await getDetail(props.orderDetail.caseInId, keys)
  obj.orderId = props.orderDetail?.orderId
  inf.value = { ...inf.value, ...obj }
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
<style lang="scss" scoped>
.step-item-res {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    line-height: 80px;
    font-size: 16px;
    font-weight: bold;
  }
  .tip {
    color: #999999;
  }
}
</style>
