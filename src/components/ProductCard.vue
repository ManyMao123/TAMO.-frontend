<script setup lang="ts">
import type { Product } from '@/types/models/product.types'
import numeral from 'numeral'
import productSample from '@/assets/images/products/P4167/4167142_yellow.webp'
import { useRouter } from 'vue-router'
import productList from '@/mocks/product.json'
import { computed } from 'vue'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

const props = withDefaults(defineProps<{ product: Product | null }>(), {
  product: () => productList[0]
})

const router = useRouter()

function handleClick() {
  router.push({ name: 'ProductPage', params: { id: '1' } })
}

const isNew = computed(() => {
  const today = dayjs()
  const oneWeekAgo = today.subtract(7, 'day')
  return dayjs(props.product?.releaseDate).isBetween(oneWeekAgo, today, null, '[]')
})
</script>

<template>
  <div class="product-card flex flex-col" @click="handleClick">
    <div class="product-card__badge w-fit" v-if="isNew">新品</div>
    <img class="product-card__image" :src="product?.imgs[0].path" />
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
  position: relative;

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

  &__badge {
    position: absolute;
    font-size: 0.75rem;
    font-weight: bold;
    top: -20px;
  }

  &__image {
  }

  &__detail {
    // display: flex;
    // flex-direction: column;
    padding-block: 8px;
    font-size: 0.875rem;

    span {
      font-weight: bold;
      font-size: 1.25rem;
    }
  }
}
</style>
