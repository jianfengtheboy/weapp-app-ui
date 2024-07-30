import { createApp } from 'vue'
import { setupStore } from '@/stores'
import Taro from '@tarojs/taro'

import './app.scss'

const App = createApp({
  onLaunch() {
    if (process.env.TARO_ENV === 'weapp') {
      // 版本更新
      const updateManager = Taro.getUpdateManager()

      updateManager.onCheckForUpdate(response => {
        // 请求完新版本信息的回调
        if (response.hasUpdate) {
          // 新版本下载成功
          updateManager.onUpdateReady(() => {
            Taro.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: res => {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          // 新版本下载失败
          updateManager.onUpdateFailed(() => {
            Taro.showModal({
              title: '更新提示',
              content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开。'
            })
          })
        }
      })
    }
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  onShow () {},
})

function setupApp() {
  // 挂载store
  setupStore(App)
}

setupApp()

export default App
