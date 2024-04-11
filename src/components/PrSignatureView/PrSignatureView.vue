<template>
  <div class="pr-signature-view">
    <div class="res-img" @click.capture="show">
      <van-image class="res-img-view" v-if="modelValue" :src="modelValue" />
      <div v-else class="res-img-text">去签字</div>
    </div>
    <van-popup v-model:show="showPopup" position="bottom">
      <div class="signature-content">
        <van-signature class="signature-content-view" @submit="onSubmit" />
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String],
    require: true,
    default: () => '',
  },
})

const visible = ref(false)
const showPopup = ref(false)
const show = async () => {
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:`)
  visible.value = true
  await nextTick()
  showPopup.value = true
}

const removeImgBac = (base64: string) => {
  return new Promise((resolve, reject) => {
    const rgba = [255, 255, 255, 255]
    const tolerance = 60 // 容差率
    const canvas = document.createElement('canvas')
    const canvasText = canvas.getContext('2d')
    const img = new Image()
    img.src = base64
    let imgData = null
    let [r0, g0, b0, a0] = rgba
    let r, g, b, a
    img.onload = () => {
      let w = img.width / 50
      let h = img.height / 50
      canvas.width = w
      canvas.height = h
      if (canvasText) {
        canvasText.drawImage(img, 0, 0, w, h)
        imgData = canvasText.getImageData(0, 0, 200, 700)
        for (let i = 0; i < imgData.data.length; i += 4) {
          r = imgData.data[i]
          g = imgData.data[i + 1]
          b = imgData.data[i + 2]
          a = imgData.data[i + 3]
          const t = Math.sqrt((r - r0) ** 2 + (g - g0) ** 2 + (b - b0) ** 2 + (a - a0) ** 2)
          if (t < tolerance) {
            imgData.data[i] = 0
            imgData.data[i + 1] = 0
            imgData.data[i + 2] = 0
            imgData.data[i + 3] = 0
          }
        }
        canvasText.putImageData(imgData, 0, 0)
      }
      let image = canvas.toDataURL('png')
      resolve(image)
    }
  })
}

const onSubmit = async (data: any) => {
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:data`, data)
  let image = await removeImgBac(data.image)
  emit('update:modelValue', image)
  showPopup.value = false
  setTimeout(() => {
    visible.value = false
  }, 500)
}

defineExpose({ show })
</script>
<style scoped lang="scss">
.pr-signature-view {
  position: relative;
  width: 100%;
  .res-img {
    width: 100%;
    .res-img-view {
      // height: 16px;
    }
    .res-img-text {
      color: #999999;
    }
  }
  .signature-content {
    --van-signature-content-height: 80vh;
  }
}
</style>
