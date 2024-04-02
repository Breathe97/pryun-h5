<template>
  <div class="login">
    <van-nav-bar :left-arrow="true" @click-left="$router.back()" title="登录" :fixed="true" :placeholder="true" :safe-area-inset-top="true" />
    <div class="aaaa" style="">content</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

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
</script>
<style lang="scss" scoped>
.aaaa {
  height: 200px;
  width: 100%;
}
</style>
