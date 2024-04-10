<template>
  <div class="list">
    <div class="list-item" v-for="(item, index) in list" :key="index">
      <cardVue :title="`债务信息${item.index}`" :leftIconClick="() => delItem(index)">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field label-width="100" :required="true" v-model="item.debtType" is-link readonly name="债务性质" label="债务性质" placeholder="请选择" @click="select('picker', 'username')" :rules="[{ required: true, message: '请选择债务性质' }]" />
            <van-field label-width="100" :required="true" v-model="item.debtPrincipal" name="债务本金" label="债务本金" placeholder="请输入债务本金" :rules="[{ required: true, message: '请填写债务本金' }]">
              <template #right-icon>万元</template>
            </van-field>
            <van-field label-width="100" :required="true" v-model="item.debtInterest" name="利息加罚息" label="利息加罚息" placeholder="请输入利息加罚息" :rules="[{ required: true, message: '请填写利息加罚息' }]">
              <template #right-icon>万元</template>
            </van-field>
            <van-field label-width="100" :required="true" v-model="item.debtInterest" name="债权人名称" label="债权人名称" placeholder="例：XX银行XX支行" :rules="[{ required: true, message: '请填写债权人名称' }]"> </van-field>
            <van-field label-width="100" :required="true" v-model="item.debtCreditUser" name="逾期时间" label="逾期时间" placeholder="例：M20，表示逾期20个月" :rules="[{ required: true, message: '请填写逾期时间' }]"> </van-field>
            <van-field label-width="100" :required="true" v-model="item.hockWorth" name="可变现价值" label="可变现价值" placeholder="请输入可变现价值" :rules="[{ required: true, message: '请填写可变现价值' }]"> </van-field>
            <van-field class="textarea-bg" label-width="100" label-align="top" type="textarea" v-model="item.hockIntro" name="抵押物介绍" label="抵押物介绍" placeholder="请输入抵押物介绍" :rules="[{ required: true, message: '请填写主营业务描述' }]"> </van-field>
            <van-field label-width="100" :required="true" v-model="item.jugProcess" is-link readonly name="司法程序进度" label="司法程序进度" placeholder="请选择" @click="select('picker', 'username')" :rules="[{ required: true, message: '请选择司法程序进度' }]" />
            <van-field label-width="100" :required="true" v-model="item.debtSurplus" name="抵偿后剩余债务" label="剩余债务" placeholder="请输入抵偿后剩余债务" :rules="[{ required: true, message: '请填写可变现价值' }]"> </van-field>
          </van-cell-group>
        </van-form>
      </cardVue>
    </div>
    <div style="height: 12px"></div>
    <van-button round block plain type="default" native-type="submit" @click="addItem"><van-icon name="plus" color="rgba(74, 199, 74, 1)" /> <span style="color: rgba(74, 199, 74, 1)">添加债务信息</span> </van-button>
    <div style="height: 12px"></div>
    <cardVue :collapse="false" title="其他资料">
      <van-form>
        <van-field name="uploader" label="" label-align="top">
          <template #input>
            <van-uploader v-model="inf.otherInfo" />
          </template>
        </van-field>
        <div class="tip">建议上传大小不超过5M的PNG、JPG格备份</div>
      </van-form>
      <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
    </cardVue>
    <div style="height: 12px"></div>
    <cardVue :collapse="false" title="信息确认">
      <van-form>
        <van-cell-group inset>
          <van-field label-width="100" :required="true" v-model="inf.sign" is-link readonly name="picker" label="法定代表签字" placeholder="去签字" :rules="[{ required: true, message: '请法定代表签字' }]" />
          <van-field label-width="100" :required="true" v-model="inf.businessMan" name="业务人" label="业务人" placeholder="请输入业务人名字" :rules="[{ required: true, message: '请填写业务人' }]" />
          <van-field label-width="100" :required="true" v-model="inf.businessTel" name="业务人电话" label="业务人电话" placeholder="请输入业务人电话" :rules="[{ required: true, message: '请填写业务人电话' }]" />
          <div class="checkbox">
            <van-checkbox v-model="inf.checked"> 承诺：(1) 公司即法定代表人自愿填写此信息统计表，并征得全体股东同意。(2) 公司即法定代表人均保证信息的真实性、完整性；理解和同意业务咨询，并承诺风险自担。 </van-checkbox>
          </div>
        </van-cell-group>
      </van-form>
      <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
    </cardVue>
    <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
import cardVue from '../../components/card/card.vue'
import { ref, computed } from 'vue'

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

const inf = ref({
  businessMan: '', // 业务人
  businessTel: '', // 业务人电话
  debtList: [], // 债务信息
  id: '', // 进件ID
  last: true, // 是否为上一步
  next: true, // 是否为下一步
  otherInfo: [], // 其他资料（提交时需要转 为字符串 英文逗号分割）
  sign: '', // 签字
  checked: false, // 确认协议
})

const list = ref<(typeof debtListItem)[]>([])

const columns = ref([
  { text: '杭州', value: 'Hangzhou' },
  { text: '宁波', value: 'Ningbo' },
  { text: '温州', value: 'Wenzhou' },
  { text: '绍兴', value: 'Shaoxing' },
  { text: '湖州', value: 'Huzhou' },
])

const delItem = (index: number) => {
  if (index >= 0) {
    list.value.splice(index, 1)
  }
}

const addItem = () => {
  let obj = JSON.parse(JSON.stringify(debtListItem))
  let lastIndex = 0
  let listLength = list.value.length
  if (listLength) {
    lastIndex = list.value[listLength - 1].index
  }
  obj.index = lastIndex + 1
  list.value.push(obj)
}
addItem()

const showPicker = ref(false)
const showCalendar = ref(false)
const selectKey = ref('')
const select = (type = '', key = '') => {
  if (type === 'calendar') {
    showCalendar.value = true
  }
  if (type === 'picker') {
    showPicker.value = true
  }
  selectKey.value = key
}

const onConfirm = (e: any) => {
  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:e`, e)
  // inf[showCalendarKey.value] =
}

const onSubmit = () => {}
</script>
<style lang="scss" scoped>
.list {
  .list-item {
  }
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
