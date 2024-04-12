import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import px2vw from 'postcss-px-to-viewport'

const px2vw_options = {
  unitToConvert: 'px', // (String) 需要转换的单位，默认为"px"
  viewportWidth: 375, // 设计稿的视口宽度
  unitPrecision: 5, //  (Number) 单位转换后保留的精度
  propList: ['*'], // (Array) 能转化为vw的属性列表
  viewportUnit: 'vw', // (String) 希望使用的视口单位
  fontViewportUnit: 'vw', // (String) 字体使用的视口单位
  selectorBlackList: [], //  (Array) 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
  minPixelValue: 1, //  (Number) 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
  mediaQuery: false, // (Boolean) 媒体查询里的单位是否需要转换单位
  replace: true, //  (Boolean) 是否直接更换属性值，而不添加备用属性
  exclude: undefined, // (Array or Regexp) 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
  include: undefined, // (Array or Regexp) 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件
  landscape: false, //  (Boolean) 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
  landscapeUnit: 'vw', //  (String) 横屏时使用的单位
  landscapeWidth: 568 //  (Number) 横屏时使用的视口宽度
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取当前环境配置
  const config = loadEnv(mode, './')

  console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:当前环境：`, `[${mode}]`)
  console.log(config)

  const { VITE_BASE = '', VITE_BASE_PATH = '' } = config

  const base = `/${VITE_BASE_PATH}`

  const proxy = {
    [`/api-${VITE_BASE_PATH}`]: {
      target: VITE_BASE,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(new RegExp(`^/api-${VITE_BASE_PATH}`), '')
    }
  }

  return {
    plugins: [vue()],
    base,
    server: {
      host: '0.0.0.0', // 暴露本地服务到局域网
      proxy
    },
    resolve: {
      alias: {
        '@': '/src/'
      }
    },
    css: {
      postcss: {
        plugins: [px2vw(px2vw_options)]
      }
    }
  }
})
