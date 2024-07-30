<script lang="ts" setup>
import Taro from '@tarojs/taro'

// 页面配置
definePageConfig({
  navigationBarTitleText: '我的'
})

Taro.showShareMenu({
  withShareTicket: true,
  showShareItems: ['shareAppMessage', 'shareTimeline']
})
</script>

<template>
  <view class="mine-page">

  </view>
</template>

<style lang="scss"></style>
