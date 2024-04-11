<template>
  <div class="forms-qyjj">
    <van-overlay :show="!stepItemShow" z-index="99">
      <div style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center"><van-loading size="24px" vertical>加载中...</van-loading></div>
      <!-- <div style="height: 100%; width: 100%;background-color: red"><van-loading type="spinner" size="24px" /></div> -->
    </van-overlay>
    <div v-if="[0, 1, 2].includes(stepsIndex)" class="steps">
      <stepsVue v-model="stepsIndex" :list="stepsList" @change="(index) => stepClick(index)"> </stepsVue>
    </div>
    <div class="form-content">
      <tipVue v-if="[0, 1, 2].includes(stepsIndex)" title="请仔细填写以下信息" rightBtnText="查看示例" @rightClick="rightClick"> </tipVue>
      <template v-if="stepItemShow">
        <stepItemRes v-if="stepsIndex === -1"> </stepItemRes>
        <stepItem1Vue ref="stepItem1VueRef" v-if="stepsIndex === 0" :orderDetail="orderDetail"> </stepItem1Vue>
        <stepItem2Vue ref="stepItem2VueRef" v-if="stepsIndex === 1" :orderDetail="orderDetail"> </stepItem2Vue>
        <stepItem3Vue ref="stepItem3VueRef" v-if="stepsIndex === 2" :orderDetail="orderDetail" @checkedChange="(e) => (checked = e)"> </stepItem3Vue>
        <stepItemPreviewVue ref="stepItemPreviewVueRef" v-if="stepsIndex === 3" :orderDetail="orderDetail"> </stepItemPreviewVue>
      </template>
    </div>
    <div style="margin-top: 20px; display: flex; gap: 20px">
      <van-button v-if="stepsIndex > 0" round block type="default" native-type="submit" @click="stepClick(stepsIndex - 1)"> 上一步 </van-button>
      <van-button v-if="stepsIndex < stepsList.length - 1 && stepsIndex !== -1" round block type="primary" native-type="submit" @click="stepClick(stepsIndex + 1)"> 下一步 </van-button>
      <van-button v-if="stepsIndex === stepsList.length - 1" round block type="primary" native-type="submit" @click="preview"> 预览 </van-button>
      <van-button v-if="stepsIndex === 3" round block type="primary" native-type="submit" @click="onSubmit"> 提交 </van-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import previewImg from './static/img_forms-qyjj-preview.png'
import { showImagePreview, showToast } from 'vant'
import stepsVue from '../components/steps/steps.vue'
import tipVue from '../components/tip/tip.vue'
import stepItemRes from './components/stepItemRes.vue'
import stepItem1Vue from './components/stepItem1.vue'
import stepItem2Vue from './components/stepItem2.vue'
import stepItem3Vue from './components/stepItem3.vue'
import stepItemPreviewVue from './components/stepItem-preview.vue'
import { ref, computed } from 'vue'
import * as api from '@/api/modules/forms_qyjj'
import { getDetail, dictConfigGet } from '../static/index'

const stepsList = ref(['债务人信息', '企业简介', '债务信息'])
// const stepsList = ref(['债务人信息', '企业简介', '债务信息', '预览'])

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
  let obj = { last: false, next: false, showErrMsg: false } // 上一步？下一步/是否显示服务端错误信息

  // 上一步
  if (newIndex < stepsIndex.value) {
    obj['last'] = true
  }

  // 下一步 需要校验表单
  if (newIndex > stepsIndex.value) {
    obj['showErrMsg'] = true
    obj['next'] = true
    const validateFuncs = [stepItem1VueRef.value?.validate, stepItem2VueRef.value?.validate, stepItem3VueRef.value?.validate]
    let validateFunc = validateFuncs[stepsIndex.value] // 校验订单的方法
    try {
      await validateFunc() // 校验表单
    } catch (error) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:error`, error)
      return showToast({ message: '请先完成当前表单内容。' }) // 表单校验失败阻止当前切换
    }
  }

  // 校验成功往下走
  // 所有表单实例的保存方法
  const saveFuncs = [stepItem1VueRef.value?.save, stepItem2VueRef.value?.save, stepItem3VueRef.value?.save]

  let saveFunc = saveFuncs[stepsIndex.value] // 保存订单的方法
  if (!saveFunc) {
    stepsIndex.value = newIndex
    return
  }
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:newIndex`, newIndex, obj)
  await saveFunc(obj).then(() => {
    stepsIndex.value = newIndex
  })
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
    // stepsIndex.value = -1
  })
  await dictConfigGet()
  stepItemShow.value = true
}
orderDetailGet()

// 查看示例
const rightClick = () => {
  showImagePreview(['https://hbzx-shop.oss-cn-chengdu.aliyuncs.com/fkys/company.png'])
}

const preview = () => {
  if (!checked.value) return showToast({ message: '请确认承诺后进行下一步。' }) // 表单校验失败阻止当前切换
  stepClick(3)
}
const onSubmit = () => {
  // 查询当前进件步骤
  const { caseInId = '' } = orderDetail.value
  api.submitPost({ params: { caseInId } }).then((res) => {
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
    const { code = 0, message = '网络繁忙', data } = res
    if (code !== 200) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:err`, res)
      return showToast({ message }) // 表单校验失败阻止当前切换
    }
    stepsIndex.value = -1
  })
}
</script>
<style lang="scss" scoped>
.forms-qyjj {
  position: relative;
  padding: 12px;
}
.form-content {
  flex: 1;
  min-height: 80vh;
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
