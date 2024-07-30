<script lang="ts" setup>
import { ref } from 'vue'
import Taro, { useDidShow } from '@tarojs/taro'

// 页面配置
definePageConfig({
  navigationBarTitleText: '首页',
  navigationStyle: 'custom',
  disableScroll: true,
  enablePullDownRefresh: true
})

/***********************************/
/* 自定义导航 */
/***********************************/
// 自定义导航
const clientRectTop = ref('')
const clientRectHeight = ref('')
const clientRectTotalHeight = ref(0)
const screenHeight = ref(0)
const tabbarHeight = ref(0)
const initClientRect = () => {
  const clientRect = Taro.getMenuButtonBoundingClientRect()
  Taro.getSystemInfo({
    success: (response: any) => {
      const statusBarHeight = response.statusBarHeight || 0
      screenHeight.value = response.screenHeight
      tabbarHeight.value = response.screenHeight - response.safeArea?.bottom + 50
      clientRectTop.value = `${clientRect.top}px`
      clientRectHeight.value = `${clientRect.height}px`
      clientRectTotalHeight.value = statusBarHeight + clientRect.height + (clientRect.top - statusBarHeight) * 2
    },
    fail: error => {
      console.log(error)
    }
  })
}

// onShow
const onShowAction = async () => {
  if (process.env.TARO_ENV === 'weapp') {
    await initClientRect()
  }
}

useDidShow(() => {
  onShowAction()
})

Taro.showShareMenu({
  withShareTicket: true,
  showShareItems: ['shareAppMessage', 'shareTimeline']
})
</script>

<template>
  <view class="home-page">

  </view>
</template>

<style lang="scss"></style>
