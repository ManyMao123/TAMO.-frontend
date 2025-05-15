<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import type { Product } from '@/types/models/product'

// 幻燈片物件型別
type Slide = {
  image: string
  title: string
  onlyImg: boolean
  product?: Product
}

const props = withDefaults(
  defineProps<{
    slides: Slide[]
    slidesPerView?: number
    slidesPerGroup?: number
    width?: number
    height?: number
    enablePagination?: boolean
    enableAutoplay?: boolean
    spaceBetween?: number
    centeredSlides?: boolean
    navigation?: boolean
  }>(),
  {
    slides: () => [
      {
        image: '',
        title: '幻燈片',
        onlyImg: true,
        product: {
          id: 1,
          name: '棉質巴里紗細褶罩衫',
          price: 1500,
          inStock: true,
          img: ''
        }
      }
    ],
    slidesPerView: 3,
    slidesPerGroup: 1,
    width: 1200,
    height: 650,
    enablePagination: true,
    enableAutoplay: false,
    spaceBetween: 10,
    centeredSlides: false
  }
)

const swiperRef = ref()
const currentIndex = ref(0)

const onSlideChange = () => {
  const swiper = swiperRef.value?.swiper
  // console.log(swiper)
  if (swiper) {
    currentIndex.value = swiper.realIndex
  }
}

// 分頁器設定
const paginationOption = computed(() =>
  props.enablePagination
    ? {
        clickable: true,
        hideOnClick: false,
        type: 'custom'
      }
    : false
)

// 自動撥放設定
const autoplayOption = computed(() => (props.enableAutoplay ? { delay: 5000 } : false))

// 分頁器點擊
const goTo = (index: number) => {
  swiperRef.value.swiper.slideTo(index)
  currentIndex.value = index
}

// 箭頭往前
const slidePrev = () => {
  const swiper = swiperRef.value?.swiper
  swiper?.slidePrev()
}

// 箭頭往後
const slideNext = () => {
  const swiper = swiperRef.value?.swiper
  swiper?.slideNext()
}
</script>

<template>
  <swiper-container
    ref="swiperRef"
    :slides-per-view="slidesPerView"
    :slides-per-group="1"
    :loop="true"
    :space-between="spaceBetween"
    :centered-slides="centeredSlides"
    :pagination="paginationOption"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }"
    :autoplay="autoplayOption"
    :breakpoints="{
      768: {
        slidesPerView: slidesPerView
      }
    }"
    @slidechange="onSlideChange"
    style="padding: 0"
    :style="{ height: `${height}px`, width: `${width}px` }"
  >
    <swiper-slide v-for="(item, index) in slides" :key="index">
      <img v-if="item.onlyImg" :src="item.image" :alt="item.title" />
      <ProductCard v-else :product="item.product || null"></ProductCard>
    </swiper-slide>
  </swiper-container>

  <div class="swiper-button-prev" @click="slidePrev"></div>
  <div class="swiper-button-next" @click="slideNext"></div>

  <div class="custom-pagination" v-if="paginationOption">
    <span
      v-for="(_, index) in slides"
      :key="index"
      :class="{ active: index === currentIndex }"
      @click="goTo(index)"
    >
    </span>
  </div>
</template>

<style scoped lang="scss">
.swiper-button-prev,
.swiper-button-next {
  width: 40px;
  height: 80px;
  position: absolute;
  top: 450px;
  z-index: 3333;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.swiper-button-prev {
  left: 0;

  &::after {
    content: '';
    position: absolute;
    display: block;
    top: 31px;
    left: 15px;
    right: 12px;
    width: 12px;
    height: 12px;
    border-top: solid 2px;
    border-right: solid 2px;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
    color: inherit;
  }
}

.swiper-button-next {
  right: 0;

  &::after {
    content: '';
    position: absolute;
    display: block;
    top: 31px;
    left: 10px;
    right: 12px;
    width: 12px;
    height: 12px;
    border-top: solid 2px;
    border-right: solid 2px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    color: inherit;
  }
}

.custom-pagination {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  justify-content: center;
  width: 350px;
}

.custom-pagination span {
  width: 100%;
  height: 4px;
  background-color: #dcdcdc;
  border-radius: 0;
  opacity: 0.75;
  cursor: pointer;
}

.custom-pagination span.active {
  width: 100%;
  height: 4px;
  background-color: var(--secondary-color);
  border-radius: 0;
  opacity: 1;
}
</style>
