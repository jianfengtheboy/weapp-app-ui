import { computed, unref } from 'vue'
import { useRouter } from '@tarojs/taro'

// 获取当前路由
export const useRoutePath = () => {
  const route = useRouter()
  const path = route.path as string
  return path
}

// 获取当前路由参数
export const useRouteParams = () => {
  const route = useRouter()
  const props = computed(() => {
    if (route.params && Object.keys(route.params).length > 0) {
      return route.params
    }
    return ''
  })
  return unref(props)
}
