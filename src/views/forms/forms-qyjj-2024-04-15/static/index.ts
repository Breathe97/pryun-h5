import * as api from '@/api/modules/forms_qyjj'
import { regTest } from 'pr-tools'
export type Type_form_types = 'grjj' | 'qyjj'

export const rules = {
  mobile: [
    { required: true, message: '请填写联系电话' },
    { message: '请填写正确的号码', validator: (e = '') => regTest.mobile(e) },
  ],
  idCard: [
    { required: true, message: '请填写身份证号' },
    { message: '请填写身份证号', validator: (e = '') => regTest.idCard(e) },
  ],
}

export const form_types = [
  { key: 'qyjj', name: '企业进件' },
  { key: 'grjj', name: '个人进件' },
]

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
  jugProcess: [], // 司法程序进展（提交时需要转为 KEY）

  // 其他通用
  default: [
    { text: '是', value: 1 },
    { text: '否', value: 0 },
  ],
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
    // 把字典数据处理成前端选项数据
    let { businessStatus, companyType, creditType, industrialType, payType, debtType, jugProcess } = data
    // businessStatus
    try {
      let keys = Object.keys(businessStatus)
      let arr = []
      for (const key of keys) {
        arr.push({ text: businessStatus[key], value: key })
      }
      businessStatus = arr
    } catch (error) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:error`, error)
    }

    // companyType
    try {
      let keys = Object.keys(companyType)
      let arr = []
      for (const key of keys) {
        arr.push({ text: companyType[key], value: key })
      }
      companyType = arr
    } catch (error) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:error`, error)
    }

    // creditType
    try {
      let keys = Object.keys(creditType)
      let arr = []
      for (const key of keys) {
        arr.push({ text: creditType[key], value: key })
      }
      creditType = arr
    } catch (error) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:error`, error)
    }

    // industrialType
    try {
      let keys = Object.keys(industrialType)
      let arr = []
      for (const key of keys) {
        arr.push({ text: industrialType[key], value: key })
      }
      industrialType = arr
    } catch (error) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:error`, error)
    }

    // payType
    try {
      let keys = Object.keys(payType)
      let arr = []
      for (const key of keys) {
        arr.push({ text: payType[key], value: key })
      }
      payType = arr
    } catch (error) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:error`, error)
    }
    try {
      let keys = Object.keys(debtType)
      let arr = []
      for (const key of keys) {
        arr.push({ text: debtType[key], value: key })
      }
      debtType = arr
    } catch (error) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:error`, error)
    }
    try {
      let keys = Object.keys(jugProcess)
      let arr = []
      for (const key of keys) {
        arr.push({ text: jugProcess[key], value: key })
      }
      jugProcess = arr
    } catch (error) {
      console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:error`, error)
    }

    dictConfigRes['companyAttr'] = companyType
    dictConfigRes['corpCredit'] = creditType
    dictConfigRes['businessStatus'] = businessStatus
    dictConfigRes['industrialNature'] = industrialType
    dictConfigRes['isProceed'] = dictConfigRes.default
    dictConfigRes['payType'] = payType
    dictConfigRes['debtType'] = debtType
    dictConfigRes['jugProcess'] = jugProcess
    // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:dictConfigRes.value`, dictConfigRes.value)
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
