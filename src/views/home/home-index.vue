<template>
  <div class="page">
    <van-nav-bar title="首页" :fixed="true" :placeholder="true" :safe-area-inset-top="true" />
    <div class="page-content">
      <div style="height: 200px; background-color: red">{{ aaa }}</div>
      <div style="height: 200px; background-color: rgb(255, 238, 0)" @click="router.push({ path: '/login-index' })">登录页面</div>
      <div style="height: 200px; background-color: red"></div>
      <div style="height: 200px; background-color: rgb(88, 156, 81)"></div>
      <div style="height: 200px; background-color: red"></div>
      <div style="height: 200px; background-color: rgb(46, 16, 16)"></div>
      <div style="height: 200px; background-color: rgb(98, 0, 255)"></div>
    </div>
    <van-tabbar v-model="active" :fixed="true" :placeholder="true">
      <van-tabbar-item icon="home-o">标签1</van-tabbar-item>
      <van-tabbar-item icon="search">标签2</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签3</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签4</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts" setup>
import { ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const active = ref(0)

const aaa = ref(new Date().getTime())

onActivated(() => {
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:onActivated`)
})

// const
</script>
<style lang="scss" scoped>
.page-content {
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
