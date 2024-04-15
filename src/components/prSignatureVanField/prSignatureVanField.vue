<template>
  <div class="pr-signature-van-field">
    <van-field v-bind="attrs" v-model="inValue">
      <template #input>
        <div class="pr-signature-view">
          <div class="res-img" @click="show">
            <van-image class="res-img-view" v-if="modelValue" :src="modelValue" />
            <div v-else class="res-img-text">去签字</div>
          </div>
        </div>
      </template>
    </van-field>
    <template v-if="visible">
      <van-popup v-model:show="showPopup" position="bottom" safe-area-inset-bottom>
        <div class="signature-content">
          <van-signature class="signature-content-view" @submit="onSubmit" />
        </div>
      </van-popup>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, nextTick, useAttrs } from 'vue'
import { filePreviewUrl, uploadPost } from '@/api/modules/common'
import { showToast } from 'vant'

const attrs = useAttrs()

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: [String],
    require: true,
    default: () => ''
  }
})

const inValue = ref('')

const init = async (newProps: any = {}) => {
  await nextTick()
  inValue.value = newProps.modelValue
}

const visible = ref(false)
const showPopup = ref(false)
const show = async () => {
  visible.value = true
  await nextTick()
  showPopup.value = true
}
// Base64 转 File
const base64ToFile = (base64 = '', fileName = '') => {
  let arr = base64.split(',')
  // @ts-ignore
  let type = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, { type })
}

const onSubmit = async (data: any) => {
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:data`, data)
  if (!data.image) {
    return showToast({ message: '请签字后再确认', position: 'bottom' })
  }
  let imageUrl = ''
  let file = base64ToFile(data.image, 'pr-signature')
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:file`, file)
  let formdata = new FormData()
  formdata.append('file', file)
  uploadPost({ data: formdata })
    .then((res) => {
      const { code = 0, message, data } = res
      if (code !== 200) {
        console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:err`, res)
        return
      }
      let [url] = data
      imageUrl = `${filePreviewUrl}${url}`
      emit('update:modelValue', imageUrl)
      // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:fileList.value`, fileList.value)
    })
    .catch((err) => {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:err`, err)
    })

  showPopup.value = false
  setTimeout(() => {
    visible.value = false
  }, 500)
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
<style scoped lang="scss">
.pr-signature-van-field {
  --van-signature-content-background: transparent;
  .pr-signature-view {
    position: relative;
    width: 100%;
    .res-img {
      width: 100%;
      display: flex;
      align-items: center;
      .res-img-view {
        height: 24px;
      }
      .res-img-text {
        color: #999999;
      }
    }
    .signature-content {
      --van-signature-content-height: 80vh;
    }
  }
}
</style>
