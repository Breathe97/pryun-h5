<template>
  <cardVue :collapse="false" title="债务人信息">
    <van-form ref="vanFormRef">
      <van-cell-group inset>
        <van-field label-width="100" :required="true" v-model="inf.companyName" name="企业名称" label="企业名称" placeholder="请输入企业名称" :rules="[{ required: true, message: '请填写企业名称' }]" />
        <van-field label-width="100" :required="true" v-model="inf.companyCreditCode" name="统一社会代码" label="统一社会代码" placeholder="统一社会代码" :rules="[{ required: true, message: '请填写统一社会代码' }]" />
        <van-field label-width="100" :required="true" v-model="inf.companyAddr" name="公司地址" label="公司地址" placeholder="公司地址（省/市/区/门牌号）" :rules="[{ required: true, message: '请填写公司地址' }]" />
        <van-field label-width="100" :required="true" v-model="inf.companyRegisterAt" is-link readonly name="注册时间" label="注册时间" placeholder="点击选择日期" @click="select('calendar', 'companyRegisterAt')" :rules="[{ required: true, message: '请选择注册时间' }]" />
        <van-field label-width="100" :required="true" v-model="inf.corpUser" name="法定代表人" label="法定代表人" placeholder="请输入法定代表人" :rules="[{ required: true, message: '请填写法定代表人' }]" />
        <van-field label-width="100" :required="true" v-model="inf.corpMobile" name="联系电话" label="联系电话" placeholder="请输入联系电话" :rules="[{ required: true, message: '请填写联系电话' }]" />
        <van-field label-width="100" :required="true" v-model="inf.corpCardNo" name="身份证号" label="身份证号" placeholder="请输入身份证号" :rules="[{ required: true, message: '请填写身份证号' }]" />
        <van-field label-width="100" :required="true" v-model="inf.corpCredit" is-link readonly name="法人征信情况" label="法人征信情况" placeholder="点击选择征信情况" @click="select('picker', 'corpCredit')" :rules="[{ required: true, message: '请填写法人征信情况' }]" />
        <van-field label-width="100" :required="true" v-model="inf.contactUser" name="联系人" label="联系人" placeholder="请输入联系人" :rules="[{ required: true, message: '请填写联系人' }]" />
        <van-field label-width="100" :required="true" v-model="inf.contactMobile" name="联系人电话" label="联系人电话" placeholder="请输入联系人电话" :rules="[{ required: true, message: '请填写联系人电话' }]" />
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

const inf: any = ref({
  companyAddr: '', // 公司地址
  companyCreditCode: '', // 统一社会信用代码
  companyName: '', // 企业名称
  companyRegisterAt: '', // 注册时间
  contactMobile: '', // 联系人电话
  contactUser: '', // 联系人
  corpCardNo: '', // 法定代表人身份证号
  corpCredit: '', // 法人征信情况（提交时需要转为 KEY）
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
  obj = transformObj(obj, 'down') // 转化为客户端能用的数据
  inf.value = obj
}
init()

const showPicker = ref(false)
const showCalendar = ref(false)
const selectKey = ref('')
const columns = ref([])

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
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:obj`, obj)
  obj = transformObj(obj, 'up') // 转换为服务端需要的数据
  api.step1Post({ data: obj, showErrMsg }).then((res) => {
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
