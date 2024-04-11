<template>
  <div class="list">
    <van-form ref="vanFormRef" required="auto" label-width="100">
      <div class="list-item" v-for="(item, index) in inf.debtList" :key="index">
        <cardVue :title="`债务信息${item.index}`" :leftIconClick="() => delItem(index)">
          <van-cell-group inset>
            <pr-select-van-field v-model="item.debtType" :columns="dictConfigRes.debtType" is-link readonly name="debtType" label="债务性质" placeholder="请选择" :rules="[{ required: true, message: '请选择债务性质' }]" />
            <van-field v-model="item.debtPrincipal" name="debtPrincipal" label="债务本金" placeholder="请输入债务本金" :rules="[{ required: true, message: '请填写债务本金' }]">
              <template #right-icon>万元</template>
            </van-field>
            <van-field v-model="item.debtInterest" name="debtInterest" label="利息加罚息" placeholder="请输入利息加罚息" :rules="[{ required: true, message: '请填写利息加罚息' }]">
              <template #right-icon>万元</template>
            </van-field>
            <van-field v-model="item.debtCreditUser" name="debtCreditUser" label="债权人名称" placeholder="例：XX银行XX支行" :rules="[{ required: true, message: '请填写债权人名称' }]"> </van-field>
            <van-field v-model="item.overdue" name="overdue" label="逾期时间" placeholder="例：M20，表示逾期20个月" :rules="[{ required: true, message: '请填写逾期时间' }]"> </van-field>
            <van-field v-model="item.hockWorth" name="hockWorth" label="可变现价值" placeholder="请输入可变现价值" :rules="[{ required: true, message: '请填写可变现价值' }]"> </van-field>
            <van-field class="textarea-bg" label-width="73" label-align="top" type="textarea" v-model="item.hockIntro" name="hockIntro" label="抵押物介绍" placeholder="请输入抵押物介绍" :rules="[{ required: true, message: '请填写主营业务描述' }]"> </van-field>
            <pr-select-van-field v-model="item.jugProcess" :columns="dictConfigRes.jugProcess" is-link readonly name="jugProcess" label="司法程序进度" placeholder="请选择" :rules="[{ required: true, message: '请选择司法程序进度' }]" />
            <van-field v-model="item.debtSurplus" name="debtSurplus" label="剩余债务" placeholder="请输入抵偿后剩余债务" :rules="[{ required: true, message: '请填写可变现价值' }]"> </van-field>
          </van-cell-group>
        </cardVue>
      </div>
      <div style="height: 12px"></div>
      <van-button v-if="inf.debtList.length <= 10" round block plain type="default" native-type="submit" @click="addItem"><van-icon name="plus" color="rgba(74, 199, 74, 1)" /> <span style="color: rgba(74, 199, 74, 1)">添加债务信息</span> </van-button>
      <div style="height: 12px"></div>
      <cardVue :collapse="true" title="其他资料">
        <pr-uploader-van-field name="otherInfo" label="" v-model="inf.otherInfo" label-align="top"> </pr-uploader-van-field>
        <div class="tip">建议上传大小不超过5M的PNG、JPG格备份</div>
      </cardVue>
      <div style="height: 12px"></div>
      <cardVue :collapse="true" title="信息确认">
        <van-cell-group inset>
          <pr-signature-van-field v-model="inf.sign" is-link readonly name="sign" label="法定代表签字" placeholder="去签字" :rules="[{ required: true, message: '请法定代表签字' }]"> </pr-signature-van-field>
          <van-field v-model="inf.businessMan" name="businessMan" label="业务人" placeholder="请输入业务人名字" :rules="[{ required: true, message: '请填写业务人' }]" />
          <van-field v-model="inf.businessTel" name="businessTel" label="业务人电话" placeholder="请输入业务人电话" :rules="[{ required: true, message: '请填写业务人电话' }]" />
          <div class="checkbox">
            <van-checkbox v-model="checked" @change="(e) => emit('checkedChange', e)"> 承诺：(1) 公司即法定代表人自愿填写此信息统计表，并征得全体股东同意。(2) 公司即法定代表人均保证信息的真实性、完整性；理解和同意业务咨询，并承诺风险自担。 </van-checkbox>
          </div>
        </van-cell-group>
      </cardVue>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
import { showConfirmDialog, showToast, showDialog } from 'vant'
import cardVue from '../../components/card/card.vue'
import { ref, watch } from 'vue'
import * as api from '@/api/modules/forms_qyjj'
import { dictConfigRes, getDetail, throttle } from '../../static/index'

const emit = defineEmits(['checkedChange'])

const vanFormRef = ref()

const props = defineProps({
  orderDetail: {
    type: [Object],
    require: true,
    default: () => {},
  },
  // 确认协议
  checked: {
    type: [Boolean],
    require: true,
    default: () => false,
  },
})

const checked = ref(false)

const debtListItem = {
  index: 0,
  debtCreditUser: '', // 债权人名称
  debtInterest: '', // 利息加罚息
  debtPrincipal: '', // 债务本金
  debtSurplus: '', // 抵偿后剩余债务
  debtType: '', // 债务性质
  hockIntro: '', // 抵押物介绍
  hockWorth: '', // 抵押物可变现价值
  jugProcess: '', // 司法程序进展
  overdue: '', // 逾期时间
}

const inf: any = ref({
  businessMan: '', // 业务人
  businessTel: '', // 业务人电话
  debtList: [], // 债务信息
  otherInfo: '', // 其他资料（提交时需要转 为字符串 英文逗号分割）
  sign: '', // 签字

  last: false, // 是否为上一步
  next: false, // 是否为下一步
  id: '', // 进件ID
  orderId: '', // 订单ID
})

// 删除债务信息
const delItem = (index: number) => {
  if (inf.value.debtList.length <= 1) {
    return showDialog({ message: '请至少填写一条债务信息。', theme: 'round-button', confirmButtonText: '好的', confirmButtonColor: 'rgba(74, 199, 74, 1)' })
  }
  if (index >= 0) {
    showConfirmDialog({
      title: '温馨提示',
      message: '确定要删除这条债务信息吗？',
      confirmButtonColor: 'rgba(74, 199, 74, 1)',
      theme: 'round-button',
    })
      .then(() => {
        // on confirm
        inf.value.debtList.splice(index, 1)
      })
      .catch(() => {
        // on cancel
      })
  }
}

// 新增债务信息
const addItem = () => {
  let obj = JSON.parse(JSON.stringify(debtListItem))
  let lastIndex = 0
  let listLength = inf.value.debtList.length
  if (listLength) {
    lastIndex = inf.value.debtList[listLength - 1].index
  }
  obj.index = lastIndex + 1
  inf.value.debtList.push(obj)
}

const init = async () => {
  let keys = Object.keys(inf.value)
  let obj: any = await getDetail(props.orderDetail.caseInId, keys)
  obj.orderId = props.orderDetail?.orderId
  // 生成序号
  for (const [index, item] of obj.debtList.entries()) {
    item.index = index + 1
  }
  inf.value = { ...inf.value, ...obj }
  // 如果没有 债务信息 添加一个
  if (inf.value.debtList.length === 0) {
    addItem()
  }
}
init()

// 保存
const save = async ({ last = false, next = false, showErrMsg = false } = {}) => {
  let obj = JSON.parse(JSON.stringify(inf.value))
  obj = { ...obj, last, next }
  api.step3Post({ data: obj, showErrMsg })
}

// 校验表单
const validate = () => {
  return vanFormRef.value.validate()
}

// 监听当前表单
watch(
  () => inf.value,
  () => throttle(save, 500),
  { deep: true }
)

defineExpose({ save, validate })
</script>
<style lang="scss" scoped>
.list {
  .list-item + .list-item {
    margin-top: 12px;
  }
}
.tip {
  padding: 10px 20px;
  color: rgba(153, 153, 153, 1);
  font-size: 12px;
}
.checkbox {
  padding: 10px 12px;
}
</style>
