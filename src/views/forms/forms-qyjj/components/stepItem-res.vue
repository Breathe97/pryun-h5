<template>
  <div class="step-item-res">
    <div class="icon"><van-icon name="checked" size="48" color="rgba(74, 199, 74, 1)" /></div>
    <div class="title">提交成功</div>
    <div class="tip">您提交的进件信息已提交成功</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
</script>
<style lang="scss" scoped>
.step-item-res {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    line-height: 80px;
    font-size: 16px;
    font-weight: bold;
  }
  .tip {
    color: #999999;
  }
}
</style>
