<script setup lang="ts">
import type { Product } from '@/types/models/product'
import numeral from 'numeral'
import productSample from '@/assets/images/products/4167142_base.webp'

withDefaults(defineProps<{ product: Product | null }>(), {
  product: () => ({
    id: 1,
    name: '棉質巴里紗細褶罩衫',
    price: 1500,
    inStock: true,
    stockQty: 40,
    img: productSample,
    categoryId: '1'
  })
})
</script>

<template>
  <div class="product-card flex flex-col">
    <img class="product-card__image" :src="product?.img" />
    <div class="product-card__detail">
      <p>{{ product?.name || '' }}</p>
      <span>{{ product?.price ? numeral(product?.price).format('0,0') : '' }}</span>
      元
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-card {
  display: flex;
  cursor: pointer;

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

  &__image {
  }

  &__detail {
    // display: flex;
    // flex-direction: column;
    padding: 8px;
    font-size: 0.875rem;

    span {
      font-weight: bold;
      font-size: 1.25rem;
    }
  }
}
</style>
