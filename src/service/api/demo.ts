import { request } from '../request'

interface Demo {
  name: string
}

/** 示例 */
export function fetchDemo(data: any) {
  return request.get<Demo>('/captchaImage', data, {
    useErrMsg: true
  })
}
