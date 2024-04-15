<template>
  <div class="pr-picker-van-field">
    <van-field v-bind="attrs" v-model="showVal" @click="open"> </van-field>
    <template v-if="visible">
      <van-popup v-model:show="showPopup" position="bottom" safe-area-inset-bottom>
        <div class="select-multiple">
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
  // 多选数量
  multipleNum: {
    type: [Number],
    require: false,
    default: () => 0
  },
  // 内部分割字符 服务器要的
  splitInStr: {
    type: [String],
    require: false,
    default: () => ','
  },
  // 外部分割字符 用户看到的
  splitOutStr: {
    type: [String],
    require: false,
    default: () => '、'
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

const selectValue = ref<Type_column[]>([])

const showVal = ref('') // 用户看到的数值

const selectConfirm = (e: any) => {
  const { splitInStr, splitOutStr } = props
  let arr = selectValue.value
  let str_true = Array.from(arr, (item: any) => item.value).join(splitInStr) // 真实数值
  let str_false = Array.from(arr, (item: any) => item.text).join(splitOutStr) // 显示数组

  if (str_false.length >= 16) {
    str_false = `${str_false.slice(0, 9)}等...${arr.length}项`
  }

  showVal.value = str_false
  emit('update:modelValue', str_true)
  close()
}

const init = async (newProps: any = {}) => {
  await nextTick()
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:newProps`, newProps)
  const { modelValue, splitInStr, columns = [] } = newProps
  let vals = modelValue.split(splitInStr) || []
  let arr = []
  for (const item of columns) {
    if (vals.includes(item.val)) {
      arr.push(item)
    }
  }
  selectValue.value = arr
}

// 选择某一行
const selectRow = (row: any) => {
  let arr = JSON.parse(JSON.stringify(selectValue.value))
  let index = arr.findIndex((item: any) => item.value === row.value)
  if (index !== -1) {
    arr.splice(index, 1)
  } else {
    if (arr.length >= props.multipleNum && props.multipleNum !== 0) return
    arr.push(row)
  }
  selectValue.value = arr
}

// 是否选中
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

const propsObj = computed(() => {
  const { modelValue, columns } = props
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:modelValue`, modelValue)
  return { modelValue, columns }
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
