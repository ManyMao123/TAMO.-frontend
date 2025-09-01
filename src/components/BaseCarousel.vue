<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '@/types/models/product.types'
import { useElementSize, useWindowSize } from '@vueuse/core'

// 幻燈片物件型別
type Slide = {
  image: string
  title: string
  product?: Product | null
} & Record<string, unknown>

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
        product: null
      }
    ],
    slidesPerView: 3,
    slidesPerGroup: 1,
    height: 650,
    enablePagination: true,
    enableAutoplay: false,
    spaceBetween: 10,
    centeredSlides: false
  }
)

const swiperRef = ref()
const currentIndex = ref(0)

// 拿到幻燈片容器的寬度
const { width: swiperWidth } = useElementSize(swiperRef)

// 拿到視窗寬度
const { width: windowWidth } = useWindowSize()

// 判斷是否比 body (視窗) 寬
const isWiderThanBody = computed(() => swiperWidth.value > windowWidth.value)

const uid = Math.random().toString(36).substring(2, 9)
const prevClass = `swiper-button-prev-${uid}`
const nextClass = `swiper-button-next-${uid}`

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
</script>

<template>
  <div class="relative w-full flex flex-col justify-center items-center gap-8">
    <swiper-container
      ref="swiperRef"
      :slides-per-view="slidesPerView"
      :slides-per-group="1"
      :loop="true"
      :space-between="spaceBetween"
      :centered-slides="centeredSlides"
      :pagination="paginationOption"
      :grid="{ rows: 1, fill: 'row' }"
      :navigation="{
        prevEl: '.' + prevClass,
        nextEl: '.' + nextClass
      }"
      :autoplay="autoplayOption"
      :breakpoints="{
        768: {
          slidesPerView: slidesPerView
        }
      }"
      @slidechange="onSlideChange"
      style="padding: 0; width: 100%"
      :style="{ minWidth: width + 'px', maxWidth: width + 'px' }"
      auto-height="true"
    >
      <swiper-slide
        v-for="(item, index) in slides"
        :key="index"
        :style="{ maxHeight: height + 'px' }"
      >
        <slot :item="item" :index="index">
          <!-- 預設插槽：顯示圖片 -->
          <div>
            <img :src="item.image" :alt="item.title" />
          </div>
        </slot>
      </swiper-slide>
    </swiper-container>

    <div :class="['swiper-button-prev', prevClass, isWiderThanBody ? 'left-0' : '-left-12']"></div>
    <div
      :class="['swiper-button-next', nextClass, isWiderThanBody ? 'right-0' : '-right-12']"
    ></div>

    <div class="custom-pagination" v-if="paginationOption">
      <span
        v-for="(_, index) in slides"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="goTo(index)"
      >
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.swiper-button-prev,
.swiper-button-next {
  width: 40px;
  height: 80px;
  position: absolute;
  top: 50%;
  transform: translateY(-100%);
  z-index: 3333;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.swiper-button-prev {
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
