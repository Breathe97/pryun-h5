<template>
  <div class="pr-select-van-field">
    <van-field v-bind="attrs" v-model="inValue" @click="open"> </van-field>
    <template v-if="visible">
      <van-popup v-model:show="showPicker" position="bottom" safe-area-inset-bottom>
        <van-picker v-if="maxSelect === 1" v-model="pickerVal" :columns="columns" @confirm="selectConfirm" @cancel="close" />
        <div v-else class="select-multiple">
          <div class="van-picker__toolbar">
            <button class="van-picker__cancel van-haptics-feedback" @click="close">取消</button>
            <div class="van-picker__title van-ellipsis">请选择</div>
            <button class="van-picker__confirm van-haptics-feedback" @click="selectConfirm">确认</button>
          </div>
          <div class="list no-px2vw">
            <div class="row" v-for="(item, index) in columns" :key="index" @click="selectRow(item)">
              <div class="row-text">{{ item.text }}</div>
              <div class="row-check"><van-icon v-if="Selected(item)" name="success" color="rgba(74, 199, 74, 1)" /></div>
            </div>
          </div>
        </div>
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
  },
  // 多选
  maxSelect: {
    type: [Number],
    require: false,
    default: () => 1
  },
  
})

const visible = ref(false)
const showPicker = ref(false)

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

const selectValue = ref<Type_column[]>([])
const inValue = ref('')
const pickerVal: any = ref([]) // 默认选中
const selectConfirm = (e: any) => {
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:e`, e)
  // 单选
  if (props.maxSelect === 1) {
    const { selectedOptions = [] } = e
    const { showKey } = props
    let column1 = selectedOptions[0]
    if (column1) {
      let val = column1[showKey]
      inValue.value = val
      emit('update:modelValue', column1.value)
    }
  }
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:`)
  // 多选
  if (props.maxSelect > 1) {
    let arr = selectValue.value
    let str_true = Array.from(arr, (item: any) => item.value).join('、') // 真实数值
    let str_false = Array.from(arr, (item: any) => item.text).join(',') // 显示数组

    if (str_false.length >= 16) {
      str_false = `${str_false.slice(0, 9)}等...${arr.length}项`
    }

    inValue.value = str_false
    emit('update:modelValue', str_true)
  }
  close()
}

const init = async (newProps: any = {}) => {
  await nextTick()
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:newProps`, newProps)
  const { modelValue, showKey, columns = [] } = newProps
  // 单选
  if (props.maxSelect === 1) {
    let info: any = columns.find((item: any) => item.value === modelValue)
    if (info) {
      let val = info['value']
      inValue.value = info[showKey]
      pickerVal.value.push(val)
    }
  }

  // 多选
  if (props.maxSelect > 1) {
  }
}

const propsObj = computed(() => {
  const { modelValue, columns, showKey } = props
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:modelValue`, modelValue)
  return { modelValue, columns, showKey }
})

const selectRow = (row: any) => {
  let arr = JSON.parse(JSON.stringify(selectValue.value))
  let index = arr.findIndex((item: any) => item.value === row.value)
  if (index !== -1) {
    arr.splice(index, 1)
  } else {
    if (arr.length >= props.maxSelect) return
    arr.push(row)
  }
  selectValue.value = arr
}

const Selected = computed(() => {
  return function (row: any) {
    let arr = selectValue.value
    let active = false
    for (const item of arr) {
      if (item.value === row.value) {
        active = true
        break
      }
    }
    return active
  }
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
<style scoped>
.select-multiple {
  position: relative;
  width: 100%;
}

.list {
  border-top: 0.5px solid #f0f0f0;
  max-height: 400px;
  min-height: 200px;
}
.row {
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 40px;
  max-height: 40px;
}

.row .row-text {
  flex: 1;
}
.row .row-value {
  min-width: 40px;
}
.row + .row {
  border-top: 0.5px solid #f0f0f0;
}
</style>
