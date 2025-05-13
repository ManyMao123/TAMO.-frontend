<script setup lang="ts">
import { ref, computed } from 'vue'

// // Swiper 元件與模組
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import { Autoplay, Pagination, Navigation } from 'swiper/modules'

// // 引入樣式（建議放到 main.js 中，但這裡也可行）
// import 'swiper/css'
// import 'swiper/css/pagination'
// import 'swiper/css/navigation'

// 幻燈片物件型別
type Slide = {
  image: string
  title: string
}

const props = withDefaults(
  defineProps<{
    slides: Slide[]
    slidesPerView?: number
    height?: number
    enablePagination?: boolean
    spaceBetween?: number
  }>(),
  {
    slides: () => [{ image: '', title: '幻燈片' }],
    slidesPerView: 3,
    height: 650,
    enablePagination: true,
    spaceBetween: 10
  }
)

const onProgress = e => {
  const [swiper, progress] = e.detail
  console.log(progress)
}

const onSlideChange = e => {
  console.log('slide changed')
}

// 分頁器設定
const paginationOption = computed(() =>
  props.enablePagination ? { clickable: true, hideOnClick: false } : false
)
</script>

<template>
  <swiper-container
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    :centered-slides="false"
    :pagination="paginationOption"
    :breakpoints="{
      768: {
        slidesPerView: slidesPerView
      }
    }"
    @swiperprogress="onProgress"
    @swiperslidechange="onSlideChange"
    style="width: 100%; max-width: 1200px"
    :style="{ height: `${height}px` }"
  >
    <swiper-slide v-for="(item, index) in slides" :key="index">
      <img :src="item.image" :alt="item.title" />
    </swiper-slide>
  </swiper-container>
</template>

<style scoped lang="scss"></style>
