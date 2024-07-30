import { switchTab } from '@tarojs/taro'

export const useRouterPush = () => {
  // 跳转首页
  const toHome = () => {
    switchTab({
      url: '/pages/home/home'
    })
  }

  return {
    toHome
  }
}
