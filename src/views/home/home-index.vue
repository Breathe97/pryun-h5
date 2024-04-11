<template>
  <PrPageView class="home-index">
    <template #navbar>
      <van-nav-bar title="首页" :safe-area-inset-top="true" />
    </template>
    <div class="content">
      <div style="height: 200px; background-color: red">{{ aaa }}</div>
      <div style="height: 200px; background-color: rgb(255, 238, 0)" @click="router.push({ path: '/login-index', query: { type: 1 } })">登录页面</div>
      <div style="height: 200px; background-color: rgb(98, 0, 255)" @click="router.push({ path: '/forms-index', query })">表单页面</div>
      <div style="height: 200px; background-color: rgb(98, 0, 255)" @click="router.push({ path: '/forms-index', query: query2 })">表单页面空白</div>
      <div style="height: 200px; background-color: red"></div>
      <div style="height: 200px; background-color: rgb(88, 156, 81)"></div>
      <div style="height: 200px; background-color: red"></div>
      <div style="height: 200px; background-color: rgb(46, 16, 16)"></div>
      <div style="height: 200px; background-color: rgb(98, 0, 255)"></div>
    </div>
    <template #tabbar>
      <van-tabbar v-model="active" :safe-area-inset-bottom="true">
        <van-tabbar-item icon="home-o">标签1</van-tabbar-item>
        <van-tabbar-item icon="search">标签2</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签3</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签4</van-tabbar-item>
      </van-tabbar>
    </template>
  </PrPageView>
</template>
<script lang="ts" setup>
import { ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const active = ref(0)

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJwayI6IjE3Njc4NjMwOTAxNDAwMzcxMjAiLCJ0eXBlIjoiU0hPUCIsInRlbmFudElkIjpudWxsLCJuYW1lIjoi6ZW_5a2Z5pePIiwiaW1Vc2VySWQiOm51bGwsImV4cCI6MTcxMzQyNjU5OX0.g5hS_7-so2dFNd4M-1jJ0hWMjN1UzHKKKe_yJhMV6IVUltaDMhGDSnTKkeN-xaclYtklOJdgoY1AC3PRVdBgHg'

const query = ref({ token, orderId: '1777887985072181248', navbar: 'show' })
const query2 = ref({ token, orderId: '1778330146022064128', navbar: 'show' })

const aaa = ref(new Date().getTime())

onActivated(() => {
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:onActivated`)
})
</script>
<style lang="scss" scoped>
.home-index {
  position: relative;
  display: flex;
  flex-direction: column;

  .content {
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
