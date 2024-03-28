<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="transitionName" mode="out-in">
      <KeepAlive :include="KeepRoutes">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </transition>
  </router-view>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'

const transitionName = ref('fade')

const KeepRoutes = computed(() => {
  return []
  // let arr: any = Array.from(keepRoutes.value, (item) => item.name)
  // return arr
})
</script>
<style scoped>
.content-view {
  position: relative;
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  height: fit-content;
}

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
  transition: all 500ms cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from {
  transform: translateX(-40px);
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
