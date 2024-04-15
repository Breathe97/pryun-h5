<template>
  <div class="list">
    <van-form ref="vanFormRef" required="auto" label-width="140">
      <cardVue :collapse="false" title="债务总量">
        <van-field type="number" maxlength="12" v-model="inf.debtPrincipal" name="debtPrincipal" label="银行贷款" placeholder="请输入银行贷款" :rules="[{ required: true, message: '请填写银行贷款' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field type="number" maxlength="12" v-model="inf.debtInterest" name="debtInterest" label="小额贷款" placeholder="请输入小额贷款" :rules="[{ required: true, message: '请填写小额贷款' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field type="number" maxlength="12" v-model="inf.debtInterest" name="debtInterest" label="已欠税金" placeholder="请输入已欠税金" :rules="[{ required: true, message: '请填写已欠税金' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field type="number" maxlength="12" v-model="inf.debtInterest" name="debtInterest" label="未售部分核定税金" placeholder="请输入未售部分核定税金" :rules="[{ required: true, message: '请填写未售部分核定税金' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field type="number" maxlength="12" v-model="inf.debtInterest" name="debtInterest" label="对外担保金额" placeholder="请输入对外担保金额" :rules="[{ required: true, message: '请填写对外担保金额' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field type="number" maxlength="12" v-model="inf.debtInterest" name="debtInterest" label="担保人数/企业户数" placeholder="请输入担保人数/企业户数" :rules="[{ required: true, message: '请填写担保人数/企业户数' }]"> </van-field>
        <van-field type="number" maxlength="12" v-model="inf.debtInterest" name="debtInterest" label="欠工人工资" placeholder="请输入欠工人工资" :rules="[{ required: true, message: '请填写欠工人工资' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field type="number" maxlength="12" v-model="inf.debtInterest" name="debtInterest" label="工人人数" placeholder="请输入工人人数" :rules="[{ required: true, message: '请填写工人人数' }]"> </van-field>
        <van-field type="number" maxlength="12" v-model="inf.debtInterest" name="debtInterest" label="民间借贷数额" placeholder="请输入民间借贷数额" :rules="[{ required: true, message: '请填写民间借贷数额' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <van-field type="number" maxlength="12" v-model="inf.debtInterest" name="debtInterest" label="民间借贷人数" placeholder="请输入民间借贷人数" :rules="[{ required: true, message: '请填写民间借贷人数' }]"> </van-field>
        <van-field maxlength="500" class="textarea-bg" show-word-limit label-align="top" type="textarea" v-model="inf.hockIntro" name="hockIntro" label="其他欠款说明" placeholder="请输入其他欠款说明" :rules="[{ required: true, message: '请填写其他欠款说明' }]"> </van-field>
        <van-field type="number" maxlength="12" v-model="inf.debtInterest" name="debtInterest" label="债务总量统计" placeholder="请输入债务总量统计" :rules="[{ required: true, message: '请填写债务总量统计' }]">
          <template #right-icon> <span style="margin-right: 12px">万元</span> </template>
        </van-field>
        <PrSelectVanField v-model="inf.corpCredit" :columns="dictConfigRes.corpCredit" is-link readonly name="企业诉求" label="企业诉求" placeholder="点击选择企业诉求" :rules="[{ required: true, message: '请填写企业诉求' }]" />
        <van-field maxlength="500" class="textarea-bg" show-word-limit label-align="top" type="textarea" v-model="inf.hockIntro" name="hockIntro" label="" placeholder="请输入其他欠款说明" :rules="[{ required: true, message: '请填写其他欠款说明' }]"> </van-field>
      </cardVue>
      <div style="height: 12px"></div>
      <cardVue :collapse="false" title="其他资料">
        <pr-uploader-van-field name="otherInfo" label="" v-model="inf.otherInfo" label-align="top"> </pr-uploader-van-field>
        <div class="tip">建议上传大小不超过5M的PNG、JPG格式</div>
      </cardVue>
      <div style="height: 12px"></div>
      <cardVue :collapse="false" title="信息确认">
        <van-cell-group inset>
          <pr-signature-van-field v-model="inf.sign" is-link readonly name="sign" label="法定代表签字" placeholder="去签字" :rules="[{ required: true, message: '请法定代表签字' }]"> </pr-signature-van-field>
        </van-cell-group>
      </cardVue>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
import { showConfirmDialog, showDialog } from 'vant'
import cardVue from '../../components/card/card.vue'
import { ref, watch } from 'vue'
import * as api from '@/api/modules/forms_qyjj'
import { dictConfigRes, getDetail, throttle, rules } from '../../static/index'

const emit = defineEmits(['checkedChange'])

const vanFormRef = ref()

const props = defineProps({
  orderDetail: {
    type: [Object],
    require: true,
    default: () => {}
  },
  // 确认协议
  checked: {
    type: [Boolean],
    require: true,
    default: () => false
  }
})

const checked = ref(false)
emit('checkedChange', checked.value)

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
  overdue: '' // 逾期时间
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
  orderId: '' // 订单ID
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
      theme: 'round-button'
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
  (a, b) => b.id && throttle(save, 500),
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
