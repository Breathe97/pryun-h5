<template>
  <div class="pr-calendar-van-field">
    <van-field v-bind="attrs" @click="open" v-model="inValue"> </van-field>
    <template v-if="visible || true">
      <!-- <van-calendar v-model:show="showPicker" :min-date="new Date('1970/01/01')" :max-date="new Date()" lazy-render @confirm="selectConfirm" @unselect="close" /> -->
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker v-model="currentDate" title="选择日期" :min-date="new Date('1970/01/01')" :max-date="new Date()" @confirm="selectConfirm" @cancel="close" />
      </van-popup>
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
    default: () => ''
  }
})

const visible = ref(false)
const showPicker = ref(false)
const currentDate = ref(['', '', ''])
const open = async () => {
  visible.value = true
  await nextTick()
  showPicker.value = true
}

const close = async () => {
  showPicker.value = false
  await nextTick()
  setTimeout(() => {
    visible.value = false
  }, 500)
}

const inValue = ref('')
const selectConfirm = (e: any) => {
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:e`, e)
  const { selectedValues = [] } = e as any
  const [y, m, d] = selectedValues
  let str = `${y}-${m}-${d}`
  emit('update:modelValue', str)
  close()
}

const init = async (newProps: any = {}) => {
  await nextTick()
  inValue.value = newProps.modelValue
  try {
    let str = newProps.modelValue || ''
    const arr = str.split('-') || []
    const [y = '', m = '', d = ''] = arr
    currentDate.value = [y, m, d]
  } catch (error) {
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:error`, error)
  }
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
    immediate: true
  }
)
</script>
