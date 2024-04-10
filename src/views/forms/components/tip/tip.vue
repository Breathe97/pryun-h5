<template>
  <div v-if="title || rightBtnText" class="tips">
    <div class="tip-text">{{ title }}</div>
    <div class="right-text" @click="emit('rightClick')">{{ rightBtnText }}</div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['rightClick'])
defineProps({
  title: {
    type: [String],
    default: () => '请仔细填写以下信息',
  },
  rightBtnText: {
    type: [String],
    default: () => '查看示例',
  },
})
</script>
<style lang="scss" scoped>
.tips {
  padding: 0 12px;
  height: 40px;
  display: flex;
  align-items: center;
  .tip-text {
    flex: 1;
    color: rgba(153, 153, 153, 1);
  }
  .right-text {
    color: rgba(74, 199, 74, 1);
  }
}
</style>
