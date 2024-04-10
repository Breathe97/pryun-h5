<template>
  <div class="steps">
    <div v-for="(item, index) in list" :key="index" @click="changeIndex(index)" class="step-item" :class="[{ 'step-item-active': index === modelValue }]">
      <div class="index">{{ index + 1 }}</div>
      <div class="name">{{ item }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
  modelValue: {
    type: [Number],
    required: true,
    default: () => 0,
  },
  list: {
    type: [Array<String>],
    default: () => ['步骤一', '步骤二', '步骤三'],
  },
})

const changeIndex = (index = 0) => {
  emit('change', index)
  emit('update:modelValue', index)
}
</script>
<style lang="scss" scoped>
.steps {
  padding: 20px;
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 8px;
  .step-item {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .index {
      position: relative;
      width: 18px;
      height: 18px;
      background-color: rgba(178, 187, 190, 1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 1);
      z-index: 1;
    }
    .index-active {
      background-color: #4ac74a;
    }
    .name {
      height: 30px;
      line-height: 30px;
      color: rgba(153, 153, 153, 1);
    }
  }
  .step-item + .step-item {
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: -30px;
      bottom: 0;
      margin: auto;
      width: 100%;
      height: 1px;
      transform: translateX(-50%);
      background-image: linear-gradient(to right, rgba(170, 177, 183, 1) 35%, rgba(255, 255, 255, 0) 0%);
      background-size: 10px 1px;
      background-repeat: repeat-x;
    }
  }
  .step-item-active {
    .index {
      background-color: #4ac74a;
    }
    .name {
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>
