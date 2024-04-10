<template>
  <div class="forms-qyjj">
    <stepsVue v-model="stepsIndex" :list="stepsList" @change="(index) => stepClick(index)"> </stepsVue>
    <div class="form-content">
      <tipVue title="请仔细填写以下信息" rightBtnText="查看示例" @rightClick="rightClick"> </tipVue>
      <template v-if="stepItemShow">
        <stepItem1Vue ref="stepItem1VueRef" v-if="stepsIndex === 0" :orderDetail="orderDetail"> </stepItem1Vue>
        <stepItem2Vue ref="stepItem2VueRef" v-if="stepsIndex === 1" :orderDetail="orderDetail"> </stepItem2Vue>
        <stepItem3Vue ref="stepItem3VueRef" v-if="stepsIndex === 2" :orderDetail="orderDetail" @checkedChange="(e) => (checked = e)"> </stepItem3Vue>
      </template>
      <div style="margin-top: 20px; display: flex; gap: 20px">
        <van-button v-if="stepsIndex > 0" round block type="default" native-type="submit" @click="stepClick(stepsIndex - 1)"> 上一步 </van-button>
        <van-button v-if="stepsIndex < stepsList.length - 1" round block type="primary" native-type="submit" @click="stepClick(stepsIndex + 1)"> 下一步 </van-button>
        <van-button v-if="stepsIndex === stepsList.length - 1" round block type="primary" native-type="submit" :disabled="!checked" @click="onSubmit"> 预览 </van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import stepsVue from '../components/steps/steps.vue'
import tipVue from '../components/tip/tip.vue'
import stepItem1Vue from './components/stepItem1.vue'
import stepItem2Vue from './components/stepItem2.vue'
import stepItem3Vue from './components/stepItem3.vue'
import { ref, computed } from 'vue'
import * as api from '@/api/modules/forms_qyjj'
import { getDetail, dictConfigGet } from '../static/index'

const stepsList = ref(['债务人信息', '企业简介', '债务信息'])

const props = defineProps({
  orderId: {
    type: [String],
    require: true,
    default: () => '',
  },
})

const stepItem1VueRef = ref()
const stepItem2VueRef = ref()
const stepItem3VueRef = ref()

const stepsIndex = ref(0)
const checked = ref(false)

const stepClick = async (newIndex = 0) => {
  // 切换到指定index
  let obj = { last: false, next: false } // 上一步？下一步
  if (newIndex < stepsIndex.value) {
    obj['last'] = true
  }
  if (newIndex > stepsIndex.value) {
    obj['next'] = true
  }
  // 保存订单
  let saveFunc = null
  switch (stepsIndex.value) {
    case 0:
      saveFunc = stepItem1VueRef.value?.save
      break
    case 1:
      saveFunc = stepItem2VueRef.value?.save
      break
    case 2:
      saveFunc = stepItem3VueRef.value?.save
      break
  }
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:newIndex`, newIndex, obj)
  // 如果保存的方法存在
  if (saveFunc) {
    await saveFunc(obj) // 保存并校验
  }
  stepsIndex.value = newIndex
}

const stepItemShow = ref(false)
const orderDetail = ref({ caseInId: '' })
// 获取订单详情 这里只用于区分当前用户应该继续填写第几步
const orderDetailGet = async () => {
  await api.orderDetailGet({ params: { orderId: props.orderId } }).then((res) => {
    const { code = 0, message, data } = res
    if (code !== 200) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:err`, res)
      return
    }
    const { order = {} } = data
    orderDetail.value = order
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
  })
  // 查询当前进件步骤
  const { caseInId = '' } = orderDetail.value
  await getDetail(caseInId, ['status']).then((res: any) => {
    const { status = '' } = res || {}
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:status`, status)
    let num = status.replace('STEP', '')
    stepsIndex.value = Math.max(num - 1, 0)
  })
  await dictConfigGet()
  stepItemShow.value = true
}
orderDetailGet()

const rightClick = () => {}
const onSubmit = () => {}
</script>
<style lang="scss" scoped>
.forms-qyjj {
  position: relative;
  padding: 12px;
}
.form-content {
  .form-content-tips {
    padding: 0 12px;
    height: 40px;
    display: flex;
    align-items: center;
    .tip-text {
      flex: 1;
      color: rgba(153, 153, 153, 1);
    }
    .right-text {
      color: rgba(74, 199, 74, 1);
    }
  }
  .card {
    background-color: #ffffff;
    border-radius: 8px;
    .card-title {
      padding: 0 12px;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
