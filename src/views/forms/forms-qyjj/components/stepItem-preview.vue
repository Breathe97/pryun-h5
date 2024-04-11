<template>
  <div class="forms-qyjj-preview">预览</div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import * as api from '@/api/modules/forms_qyjj'

const props = defineProps({
  orderId: {
    type: [String],
    require: true,
    default: () => '',
  },
})
</script>
<style lang="scss" scoped>
.forms-qyjj-preview {
  position: relative;
  padding: 12px;
}
</style>
