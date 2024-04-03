<template>
  <div class="layout-page">
    <router-view v-slot="{ Component, route }">
      <KeepAlive :include="KeepRoutes">
        <Transition :name="route.meta.transition || 'fade'">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </KeepAlive>
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

router.beforeEach((to, from, next) => {
  const toDepth = to.meta.zIndex || 99
  const fromDepth = from.meta.zIndex || 99
  const isAbove = toDepth - fromDepth
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:isAbove`, isAbove)
  if (isAbove === 0) {
    to.meta.transition = 'fade'
  } else if (isAbove > 0) {
    to.meta.transition = 'slide-right'
    from.meta.transition = 'slide-left'
  } else {
    to.meta.transition = 'slide-left'
    from.meta.transition = 'slide-right'
  }
  next()
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
