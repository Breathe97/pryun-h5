<template>
  <router-view v-slot="{ Component, route }">
    <Transition :name="transitionName">
      <KeepAlive :include="KeepRoutes">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </Transition>
  </router-view>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const KeepRoutes = computed(() => {
  return []
  // let arr: any = Array.from(keepRoutes.value, (item) => item.name)
  // return arr
})

const transitionName = ref('')

router.beforeEach((to, from, next) => {
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:from`, from, to)
  const { zIndex: from_meta_zIndex = 99, animationTypes: from_animationTypes = { in: 'pop-from-right', out: 'pop-from-left' } } = from.meta || {}
  const { zIndex: to_meta_zIndex = 99, animationTypes: to_animationTypes = { in: 'pop-from-right', out: 'pop-from-left' } } = to.meta || {}

  const zIndexOffset = to_meta_zIndex - from_meta_zIndex
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:zIndexOffset`, zIndexOffset)

  // 进入下级页面时的过渡动画
  transitionName.value = to_animationTypes.in

  // 返回上级页面时的过渡动画
  if (zIndexOffset < 0) {
    transitionName.value = to_animationTypes.out === 'none' ? from_animationTypes.out : to_animationTypes.out
  }
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:to, from`, from, to)
  next()
})
</script>
<style scoped>
/* 页面从右侧挤入 */
.pop-from-right-enter-active,
.pop-from-right-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: all 0.5s ease;
}
.pop-from-right-enter-from {
  transform: translateX(100%);
}
.pop-from-right-leave-to {
  transform: translateX(-100%);
}

/* 页面从左侧进入 */
.pop-from-left-enter-active,
.pop-from-left-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: all 0.5s ease;
}
.pop-from-left-enter-from {
  transform: translateX(-100%);
}
.pop-from-left-leave-to {
  transform: translateX(100%);
}

/* 新窗体从透明到不透明逐渐显示 */
.fade-in-enter-active,
.fade-in-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: all 0.5s ease;
}
.fade-in-enter-from {
  opacity: 0;
}
.fade-in-leave-to {
  opacity: 0;
}
</style>
