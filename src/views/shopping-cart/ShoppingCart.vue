<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseCarousel from '@/components/BaseCarousel.vue'
import BaseInput from '@/components/BaseInput.vue'
import SectionBlock from '@/layouts/SectionBlock.vue'
import productList from '@/mocks/product.json'
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

const newClothSlides = productList.map(product => ({
  image: product.imgs[0].path,
  title: product.name,
  product: product
}))

// 取得目前視窗寬高
const { width } = useWindowSize()

// 商品幻燈片設定
const productSlidesPerView = computed(() => {
  if (width.value >= 1280) return 4
  else if (width.value >= 768) return 3
  else return 1
})

const count = ref('1')
</script>

<template>
  <div class="w-full flex flex-col gap-8 max-w-[1200px] h-full px-4">
    <!-- 結帳流程 -->
    <div class="steps-container w-full max-w-[696px] mx-auto">
      <div class="checkout-step w-full flex gap-2">
        <div>購物車確認</div>
        <div>選擇訂購方式</div>
        <div>訂單確認</div>
        <div>訂單完成</div>
      </div>
      <div class="checkout-progress">
        <div class="checkout-progress__bar" style="width: 25%"></div>
      </div>
    </div>

    <!-- 購物車 -->
    <!-- 標題-->
    <div class="text-2xl font-bold">一般商品購物車</div>
    <!-- 細節文字-->
    <div class="text-sm">
      <p>現在下單即可享免運！</p>
      <p>可獲得<span class="highlight"> 129 點 </span>回饋（需註冊並登入後購買）。</p>
    </div>

    <div class="flex flex-col md:flex-row justify-between gap-4 md:gap-16">
      <!-- 購物車區塊 -->
      <div class="cart-section flex flex-col gap-8 w-full max-w-[850px]">
        <!-- 商品列表 -->
        <div class="product h-full max-h-[300px] md:max-h-[172px] flex gap-4">
          <img src="./../../assets/images/products/P4167/4167084_white.jpg" alt="" />

          <div class="product-info grid w-full">
            <div class="product-info__item flex flex-col gap-4">
              <div class="title">抽繩襯衫搭配束胸背心套裝</div>
              <ul class="content">
                <li>商品編號：KBA6-23J140</li>
                <li>顏色：YELLOW BEG</li>
                <li>尺寸：S</li>
              </ul>
            </div>

            <div class="product-info__price">$1,980</div>

            <div class="product-info__count flex flex-col gap-2 items-end max-w-[80px] ml-auto">
              <BaseInput v-model="count" type="number"></BaseInput>

              <p class="del">刪除</p>
            </div>
          </div>

          <!-- 加條件：最後一個item不需顯示 -->
          <div v-if="false" class="product-divider"></div>
        </div>
        <ul class="alert-notice">
          <li>※折扣商品、優惠券、禮品包裝無法退換貨</li>
          <li>※無法包裝的商品不能選擇禮品包裝</li>
          <li>※門市調貨可能缺貨 / 訂單可能取消</li>
        </ul>
      </div>

      <div class="flex flex-col flex-1 items-center gap-4">
        <!-- 最後金額 & 結帳按鈕 -->
        <div class="checkout-summary flex flex-col gap-4 w-full md:max-w-[250px] items-center">
          <p class="text-xs">同意本網站的<a>使用條款</a>後下單</p>
          <BaseButton class="max-w-[240px]">前往結帳</BaseButton>
          <div class="product-divider mt-4"></div>
          <p class="text-sm">訂單總額：<span class="text-2xl font-bold">$7,425</span></p>
        </div>

        <p class="underline text-sm">繼續購物</p>
      </div>
    </div>

    <SectionBlock :title="'最近看過的商品'">
      <BaseCarousel
        :slides="newClothSlides"
        :slides-per-view="productSlidesPerView"
        :slides-per-group="productSlidesPerView"
        :height="420"
        :enable-pagination="false"
        :spaceBetween="4"
      >
        <template #default="{ item }">
          <ProductCard :product="item.product || null" />
        </template>
      </BaseCarousel>
    </SectionBlock>
  </div>
</template>

<style scoped lang="scss">
.checkout-summary {
  background: var(--light-gray);
  padding: 24px;
  height: fit-content;
  margin: auto;
  @media (width > 768px) {
    margin: inherit;
  }
}
.steps-container {
  background: var(--light-gray);
}

.checkout-step {
  > div {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;

    &.is-active {
      font-weight: bold;
    }
  }
}

.checkout-progress {
  width: 100%;
  height: 2px;
  background-color: var(--border-gray);
  overflow: hidden;

  &__bar {
    height: 100%;
    width: 0;
    background-color: var(--secondary-color);
    transition: width 0.3s ease;
  }
}

.highlight {
  color: var(--highlight-color);
  font-weight: bold;
}

.cart-section {
  border: 1px solid var(--border-gray);
  padding: 30px;
  border-radius: 2px;

  img {
    height: 100%;
  }
}

.product-divider {
  width: 100%;
  border-top: 1px solid var(--border-gray);
}

.product-info {
  // grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (width > 1200px) {
    grid-template-columns: minmax(360px, 1fr) 1fr 1fr;
  }

  &__item {
    .title {
      font-weight: bold;
    }

    .content {
      color: var(--secondary-color);
      font-size: 0.75rem;
      line-height: 1.4rem;
    }
  }

  &__price {
    font-weight: bold;
    margin-left: auto;
    @media (width > 1200px) {
      margin-left: inherit;
    }
  }

  &__count {
    p.del {
      text-decoration: underline;
      font-size: 0.75rem;
      user-select: none;
      cursor: pointer;
    }
  }
}

.alert-notice {
  font-size: 0.7rem;
  color: var(--accent-color);
  line-height: 1.2rem;
}
</style>
