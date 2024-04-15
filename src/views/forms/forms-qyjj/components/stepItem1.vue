<template>
  <cardVue :collapse="false" title="基础信息">
    <van-form ref="vanFormRef" required="auto" label-width="120">
      <van-cell-group inset>
        <van-field maxlength="200" v-model="inf.companyName" name="提交机构" label="提交机构" placeholder="请输入提交机构" :rules="[{ required: true, message: '请填写提交机构' }]" />
        <van-field maxlength="200" v-model="inf.companyAddr" name="机构地址" label="机构地址" placeholder="机构地址（省/市/区/门牌号）" :rules="[{ required: true, message: '请填写机构地址' }]" />
        <van-field maxlength="20" v-model="inf.corpUser" name="机构联系人" label="机构联系人" placeholder="请输入机构联系人" :rules="[{ required: true, message: '请填写机构联系人' }]" />
        <van-field type="tel" v-model="inf.contactMobile" name="联系人电话" label="联系人电话" placeholder="请输入联系人电话" :rules="rules.mobile" />
        <van-field maxlength="200" v-model="inf.companyName" name="项目单位名称" label="项目单位名称" placeholder="请输入项目单位名称" :rules="[{ required: true, message: '请填写项目单位名称' }]" />
        <van-field maxlength="200" v-model="inf.companyAddr" name="项目地址" label="项目地址" placeholder="项目地址（省/市/区/门牌号）" :rules="[{ required: true, message: '请填写项目地址' }]" />
        <van-field maxlength="20" v-model="inf.corpUser" name="法人/实际控制人" label="法人/实际控制人" placeholder="请输入法人/实际控制人" :rules="[{ required: true, message: '请填写法人/实际控制人' }]" />
        <van-field type="tel" v-model="inf.contactMobile" name="联系方式" label="联系方式" placeholder="请输入联系方式" :rules="rules.mobile" />
        <PrSelectVanField v-model="inf.corpCredit" :columns="dictConfigRes.corpCredit" is-link readonly name="股权情况" label="股权情况" placeholder="点击选择股权情况" :rules="[{ required: true, message: '请填写股权情况' }]" />
        <PrSelectVanField v-model="inf.corpCredit" :columns="dictConfigRes.corpCredit" is-link readonly name="土地性质" label="土地性质" placeholder="点击选择土地性质" :rules="[{ required: true, message: '请填写土地性质' }]" />
        <PrSelectVanField v-model="inf.corpCredit" :columns="dictConfigRes.corpCredit" is-link readonly name="土地使用性质" label="土地使用性质" placeholder="点击选择土地使用性质" :rules="[{ required: true, message: '请填写土地使用性质' }]" />
        <PrSelectVanField v-model="inf.corpCredit" :columns="dictConfigRes.corpCredit" is-link readonly name="土地面积" label="土地面积" placeholder="点击选择土地面积" :rules="[{ required: true, message: '请填写土地面积' }]" />
        <van-field maxlength="200" v-model="inf.companyName" name="土地所属单位" label="土地所属单位" placeholder="请输入土地所属单位" :rules="[{ required: true, message: '请填写土地所属单位' }]" />
        <PrSelectVanField v-model="inf.corpCredit" :columns="dictConfigRes.corpCredit" is-link readonly name="企业建筑物性质" label="企业建筑物性质" placeholder="点击选择企业建筑物性质" :rules="[{ required: true, message: '请填写企业建筑物性质' }]" />
        <van-field maxlength="200" v-model="inf.companyName" name="产权人" label="产权人" placeholder="请输入产权人" :rules="[{ required: true, message: '请填写产权人' }]" />
        <PrSelectVanField v-model="inf.corpCredit" :columns="dictConfigRes.corpCredit" is-link readonly name="公司目前情况" label="公司目前情况" placeholder="点击选择公司目前情况" :rules="[{ required: true, message: '请填写公司目前情况' }]" />
        <PrSelectVanField v-model="inf.corpCredit" :columns="dictConfigRes.corpCredit" is-link readonly name="司法类别" label="司法类别" placeholder="点击选择司法类别" :rules="[{ required: true, message: '请填写司法类别' }]" />
        <PrSelectVanField v-model="inf.corpCredit" :columns="dictConfigRes.corpCredit" is-link readonly name="目前营业额(年)" label="目前营业额(年)" placeholder="点击选择目前营业额(年)" :rules="[{ required: true, message: '请填写目前营业额(年)' }]" />
        <van-field maxlength="200" v-model="inf.companyName" name="租赁比(年)" label="租赁比(年)" placeholder="请输入租赁比(年)" :rules="[{ required: true, message: '请填写租赁比(年)' }]" />
        <van-field type="number" maxlength="12" v-model="inf.corpCredit" name="租赁金额(年)" label="租赁金额(年)" placeholder="请输入租赁金额(年)" :rules="[{ required: true, message: '请填写租赁金额(年)' }]">
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
import { dictConfigRes, getDetail, throttle, rules } from '../../static/index'

const vanFormRef = ref()

const props = defineProps({
  orderDetail: {
    type: [Object],
    require: true,
    default: () => {}
  }
})

const inf: any = ref({
  companyAddr: '', // 机构地址
  companyCreditCode: '', // 统一社会信用代码
  companyName: '', // 提交机构
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
  (a, b) => b.id && throttle(save, 500),
  { deep: true }
)

defineExpose({ save, validate })
</script>
<style lang="scss" scoped></style>
