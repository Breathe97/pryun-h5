<template>
  <div class="login">
    <van-nav-bar :left-arrow="true" @click-left="$router.back()" title="登录" :fixed="true" :placeholder="true" :safe-area-inset-top="true" />
    <div style="height: 200px; display: flex; align-items: center; justify-content: center">{{ aaa }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onActivated } from 'vue'

const active = ref(0)
// const inf = ref({
//   mode: 'login', // loginBySms
//   sysType: 1,
//   account: '', // 账号（用户名/手机号/邮箱）
//   password: '', // 密码
//   mobile: '', // 手机号码
//   smsCode: '', // 短信验证码
// })

// // 使用测试账号
// const useTest = () => {
//   inf.value.mode = 'login'
//   inf.value.account = 'admin'
//   inf.value.password = '123456'
// }
const aaa = ref(new Date().getTime())

onActivated(() => {
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:onActivated`)
})
</script>
<style lang="scss" scoped></style>
