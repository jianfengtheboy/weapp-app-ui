export default defineAppConfig({
  pages: [
    'pages/home/home',
    'pages/mine/mine'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'taro微信小程序项目模版',
    navigationBarTextStyle: 'black'
  },
  subPackages: [
    {
      // 首页相关
      root: 'packages/home',
      pages: [
        // some pages ...
      ]
    },
    {
      // 我的
      root: 'packages/mine',
      pages: [
        // some pages ...
      ]
    }
  ],
  tabBar: {
    // 是否开启自定义tabbar
    // custom: true,
    color: '#333333',
    selectedColor: '#0446C8',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/home',
        text: '首页',
        iconPath: 'assets/images/tabbar/tab_home.png',
        selectedIconPath: 'assets/images/tabbar/tab_home_selected.png'
      },
      {
        pagePath: 'pages/mine/mine',
        text: '我的',
        iconPath: 'assets/images/tabbar/tab_mine.png',
        selectedIconPath: 'assets/images/tabbar/tab_mine_selected.png'
      }
    ]
  }
})
