<template>
  <PrPageView class="forms-index pr-form">
    <template v-if="showNavbar" #navbar>
      <van-nav-bar :left-arrow="true" :title="Title" :safe-area-inset-top="true" />
    </template>
    <div class="content">
      <formsQyjjVue :orderId="orderId"></formsQyjjVue>
    </div>
    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
  </PrPageView>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { form_types } from './static/index'
import type { Type_form_types } from './static/index'
import formsQyjjVue from './forms-qyjj/forms-qyjj.vue'
import { StoreUser } from '@/store/user'

const storeUser = StoreUser()

const route = useRoute()

const form_type = ref<Type_form_types>('qyjj')

const orderId = ref('')
const showNavbar = ref(true)
const init = () => {
  const { token = '', orderId: id, navbar } = route.query
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:{ token, orderId, navbar }`, { token, orderId, navbar })
  if (navbar === 'hide') {
    showNavbar.value = false
  }
  let { name = '表单录入' } = form_types.find((item) => item.key === form_type.value) || {}
  document.title = name
  // 对query参数进行处理 加载用户登录信息
  storeUser.setToken(token as string)
  storeUser.usersGetInfo()
  orderId.value = id as string
}
init()

const Title = computed(() => {
  let { name = '表单录入' } = form_types.find((item) => item.key === form_type.value) || {}
  return name
})
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
