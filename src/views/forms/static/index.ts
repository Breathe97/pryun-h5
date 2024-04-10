import * as api from '@/api/modules/forms_qyjj'
export type Type_form_types = 'grjj' | 'qyjj'

export const form_types = [
  { key: 'qyjj', name: '企业进件' },
  { key: 'grjj', name: '个人进件' },
]

export const transformKeys = ['corpCredit', 'companyAttr', 'businessStatus', 'industrialNature', 'isProceed', 'payType', 'debtType', 'jugProcess'] // 需要转换的key
export const arr2StrKeys = ['otherInfo']

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
    { text: '是', value: true },
    { text: '否', value: false },
  ],
}

// 把obj转为为 上传/本地 前的数据
export const transformObj = (obj: any = {}, mode = 'up') => {
  // 转为上传
  let keys = Object.keys(obj)
  if (mode === 'up') {
    for (const key of keys) {
      // 需要把数组变为字符串拼接
      if (arr2StrKeys.includes(key)) {
        let arr = obj[key]
        obj[key] = arr.join(',')
      }
      // 需要转化
      if (transformKeys.includes(key)) {
        const arr = dictConfigRes[key] || []
        // 不存在转换数据
        if (!arr.length) continue
        let text = obj[key]
        const { value = '' } = arr.find((item: any) => item.text === text) || {}
        obj[key] = value
      }
    }
  }
  // 转为本地
  if (mode === 'down') {
    for (const key of keys) {
      // 需要把字符串拼接变为数组
      if (arr2StrKeys.includes(key)) {
        let str = obj[key]
        obj[key] = str ? str.split(',') : []
      }
      // 需要转化
      if (transformKeys.includes(key)) {
        const arr = dictConfigRes[key] || []
        // 不存在转换数据
        if (!arr.length) continue
        let value = obj[key]
        const { text = '' } = arr.find((item: any) => item.value === value) || {}
        obj[key] = text
      }
    }
  }
  // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:obj`, obj)
  return obj
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
        return
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
