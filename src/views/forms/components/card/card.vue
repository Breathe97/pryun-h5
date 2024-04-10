<template>
  <div class="card">
    <div v-if="title" class="card-title" @click="isCollapse = !isCollapse">
      <div v-if="leftIconClick" class="left-icon" @click.stop.prevent="leftIconClick && leftIconClick()"></div>
      <div class="title-text">{{ title }}</div>
      <div v-if="collapse" class="title-collapse">
        <span style="margin-right: 2px">{{ isCollapse ? '收起' : '展开' }}</span>
        <van-icon :name="isCollapse ? 'arrow-up' : 'arrow-down'" />
      </div>
    </div>
    <div class="card-content" :style="[Style_cardContent]">
      <div class="card-content-view" ref="cardContentViewRef">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
const props = defineProps({
  title: {
    type: [String],
    default: () => '表单标题',
  },
  collapse: {
    type: [Boolean],
    default: () => true,
  },
  leftIconClick: {
    type: [Function],
    default: () => undefined,
  },
})

const cardContentViewRef = ref()

const isCollapse = ref(true)

const cardContentHight = ref(0)

const first = ref(true) // 主要解决第一次进入的时候页面不需要过渡

const Style_cardContent = computed(() => {
  if (!cardContentViewRef.value || !props.collapse || first.value) return {}
  let style = { height: `${cardContentHight.value}px`, transition: 'height 300ms ease-out' }
  if (!isCollapse.value) {
    style['height'] = '0px'
  }
  return style
})

let observer: ResizeObserver
onMounted(async () => {
  // 实时校准布局 额外添加监听器
  if (props.collapse) {
    const initOptions = () => {
      cardContentHight.value = cardContentViewRef.value.offsetHeight
      first.value = false
    }
    // 创建dom监听
    const createObserver = () => {
      observer = new ResizeObserver(initOptions)
      observer.observe(cardContentViewRef.value, { box: 'border-box' })
    }
    createObserver()
  }
})

onBeforeUnmount(() => {
  if (props.collapse) {
    observer.disconnect()
  }
})
</script>
<style lang="scss" scoped>
.card {
  padding: 10px 0;
  background-color: #ffffff;
  border-radius: 8px;

  .card-title {
    padding: 0 12px;
    height: 40px;
    display: flex;
    align-items: center;
    .left-icon {
      margin-right: 10px;
      position: relative;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: #ff911a;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 60%;
        height: 2px;
        border-radius: 1px;
        background-color: #ffffff;
      }
    }
    .title-text {
      flex: 1;
      font-size: 16px;
    }
    .title-collapse {
      opacity: 0.7;
    }
  }
  .card-content {
    position: relative;
    overflow: hidden;
  }
}
</style>
