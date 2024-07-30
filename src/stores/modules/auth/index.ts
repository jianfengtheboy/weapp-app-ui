import { defineStore } from "pinia"
import { getUserInfo, getToken } from "./helpers"

interface IAuthState {
  // 用户信息
  userInfo: Auth.UserInfo
  // 用户token
  token: string
}

export const useAuthStore = defineStore("authStore", {
  state: (): IAuthState => ({
    userInfo: getUserInfo(),
    token: getToken()
  }),
  getters: {
    // 是否登录
    isLogin: (state) => !!state.token
  },
  actions: {
    // 重置auth状态
    resetAuthStore() {
      this.token = null
    }
  }
})
