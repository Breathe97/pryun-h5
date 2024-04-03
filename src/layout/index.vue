<template>
  <div class="layout-page">
    <router-view v-slot="{ Component, route }">
      <Transition :name="route.meta.transition || 'fade'">
        <KeepAlive :include="KeepRoutes">
          <component :is="Component" :key="route.fullPath" />
        </KeepAlive>
      </Transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const KeepRoutes = computed(() => {
  let arr: any = []
  for (const route of router.options.routes) {
    if (route.meta?.keepAlive) {
      arr.push(route.name)
    }
  }
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:arr`, arr)
  return arr
})
</script>
<style scoped>
@import url('./static/fade.css');
@import url('./static/slide-left.css');
@import url('./static/slide-right.css');

.layout-page {
  position: relative;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
}
</style>
