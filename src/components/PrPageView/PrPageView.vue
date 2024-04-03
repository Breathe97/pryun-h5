<template>
  <div>
    <div ref="pageViewRef" class="page-view">
      <div class="page-view-navbar">
        <slot name="navbar"></slot>
      </div>
      <div class="page-view-content">
        <slot></slot>
      </div>
      <!-- <div class="page-view-tabbar" :style="[{ top: `${ 300}px` }]"> -->
      <div class="page-view-tabbar">
        <slot name="tabbar"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const pageViewRef = ref()

</script>
<style scoped lang="scss">
.page-view {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #0097ff;
}
.page-view-navbar {
  position: sticky;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  transform: scale(1);
  z-index: 9;
}
.page-view-content {
  min-height: 100%;
  flex: 1;
  z-index: 1;
}
.page-view-tabbar {
  position: sticky;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  transform: scale(1);
  z-index: 9;
}
</style>
