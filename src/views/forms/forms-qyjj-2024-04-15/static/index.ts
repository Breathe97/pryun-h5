import * as api from '@/api/modules/forms_qyjj'
import { regTest } from 'pr-tools'

export const rules = {
  mobile: [
    { required: true, message: '请填写联系电话' },
    { message: '请填写正确的号码', validator: (e = '') => regTest.mobile(e) }
  ],
  idCard: [
    { required: true, message: '请填写身份证号' },
    { message: '请填写身份证号', validator: (e = '') => regTest.idCard(e) }
  ]
}

// 定义转换规则
const mapValue: any = {
  companyAttr: 'companyType',
  corpCredit: 'creditType',
  businessStatus: 'businessStatus',
  industrialNature: 'industrialType',
  isProceed: '',
  payType: 'payType',
  debtType: 'debtType',
  jugProcess: 'jugProcess'
}

export const dictConfigRes: any = {
  // 第一步
  corpCredit: [], // 法人征信情况（提交时需要转为 KEY）

  // 第二步
  companyAttr: [], // 企业属性（提交时需要转为 KEY）
  businessStatus: [], // 企业经营状况（提交时需要转为 KEY）
  industrialNature: [], // 产业性质（提交时需要转为 KEY）
  isProceed: [], // 企业涉诉情况（提交时需要转为 boolean）
  payType: [], // 缴纳方式（提交时需要转为 KEY）

  // 第三步
  debtType: [], // 债务性质（提交时需要转为 KEY）
  jugProcess: [] // 司法程序进展（提交时需要转为 KEY）
}

// 获取字典表
export const dictConfigGet = async () => {
  return api.dictConfigGet().then((res) => {
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
    const { code = 0, message, data } = res
    if (code !== 200) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:err`, res)
      return
    }

    // 转换 data
    const mapValueKeys = Object.keys(data)
    for (const mapValueKey of mapValueKeys) {
      const obj = data[mapValueKey]
      let arr = []
      const keys = Object.keys(obj)
      for (const key of keys) {
        let text = obj[key]
        arr.push({ text, value: key })
      }
      data[mapValueKey] = arr
    }
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:data`, data)

    // 其他通用
    const defaultArr = [
      { text: '是', value: 1 },
      { text: '否', value: 0 }
    ]

    // 生成 dictConfigRes
    const keys = Object.keys(dictConfigRes)
    for (const key of keys) {
      let targetKey = mapValue[key] || key
      dictConfigRes[key] = data[targetKey] || defaultArr
    }
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:dictConfigRes`, dictConfigRes)
  })
}

// 获取商品详情
export const getDetail = async (caseInId = '', keys: string[]) => {
  return new Promise((resolve, reject) => {
    api.caseDetailGet({ params: { caseInId } }).then((res) => {
      // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
      const { code = 0, message, data } = res
      if (code !== 200) {
        console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:err`, res)
        return resolve({})
      }
      if (keys.length === 0) {
        return resolve(data)
      }
      // 把详情填写到现在的表单中
      try {
        let obj: any = {}
        for (const key of keys) {
          let val = data[key]
          obj[key] = val === null ? '' : val
        }
        // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:obj`, obj)
        resolve(obj)
      } catch (error) {
        reject(error)
        console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:表单自动填写错误`, error)
      }
    })
  })
}

// 节流
let timer: any = null
export function throttle(fn = () => {}, delay = 300) {
  if (timer == null) {
    timer = setTimeout(() => {
      fn()
      clearTimeout(timer)
      timer = null
    }, delay)
  }
}
