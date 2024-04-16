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
  // 第一步
  ownership: 'ownership',
  landNature: 'landNature',
  landUseNature: 'landUseNature',
  companyBuildNature1: 'buildType1',
  companyBuildNature2: 'buildType2',
  companyCurrInfo: 'companyInfo',
  lawCategory: 'layType',

  // 第三步
  companyPetition: 'companyPetition'
}

export const dictConfigRes: any = {
  // 第一步
  ownership: [], // 股权情况
  landNature: [], // 土地性质
  landUseNature: [], // 土地使用性质
  companyBuildNature1: [], // 企业建筑性质 - 工业
  companyBuildNature2: [], // 企业建筑性质 - 房地产
  companyCurrInfo: '', // 公司目前情况
  lawCategory: '', // 司法类别

  // 第三步
  companyPetition: [] // 企业诉求
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
