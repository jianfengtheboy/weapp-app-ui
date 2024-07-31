import { localStorage } from "@/utils/storage"

// 获取token
export const getToken = () => {
  return localStorage.get('token') || ''
}

// 获取token
export const setToken = (token) => {
  localStorage.set('token', token)
}

// 获取用户信息
export const getUserInfo = () => {
  const emptyInfo: Auth.UserInfo = {
    id: '',
    nickName: '',
    mobile: '',
    avatarUrl: ''
  }
  const userInfo: Auth.UserInfo = localStorage.get('userInfo') || emptyInfo

  return userInfo
}

// 设置用户信息
export const setUserInfo = (userInfo: Auth.UserInfo) => {
  localStorage.set('userInfo', userInfo)
}

// 去除用户相关缓存
export const clearAuthStorage = () => {
  localStorage.remove('token')
  localStorage.remove('userInfo')
}
