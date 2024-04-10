<template>
  <div class="signature-view" :class="[{ 'signature-view-show': visible }]">
    <!-- <div class="mask" :></div> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const pageViewRef = ref()

const visible = ref(false)
const show = async () => {
  return new Promise((resolve, reject) => {})
}

defineExpose({ show })
</script>
<style scoped lang="scss">
.signature-view {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
