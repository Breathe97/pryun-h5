<template>
  <div class="pr-table-preview-view" ref="prTablePreviewViewRef">
    <div class="preview-view-content">
      <div class="cell-row" v-for="(row, rowIndex) in cells" :index="rowIndex">
        <div class="cell-row-col" v-for="(col, colIndex) in row" :key="colIndex">
          <span v-if="col.text" class="cell-item-text">{{ col.text }}</span>
          <span class="cell-item-value">
            <span>{{ col.value || '' }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'

const prTablePreviewViewRef = ref()

type Type_col = { text: string; value: any; style: object }

const props = defineProps({
  cells: {
    type: [Array<Type_col[]>],
    require: true,
    default: () => [],
  },
})

const def = ref({
  offsetWidth: 0,
  offsetHeight: 0,
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
  background-color: #333333;
  padding: 0.5px 0;
  .preview-view-content {
    position: relative;

    .cell-row {
      display: flex;
      align-items: center;
      justify-content: stretch;
      width: 100%;
      .cell-row-col {
        width: 0;
        position: relative;
        flex: 1;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: stretch;
        height: max-content;

        .cell-item-text,
        .cell-item-value {
          margin: 0.5px;
          flex: 1;
          padding: 4px 8px;
          height: 32px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
        }
        .cell-item-text {
          width: 80px;
        }
        .cell-item-value {
          width: 0;
          margin-left: 0.5px;
          flex: 1;
          span {
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
          }
        }
      }
    }
  }
}
</style>
