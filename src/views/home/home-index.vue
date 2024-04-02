<template>
  <div class="page">
    <van-nav-bar title="首页" :fixed="true" :placeholder="true" />
    <div class="page-content">
      <div style="height: 200px; background-color: red">2222</div>
      <div style="height: 200px; background-color: rgb(255, 238, 0)" @click="router.push({ path: '/login' })">登录</div>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const active = ref(0)
</script>
<style lang="scss" scoped></style>
