import { statusMap } from '@/config/enum'

// 格式化状态类型
export const formatStatusType = (status: number) => {
  return statusMap.get(status) || ''
}

