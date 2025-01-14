declare namespace Service {
  type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

  interface AxiosConfig {
    // 请求类型
    contentType?: string
    // 是否显示Toast
    useErrMsg?: boolean
  }

  interface RequestParam {
    url: string
    method?: Service.RequestMethod
    data?: any
    axiosConfig?: Service.AxiosConfig
  }

  // 请求错误
  interface RequestError {
    // 错误码
    errorCode: string | number
    // 错误信息
    msg: string
  }

  // 后端接口返回的数据结构配置
  interface BackendResultConfig<T> {
    // 表示后端请求状态码的属性字段
    code: string | number
    // 表示后端返回的数据结构
    data: T | any
    // 表示后端消息的属性字段
    msg: string
  }

  // 自定义的请求成功结果
  interface SuccessResult<T = any> {
    // 请求错误
    error: null | RequestError

    // 请求数据
    success: null | T | any
  }

  // 自定义的请求结果
  type RequestResult<T = any> = SuccessResult<T>
}
