<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <div class="aaaa" style="">content</div>
    <van-tabbar v-model="active" placeholder>
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
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
