<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import model1 from '@/assets/images/model1.webp'
import model5 from '@/assets/images/model5.webp'
import model6 from '@/assets/images/model6.webp'
import cloth1 from '@/assets/images/cloth1.webp'
import cloth2 from '@/assets/images/cloth2.webp'
import BaseCarousel from '@/components/BaseCarousel.vue'
import ProductCard from '@/components/ProductCard.vue'
import SectionBlock from '@/layouts/SectionBlock.vue'
import productList from '@/mocks/product.json'
import { useRouter } from 'vue-router'
// import type { Product } from '@/types/models/product'

const mainSlides = [
  { image: model1, title: '模特1' },
  { image: cloth1, title: '衣服1' },
  { image: model5, title: '模特5' },
  { image: cloth2, title: '衣服2' },
  { image: model6, title: '模特6' },
  { image: model1, title: '模特1-測試輪播' },
  { image: cloth1, title: '衣服1-測試輪播' },
  { image: model5, title: '模特5-測試輪播' },
  { image: cloth2, title: '衣服2-測試輪播' },
  { image: model6, title: '模特6-測試輪播' },
  { image: model5, title: '模特5-測試輪播' }
]

const newClothSlides = productList.map(product => ({
  image: product.imgs[0].path,
  title: product.name,
  product: product
}))

// 取得目前視窗寬高
const { width } = useWindowSize()

// 主幻燈片設定
const mainSliderWidth = computed(() => {
  if (width.value >= 1280) return 2900
  else if (width.value >= 540) return 1280
  else return 540
})
const mainSliderHeight = computed(() => {
  if (width.value >= 1280) return 780
  else return 680
})
const mainSlidesPerView = computed(() => {
  if (width.value >= 1280) return 5
  else if (width.value >= 540) return 3
  else return 1
})

// 商品幻燈片設定
const productSlidesPerView = computed(() => {
  if (width.value >= 1280) return 4
  else if (width.value >= 768) return 3
  else if (width.value >= 540) return 2
  else return 1
})

const router = useRouter()
// 頁面切換
const goToOverview = (condition: Record<string, string>) => {
  router.push({ name: 'ProductOverview', query: { ...condition } })
}
</script>

<template>
  <div class="flex flex-col items-center flex-1 lg:gap-8 gap-6 overflow-hidden">
    <!-- 首頁大幻燈片 -->
    <BaseCarousel
      :slides="mainSlides"
      :slides-per-view="mainSlidesPerView"
      :enable-autoplay="true"
      :width="mainSliderWidth"
      :height="mainSliderHeight"
      :space-between="20"
      :centered-slides="true"
    ></BaseCarousel>

    <!-- 下單提醒 -->
    <p class="order-rule">下午1點前下單，訂單將於當日出貨 <span>( ※ 部分商品不適用 )</span>。</p>

    <!-- 活動網頁 -->
    <div class="img-container w-[400px] md:w-[600px]">
      <img src="../../assets/images/fair.webp" />
    </div>

    <SectionBlock :title="'推薦關鍵字搜尋'" :subTitle="'HOT KEYWORDS'">
      <div class="grid grid-cols-2 md:flex gap-8">
        <div class="category-container" @click="goToOverview({ gender: 'female' })">
          <!-- 圖片+文字 -->
          <img
            src="../../assets/images/products/4222509_base.webp"
            alt="外套"
            class="category-container__image"
          />
          <p>外套</p>
        </div>
        <div class="category-container">
          <!-- 圖片+文字 -->
          <img
            src="../../assets/images/products/4249137_base.webp"
            alt="上衣"
            class="category-container__image"
          />
          <p>上衣</p>
        </div>
        <div class="category-container">
          <!-- 圖片+文字 -->
          <img
            src="../../assets/images/products/4167142_base.webp"
            alt="襯衫"
            class="category-container__image"
          />
          <p>襯衫</p>
        </div>
        <div class="category-container">
          <!-- 圖片+文字 -->
          <img
            src="../../assets/images/products/4248752_base.webp"
            alt="牛仔單品"
            class="category-container__image"
          />
          <p>牛仔單品</p>
        </div>
      </div>
    </SectionBlock>

    <SectionBlock :title="'最新商品'" :subTitle="'NEW ITEM'">
      <BaseCarousel
        :slides="newClothSlides"
        :slides-per-view="productSlidesPerView"
        :slides-per-group="productSlidesPerView"
        :enable-pagination="false"
        :spaceBetween="4"
      >
        <template #default="{ item }">
          <ProductCard :product="item.product || null" />
        </template>
      </BaseCarousel>
    </SectionBlock>

    <SectionBlock :title="'熱銷排行'" :subTitle="'ITEM RANKING'">
      <BaseCarousel
        :slides="newClothSlides"
        :slides-per-view="productSlidesPerView"
        :slides-per-group="productSlidesPerView"
        :enable-pagination="false"
        :spaceBetween="4"
      >
        <template #default="{ item }">
          <ProductCard :product="item.product || null" />
        </template>
      </BaseCarousel>
    </SectionBlock>

    <SectionBlock :title="'選品搜尋'" :subTitle="'SELECT BRAND'"> </SectionBlock>

    <SectionBlock :title="'推薦商品'" :subTitle="'RECOMMEND ITEM'"> </SectionBlock>
  </div>
</template>

<style scoped lang="scss">
.order-rule {
  font-size: 0.875rem;
  border-top: 1px solid var(--light-gray);
  border-bottom: 1px solid var(--light-gray);
  padding-block: var(--space-md);

  span {
    font-size: 0.75rem;
  }
}
.category-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  position: relative;

  &__image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;

    @media (width> 768px) {
      width: 120px;
      height: 120px;
    }
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0);
    transition: background 0.2s ease;
  }

  &:hover::after {
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>
