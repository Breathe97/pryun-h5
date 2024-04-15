<template>
  <div class="pr-picker-van-field">
    <van-field v-bind="attrs" v-model="inValue" @click="open"> </van-field>
    <template v-if="visible">
      <van-popup v-model:show="showPopup" position="bottom" safe-area-inset-bottom>
        <van-picker v-model="pickerVal" :columns="columns" @confirm="selectConfirm" @cancel="close" />
      </van-popup>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, nextTick, useAttrs } from 'vue'

const attrs = useAttrs()

const emit = defineEmits(['update:modelValue', 'click'])

type Type_column = { text: string; value: string }

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    require: true,
    default: () => ''
  },
  columns: {
    type: [Array<Type_column>],
    require: true,
    default: () => []
  },
  showKey: {
    type: [String],
    default: () => 'text'
  }
})

const visible = ref(false)
const showPopup = ref(false)

const open = async () => {
  visible.value = true
  await nextTick()
  showPopup.value = true
}

const close = async () => {
  showPopup.value = false
  await nextTick()
  setTimeout(() => {
    visible.value = false
  }, 500)
}

const inValue = ref('')
const pickerVal: any = ref([]) // 默认选中
const selectConfirm = (e: any) => {
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:e`, e)
  const { selectedOptions = [] } = e
  const { showKey } = props
  let column1 = selectedOptions[0]
  if (column1) {
    let val = column1[showKey]
    inValue.value = val
    emit('update:modelValue', column1.value)
  }
  close()
}

const init = async (newProps: any = {}) => {
  await nextTick()
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:newProps`, newProps)
  const { modelValue, showKey, columns = [] } = newProps
  let info: any = columns.find((item: any) => item.value === modelValue)
  if (info) {
    let val = info['value']
    inValue.value = info[showKey]
    pickerVal.value.push(val)
  }
}

const propsObj = computed(() => {
  const { modelValue, columns, showKey } = props
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:modelValue`, modelValue)
  return { modelValue, columns, showKey }
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
