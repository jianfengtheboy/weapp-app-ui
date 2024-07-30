import { request } from '@tarojs/taro'
import { REQUEST_TIMEOUT, SUCCESS_CODE, REFRESH_TOKEN_CODE } from '@/config/service'
import { getRequestUrl, getRequestHeaders, handleExpireToken, showErrorMsg } from './helpers'

async function axios<T>(config: Service.RequestParam): Promise<Service.RequestResult<T>> {
  const { method, url, data } = config
  // 请求配置
  const axiosConfig = config.axiosConfig as Service.AxiosConfig
  // 设置请求头
  const header = getRequestHeaders(axiosConfig)

  return await new Promise((resolve, reject) => {
    request({
      // 兼容Url不同的情况，可以通过填写完整路径
      url: getRequestUrl(url),
      method,
      header,
      timeout: REQUEST_TIMEOUT,
      // 对所有请求添加时间戳以防止缓存
      data: { ...data, _t: Date.now() },
      success: response => {
        const { code, msg, data } = response.data as Service.BackendResultConfig<T>
        // 成功请求
        if (code === SUCCESS_CODE) {
          return resolve({
            error: null,
            success: ![undefined, null, ''].includes(data) ? data : response.data
          })
        }
        if (REFRESH_TOKEN_CODE === code) {
          handleExpireToken()
        }
        // 仅有使用服务端错误信息的请求才 toast 提示错误
        if (axiosConfig.useErrMsg && REFRESH_TOKEN_CODE !== code) {
          showErrorMsg(msg)
        }
        return reject({
          error: {
            msg,
            errorCode: code
          },
          success: null
        })
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        // do somethings ...
      }
    })
  })
}

export default axios
