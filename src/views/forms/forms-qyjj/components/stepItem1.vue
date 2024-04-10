<template>
  <cardVue :collapse="false" title="债务人信息">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field label-width="100" :required="true" v-model="inf.companyName" name="企业名称" label="企业名称" placeholder="请输入企业名称" :rules="[{ required: true, message: '请填写企业名称' }]" />
        <van-field label-width="100" :required="true" v-model="inf.companyCreditCode" type="password" name="统一社会代码" label="统一社会代码" placeholder="统一社会代码" :rules="[{ required: true, message: '请填写统一社会代码' }]" />
        <van-field label-width="100" :required="true" v-model="inf.companyAddr" type="password" name="公司地址" label="公司地址" placeholder="公司地址（省/市/区/门牌号）" :rules="[{ required: true, message: '请填写公司地址' }]" />
        <van-field label-width="100" :required="true" v-model="inf.companyRegisterAt" is-link readonly name="注册时间" label="注册时间" placeholder="点击选择日期" @click="select('calendar', 'username')" />
        <van-field label-width="100" :required="true" v-model="inf.corpUser" name="法定代表人" label="法定代表人" placeholder="请输入法定代表人" :rules="[{ required: true, message: '请填写法定代表人' }]" />
        <van-field label-width="100" :required="true" v-model="inf.corpMobile" name="联系电话" label="联系电话" placeholder="请输入联系电话" :rules="[{ required: true, message: '请填写联系电话' }]" />
        <van-field label-width="100" :required="true" v-model="inf.corpCardNo" name="身份证号" label="身份证号" placeholder="请输入身份证号" :rules="[{ required: true, message: '请填写身份证号' }]" />
        <van-field label-width="100" :required="true" v-model="inf.corpCredit" is-link readonly name="法人征信情况" label="法人征信情况" placeholder="点击选择征信情况" @click="select('picker', 'username')" :rules="[{ required: true, message: '请填写法人征信情况' }]" />
        <van-field label-width="100" :required="true" v-model="inf.contactUser" name="联系人" label="联系人" placeholder="请输入联系人" :rules="[{ required: true, message: '请填写联系人' }]" />
        <van-field label-width="100" :required="true" v-model="inf.contactMobile" name="联系人电话" label="联系人电话" placeholder="请输入联系人电话" :rules="[{ required: true, message: '请填写联系人电话' }]" />
      </van-cell-group>
    </van-form>
    <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </cardVue>
</template>
<script lang="ts" setup>
import cardVue from '../../components/card/card.vue'
import { ref, computed } from 'vue'

const inf = ref({
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
  id: '', // 进件ID, 有则传, 没有则不传
  next: true, // 是否为下一步
  orderId: '', // 订单ID
})

const columns = ref([
  { text: '杭州', value: 'Hangzhou' },
  { text: '宁波', value: 'Ningbo' },
  { text: '温州', value: 'Wenzhou' },
  { text: '绍兴', value: 'Shaoxing' },
  { text: '湖州', value: 'Huzhou' },
])

const showPicker = ref(false)
const showCalendar = ref(false)
const selectKey = ref('')
const select = (type = '', key = '') => {
  if (type === 'calendar') {
    showCalendar.value = true
  }
  if (type === 'picker') {
    showPicker.value = true
  }
  selectKey.value = key
}

const onConfirm = (e: any) => {
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:e`, e)
  // inf[showCalendarKey.value] =
}

const onSubmit = () => {}
</script>
<style lang="scss" scoped></style>
