<script setup lang="ts">
import { ref } from 'vue'
import BaseBreadCrumb from '@/components/BaseBreadCrumb.vue'
import productImages from '@/assets/images/products'
import numeral from 'numeral'
// import type { Product } from '@/types/models/product'

const newClothSlides = productImages.map((img, index) => ({
  id: 1,
  name: '棉質巴里紗細褶罩衫',
  price: 1500,
  inStock: true,
  img: img
}))
</script>

<template>
  <div class="flex flex-col gap-8 mx-auto">
    <!-- 麵包屑 -->
    <BaseBreadCrumb class=""></BaseBreadCrumb>
    <div class="grid grid-cols-2 gap-20">
      <div class="product-pic">
        <div class="w-[600px]">
          <img :src="newClothSlides[0].img" alt="" />
        </div>
        <p class="product-pic__type">IVORY</p>
        <p class="product-pic__model">身高 : 162cm 尺寸 : one</p>

        <!-- 款式選擇 -->
        <div>
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
        <!-- 商品細節照片-->
        <div>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>

      <div class="product-info">
        <p class="product-info__name">衣服名稱</p>
        <p class="product-info__price">{{ '$' + numeral(1650).format('0,0') }}</p>
        <p class="product-info__rating">⭐⭐⭐⭐</p>
        <p class="product-info__favorites">收藏數 333</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-pic {
  display: flex;
  flex-direction: column;
  gap: 8px;
  &__type {
  }
  &__model {
  }
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  &__name {
    font-size: 1.25rem;
    font-weight: bold;
  }

  &__price {
    font-size: 2.125rem;
  }

  &__rating {
  }
  &__favorites {
    font-size: 0.875rem;
    font-weight: bold;
  }
}
</style>
