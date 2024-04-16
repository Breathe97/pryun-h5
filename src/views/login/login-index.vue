<template>
  <PrPageView class="login-index">
    <template #navbar>
      <van-nav-bar :left-arrow="true" @click-left="$router.back()" title="登录" :safe-area-inset-top="true" />
    </template>
    <div style="height: 200px; display: flex; align-items: center; justify-content: center">{{ aaa }}</div>
    <div style="height: 200px; background-color: rgb(46, 16, 16)"></div>
    <div style="height: 200px; display: flex; align-items: center; justify-content: center" @click="login">使用测试账号登录</div>
    <div style="height: 200px; background-color: rgb(98, 0, 255)"></div>
  </PrPageView>
</template>
<script lang="ts" setup>
import { ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import * as authApi from '@/api/modules/auth'
import { StoreUser } from '@/store/user'

const storeUser = StoreUser()

const router = useRouter()

const active = ref(0)
const inf = ref({
  mode: 'login', // loginBySms
  sysType: 1,
  account: '', // 账号（用户名/手机号/邮箱）
  password: '', // 密码
  mobile: '', // 手机号码
  smsCode: '', // 短信验证码
  uniqueCode: '' // 设备唯一码
})

// 使用测试账号
const useTest = () => {
  inf.value.mode = 'login'
  inf.value.account = '15983966644'
  inf.value.password = '7777777zp'
}
const aaa = ref(0)

onActivated(() => {
  aaa.value = new Date().getTime()
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:onActivated`, aaa.value)
})

const login = () => {
  useTest()
  let obj = JSON.parse(JSON.stringify(inf.value))
  authApi.login({ data: obj }).then((res) => {
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
    storeUser.setToken(res.data.accessToken)
    storeUser.usersGetInfo()
    router.back()
  })
}
</script>
<style lang="scss" scoped>
.login-index {
  min-height: 100vh;
  background-color: red;
}
</style>
