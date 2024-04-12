<template>
  <div class="pr-table-preview-view no-px2vw" ref="prTablePreviewViewRef">
    <div class="preview-view-content">
      <div class="cell-row" v-for="(row, rowIndex) in cells" :index="rowIndex">
        <div class="cell-row-col" v-for="(col, colIndex) in row" :key="colIndex">
          <span v-if="col.text" class="cell-item-text" :style="[col.textStyle || {}]">{{ col.text }}</span>
          <span class="cell-item-value" :style="[col.valueStyle || {}]">{{ col.value || '' }} </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'
import type { PropType } from 'vue'

const prTablePreviewViewRef = ref()

type Type_col = { text: string; value: any; textStyle?: {}; valueStyle?: {} }

defineProps({
  cells: {
    type: Array<Type_col[]>,
    require: true,
    default: () => []
  }
})

const def = ref({
  offsetWidth: 0,
  offsetHeight: 0
})

const init = async () => {
  await nextTick()
  const { offsetWidth, offsetHeight } = prTablePreviewViewRef.value
  def.value = { offsetWidth, offsetHeight }
}
init()

const Style = computed(() => {
  let style: any = {}
  // style['transform'] = `scale(${scale})`
  return style
})
</script>
<style lang="scss" scoped>
.pr-table-preview-view {
  position: relative;
  font-size: 8px;
  .preview-view-content {
    position: relative;
    box-sizing: border-box;
    .cell-row {
      width: 100%;
      min-height: 32px;
      display: flex;
      align-items: stretch;
      justify-content: stretch;
      box-sizing: border-box;
      .cell-row-col {
        width: 0;
        height: auto;
        position: relative;
        flex: 1;
        box-sizing: border-box;
        display: flex;
        align-items: stretch;
        .cell-item-text,
        .cell-item-value {
          margin: 0.5px;
          box-sizing: border-box;
          padding: 4px 8px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          word-wrap: break-word;
          word-break: break-all;
          z-index: 1;
          &::after {
            content: '';
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 2;
            pointer-events: none;
            box-shadow: 0 0 0px 1px #333333;
          }
        }
        .cell-item-text {
          width: 70px;
          text-align: center;
          font-weight: bold;
        }
        .cell-item-value {
          flex: 1;
          width: 0;
          margin-left: 0.5px;
          flex: 1;
          text-wrap: wrap;
        }
      }
    }
  }
}
</style>
