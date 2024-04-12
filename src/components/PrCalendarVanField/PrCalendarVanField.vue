<template>
  <div class="pr-calendar-van-field">
    <van-field v-bind="attrs" @click="open" v-model="inValue"> </van-field>
    <template v-if="visible">
      <van-calendar v-model:show="showCalendar" :min-date="new Date('1970/01/01')" :max-date="new Date()" @confirm="selectConfirm" @unselect="close" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { timeFormat } from 'pr-tools'

import { ref, watch, computed, nextTick, useAttrs } from 'vue'

const attrs = useAttrs()

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String],
    require: true,
    default: () => '',
  },
})

const visible = ref(false)
const showCalendar = ref(false)

const open = async () => {
  visible.value = true
  await nextTick()
  showCalendar.value = true
}

const close = async () => {
  showCalendar.value = false
  await nextTick()
  setTimeout(() => {
    visible.value = false
  }, 500)
}

const inValue = ref('')
const selectConfirm = (e: any) => {
  let str = timeFormat(e, 'yyyy-mm-dd')
  emit('update:modelValue', str)
  close()
}

const init = async (newProps: any = {}) => {
  await nextTick()
  inValue.value = newProps.modelValue
}

const propsObj = computed(() => {
  const { modelValue } = props
  return { modelValue }
})

// 监听 props变化后对组件内数据进行初始化
watch(
  () => propsObj.value,
  (a) => init(a),
  {
    immediate: true,
  }
)
</script>
