<script lang="ts" setup>
interface IProps {
  // 描述文字
  description?: string,
  // 图片
  image?: 'empty' | 'error' | 'network' | string
  // 图片大小
  imageSize?: string | number
  // 自定义图片
  customImage?: string
}

withDefaults(defineProps<IProps>(), {
  description: '',
  image: 'empty',
  imageSize: '',
  customImage: ''
})
</script>

<template>
  <nut-empty class="custom-empty" :image="image" :image-size="imageSize" :description="description">
    <template #image v-if="customImage">
      <img class="empty-image" :src="customImage" alt="暂无数据">
    </template>
    <slot />
  </nut-empty>
</template>

<style lang="scss">
.custom-empty {
  .nut-empty__box {
    width: 142px;
    height: 200px;
  }

  .nut-empty__description {
    margin-top: 36px;
    font-size: 28px;
    color: #333;
  }
}
</style>