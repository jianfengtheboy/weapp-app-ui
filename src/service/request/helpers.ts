import { getEnv, getAccountInfoSync, showToast } from '@tarojs/taro'
import { CONTENT_TYPE, ERROR_MSG_DURATION } from '@/config/service'
import { useAuthStore } from '@/stores'
import { localStorage } from '@/utils/storage'
import { exeStrategyActions } from '@/utils/pattern'

const env = getEnv()

/**
 * 获取请求路径
 * @param url
 */
export const getRequestUrl = (url: string) => {
  let baseUrl = ''
  const actions: Common.StrategyAction[] = [
    [
      env === 'WEB', () => {
        baseUrl = `/dev-api${url}`
      }
    ],
    [
      env === 'WEAPP',
      () => {
        const { miniProgram } = getAccountInfoSync()
        const hosts = {
          // 开发 - 开发环境
          develop: 'https://cloud.xxxx.com/development-api',
          // 开发 - 测试环境
          // develop: 'https://cloud.xxxx.com/test-api',

          // 体验 - 开发环境
          // trial: 'https://cloud.xxxx.com/development-api',
          // 体验 - 测试环境
          trial: 'https://cloud.xxxx.com/test-api',
          // 体验 - 生产环境
          // trial: 'https://cloud.xxxx.com/prod-api',

          // 生产
          release: 'https://cloud.xxxx.com/prod-api'
        }
        baseUrl = url.substring(0, 1) === '/' ? `${hosts[miniProgram.envVersion]}${url}` : `${url}`
      }
    ],
    [
      true,
      () => {
        baseUrl = url.substring(0, 1) === '/' ? `${process.env.HTTP_URL}${url}` : `${url}`
      }
    ]
  ]
  exeStrategyActions(actions)
  return baseUrl
}

// 设置请求头
export const getRequestHeaders = (axiosConfig: Service.AxiosConfig) => {
  const header: TaroGeneral.IAnyObject = {}
  // 获取token
  const token = localStorage.get('token')
  if (token) {
    // 添加token
    header.token = token
  }
  // 增加类型
  header['Content-Type'] = axiosConfig.contentType || CONTENT_TYPE.json
  return header
}

// token过期
export const handleExpireToken = () => {
  const { resetAuthStore } = useAuthStore()
  resetAuthStore()

  return null
}

// 错误提示
export const showErrorMsg = (message: string) => {
  showToast({
    title: message,
    icon: 'none',
    duration: ERROR_MSG_DURATION
  })
}
