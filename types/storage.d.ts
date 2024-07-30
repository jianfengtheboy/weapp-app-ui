declare namespace StorageInterface {
  interface Local {
    /** 用户token */
    token: string
    /** 用户信息 */
    userInfo: Auth.UserInfo
  }
}