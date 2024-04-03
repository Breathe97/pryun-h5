<template>
  <div class="page-view">
    <div class="page-view-navbar">
      <slot name="navbar"></slot>
    </div>
    <div class="page-view-content">
      <slot></slot>
    </div>
    <div class="page-view-tabbar">
      <slot name="tabbar"></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.page-view {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: red;
  // transform: scale(1);
}
.page-view-navbar {
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  transform: scale(1);
}
.page-view-content {
  min-height: 100%;
  flex: 1;
}
.page-view-tabbar {
  width: 100%;
  // transform: scale(1);
}
</style>
