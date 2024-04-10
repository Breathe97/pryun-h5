<template>
  <PrPageView class="forms-index pr-form">
    <template v-if="showNavbar" #navbar>
      <van-nav-bar :left-arrow="true" @click-left="back" :title="Title" :safe-area-inset-top="true" />
    </template>
    <div class="content">
      <formsQyjjVue></formsQyjjVue>
    </div>
    <div class="safe-area-inset-bottom"></div>
  </PrPageView>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { form_types } from './static/index'
import type { Type_form_types } from './static/index'
import formsQyjjVue from './forms-qyjj/forms-qyjj.vue'
import * as web from '@/tools/uni.webview.1.5.4.js'

const router = useRouter()
const route = useRoute()
const webview = web.webView

const form_type = ref<Type_form_types>('qyjj')

const Title = computed(() => {
  let { name = '表单录入' } = form_types.find((item) => item.key === form_type.value) || {}
  return name
})

const showNavbar = ref(true)
const init = () => {
  const { navbar = '' } = route.query
  if (navbar === 'hide') {
    showNavbar.value = false
  }
  let { name = '表单录入' } = form_types.find((item) => item.key === form_type.value) || {}
  document.title = name
}
init()

const back = () => {
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:back`)
  let obj = { type: 'back', text: '' }
  // try {
  //   webview.navigateBack({ delta: 2 })
  // } catch (error) {
  //   alert(error)
  // }
  try {
    let parent = window.parent
    alert(JSON.stringify(parent))
  } catch (error) {
    alert(error)
  }

  try {
    window.postMessage(JSON.stringify(obj), '*')
  } catch (error) {
    alert(error)
  }
  router.back()
}

// const
</script>
<style lang="scss" scoped>
.forms-index {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(244, 244, 244, 1);
  --van-cell-group-inset-padding: 0;
  --van-button-border-width: 0;
  --van-button-primary-background: rgba(74, 199, 74, 1);
}
.van-field__label--required::before {
  position: absolute;
}
</style>
