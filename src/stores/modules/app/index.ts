import { defineStore } from 'pinia'
import { useRoutePath } from '@/composables/route'

interface IState {
  // 当前页
  activeTab: string
}

export const useAppStore = defineStore('app', {
  state: (): IState => ({
    activeTab: useRoutePath()
  }),
  getters: {
    // 获取当前页
    getActiveTab: state => state.activeTab
  },
  actions: {
    // 设置当前页
    setActiveTab(tab: string) {
      this.activeTab = tab
    },
    // 重置app状态
    resetAppStore() {
      this.$reset()
    }
  }
})