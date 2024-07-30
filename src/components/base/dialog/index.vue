<script lang="ts" setup>
import { VNode } from 'vue'

interface IProps {
  // 标题
  title?: string
  // 内容，支持 HTML 和组件
  content?: string | VNode
  // 点击蒙层是否关闭对话框
  closeOnClickOverlay?: boolean
  // 是否隐藏底部按钮栏
  noFooter?: boolean
  // 是否隐藏确定按钮
  noOkBtn?: boolean
  // 是否隐藏取消按钮
  noCancelBtn?: boolean
  // 取消按钮文案
  cancelText?: string
  // 确定按钮文案
  okText?: string
  // 取消按钮是否默认关闭弹窗
  cancelAutoClose?: boolean
  // 文字对齐方向，可选值同 css 的 text-align 
  textAlign?: string
  // 是否在页面回退时自动关闭
  closeOnPopstate?: boolean
  // 使用横纵方向 可选值 horizontal、vertical
  footerDirection?: 'horizontal' | 'vertical'
  // 自定义遮罩类名
  overlayClass?: string
  // 自定义 popup 弹框类名
  popClass?: string
  // 自定义 class
  customClass?: string
  // 弹框是否显示
  visible: boolean
}

withDefaults(defineProps<IProps>(), {
  title: '提示',
  closeOnClickOverlay: true,
  noFooter: false,
  noOkBtn: false,
  noCancelBtn: false,
  cancelText: '取消',
  okText: '确定',
  cancelAutoClose: true,
  textAlign: 'center',
  closeOnPopstate: false,
  footerDirection: 'horizontal',
  // 自定义class若此处不设置默认值，微信小程序中会默认生成一个 undefined 的class
  overlayClass: '',
  popClass: '',
  customClass: '',
  visible: false
})

const emit = defineEmits(['confirm', 'cancel', 'closed', 'opened'])

// 确定按钮回调
const onOkAction = () => {
  emit('confirm')
}

// 取消按钮回调
const onCancelAction = () => {
  emit('cancel')
}

// 关闭弹框回调
const onClosedAction = () => {
  emit('closed')
}

// 打开弹框回调
const onOpenedAction = () => {
  emit('opened')
}
</script>

<template>
  <nut-dialog
    :visible="visible"
    :title='title'
    :content="content"
    :close-on-click-overlay="closeOnClickOverlay"
    :no-footer="noFooter"
    :no-ok-btn="noOkBtn"
    :no-cancel-btn="noCancelBtn"
    :cancel-text="cancelText"
    :ok-text="okText"
    :cancel-auto-close="cancelAutoClose"
    :text-align="textAlign"
    :close-on-popstate="closeOnPopstate"
    :footer-direction="footerDirection"
    :overlay-class="`${overlayClass}`"
    :pop-class="`${popClass}`"
    :custom-class="`${customClass}`"
    @ok="onOkAction"
    @cancel="onCancelAction"
    @closed="onClosedAction"
    @opened="onOpenedAction"
  >
    <template #default>
      <slot name="default" />
    </template>
  </nut-dialog>
</template>

<style lang="scss">

</style>