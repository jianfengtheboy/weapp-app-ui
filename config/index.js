import Components from 'unplugin-vue-components/webpack'
const path = require('path')

const NutUIResolver = () => {
  return (name) => {
    if (name.startsWith('Nut')) {
      const partialName = name.slice(3)
      return {
        name: partialName,
        from: '@nutui/nutui-taro',
        sideEffects: `@nutui/nutui-taro/dist/packages/${partialName.toLowerCase()}/style`,
      }
    }
  }
}

const config = {
  // 项目名称
  projectName: 'weapp-app-ui',
  // 项目创建日期
  date: '2023-6-6',
  // 设计稿尺寸，配置 NutUI 375 尺寸
  designWidth (input) {
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375
    }
    return 750
  },
  // 设计稿尺寸换算规则
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  // 项目源码目录
  sourceRoot: 'src',
  // 项目产出目录，分端打包配置
  outputRoot: `dist/${process.env.TARO_ENV}`,
  // Taro 插件配置
  plugins: ['@tarojs/plugin-html', 'taro-plugin-pinia'],
  // 全局变量设置
  defineConstants: {},
  // 文件 copy 配置
  copy: {
    patterns: [],
    options: {}
  },
  // 配置目录别名
  alias: {
    '@' : path.resolve(__dirname, '..', 'src')
  },
  // 框架，react，nerv，vue, vue3 等
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false }
  },
  // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  cache: {
    enable: false
  },
  // sass文件导入
  sass:{
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`
  },
  // 小程序
  mini: {
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(Components({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        resolvers: [NutUIResolver({ taro: true })]
      }))
    },
    postcss: {
      autoprefixer: {
        enable: true,
      },
      pxtransform: {
        enable: true,
        config: {
          onePxTransform: true,
          unitPrecision: 5,
          propList: ['*'],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0
        }
      },
      // 小程序端样式引用本地资源内联配置
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    // mini-css-extract-plugin 的附加配置
    miniCssExtractPluginOption: {
      ignoreOrder: true
    },
    optimizeMainPackage: {
      enable: true
    }
  },
  // h5
  h5: {
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(Components({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        resolvers: [NutUIResolver({ taro: true })]
      }))
    },
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro', 'icons-vue-taro'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      pxtransform: {
        enable: true,
        config: {
          onePxTransform: true,
          unitPrecision: 5,
          propList: ['*'],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0,
          baseFontSize: 20,
          maxRootSize: 40,
          minRootSize: 20
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    devServer: {
      port: 9000,
      host: '0.0.0.0',
      proxy: {
        '/dev-api': {
          target: 'https://cloud.xxxx.com/development-api',
          changeOrigin: true,
          pathRewrite: {
            '^/dev-api': ''
          }
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
