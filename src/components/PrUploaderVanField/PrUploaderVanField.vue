<template>
  <div class="pr-uploader-van-field">
    <van-field v-bind="attrs">
      <template #input>
        <van-uploader v-model="fileList" :max-size="maxSize" max-count="9" multiple :after-read="afterRead" @delete="change" @oversize="oversize" />
      </template>
    </van-field>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, nextTick, useAttrs } from 'vue'
import { uploadPost, filePreviewUrl } from '@/api/modules/common'
import { showToast } from 'vant'

const attrs = useAttrs()

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String],
    require: true,
    default: () => ''
  },
  imageBaseUrl: {
    type: [String],
    default: () => filePreviewUrl
  },
  maxSize: {
    type: [Number],
    default: () => 5 * 1024 * 1024
  }
})

const fileList = ref<any>([])

const init = async (newProps: any = {}) => {
  await nextTick()
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:newProps`, newProps)
  const { modelValue = '', imageBaseUrl } = newProps
  let arr = modelValue ? modelValue.split(',') : []
  arr = Array.from(arr, (url) => ({ status: '', message: '', url: `${imageBaseUrl}${url}` }))
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:arr`, arr)
  fileList.value = arr
}

const oversize = () => {
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:`)
  showToast('已过滤不合大小规范的图片文件')
}

const change = () => {
  const { imageBaseUrl } = props
  let arr = []
  for (const item of fileList.value) {
    let { url = '' } = item
    url = url.replace(imageBaseUrl, '')
    if (url) {
      arr.push(url)
    }
  }
  let str = arr.join(',')
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:str`, str)
  emit('update:modelValue', str)
}

const upload = async (fileInfo: any) => {
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:fileInfo`, fileInfo)
  const { file } = fileInfo
  fileInfo['status'] = 'uploading'
  fileInfo['message'] = '上传中...'
  await new Promise((a) => setTimeout(() => a(true), 500))
  let formdata = new FormData()
  formdata.append('file', file)
  await uploadPost({ data: formdata })
    .then((res) => {
      const { code = 0, message, data } = res
      if (code !== 200) {
        console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:err`, res)
        fileInfo['status'] = 'failed'
        fileInfo['message'] = '上传失败'
        return
      }
      let [url] = data
      fileInfo['url'] = url
      fileInfo['status'] = ''
      fileInfo['message'] = ''
      // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:fileList.value`, fileList.value)
    })
    .catch((err) => {
      fileInfo['status'] = 'failed'
      fileInfo['message'] = '上传失败'
    })
}

const afterRead = async (fileInfo: any) => {
  // 此时可以自行将文件上传至服务器
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:fileInfo`, fileInfo)
  let fileInfos: any = fileInfo
  let isArray = Array.isArray(fileInfo)
  if (!isArray) {
    fileInfos = [fileInfo]
  }
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:fileInfos`, fileInfos)
  let funcs = []
  for (const item of fileInfos) {
    let func = upload(item)
    funcs.push(func)
  }
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:funcs`, funcs)
  await Promise.all(funcs).then((res) => {
    console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
  })
  change()
}

const propsObj = computed(() => {
  const { modelValue, imageBaseUrl } = props
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:modelValue`, modelValue)
  return { modelValue, imageBaseUrl }
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
<style lang="scss" scoped>
.pr-uploader-van-field {
  --van-uploader-size: 98px;
}
</style>
