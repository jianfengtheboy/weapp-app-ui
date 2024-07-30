<script lang="ts" setup>
import { computed, h } from 'vue'
import { switchTab } from '@tarojs/taro'
import { useAppStore } from '@/stores'
import { Home, My } from '@nutui/icons-vue-taro'

const tabBar = [
  {
    pagePath: '/pages/home/home',
    text: '首页',
    icon: h(Home)
  },
  {
    pagePath: '/pages/mine/mine',
    text: '我的',
    icon: h(My)
  }
]

const appStore = useAppStore()
const activeTab = computed(() => appStore.getActiveTab)

const tabSwitch = (_item: any, url: string) => {
  appStore.setActiveTab(url)
  switchTab({ url })
}
</script>
<script lang="ts">
export default {
  options: {
    addGlobalClass: true
  }
}
</script>

<template>
  <nut-tabbar
    :model-value="activeTab"
    bottom safe-area-inset-bottom
    @tab-switch="tabSwitch"
    unactive-color="#333333"
    active-color="#0446C8"
  >
  <nut-tabbar-item v-for="item in tabBar" :key="item.pagePath" :name="item.pagePath" :tab-title="item.text" :icon="item.icon" />
  </nut-tabbar>
</template>
