<template>
  <div class="forms-qyjj">
    <stepsVue v-model="stepsIndex" :list="stepsList"> </stepsVue>
    <div class="form-content">
      <tipVue title="请仔细填写以下信息" rightBtnText="查看示例" @rightClick="rightClick"> </tipVue>
      <stepItem1Vue v-if="stepsIndex === 0"> </stepItem1Vue>
      <stepItem2Vue v-if="stepsIndex === 1"> </stepItem2Vue>
      <stepItem3Vue v-if="stepsIndex === 2"> </stepItem3Vue>
      <div style="margin-top: 20px; display: flex; gap: 20px">
        <van-button v-if="stepsIndex > 0" round block type="default" native-type="submit" @click="stepsIndex -= 1"> 上一步 </van-button>
        <van-button v-if="stepsIndex < stepsList.length - 1" round block type="primary" native-type="submit" @click="stepsIndex += 1"> 下一步 </van-button>
        <van-button v-if="stepsIndex === stepsList.length - 1" round block type="primary" native-type="submit" @click="onSubmit"> 预览 </van-button>
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

const stepsIndex = ref(0)
const stepsList = ref(['债务人信息', '企业简介', '债务信息'])

const inf = ref({
  username: '',
  password: '',
})

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
