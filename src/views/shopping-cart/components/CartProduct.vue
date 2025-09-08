<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useFormat } from '@/composables/useFormat'
import type { CartItem } from '@/types/models/cart.types'

const cartStore = useCartStore()
const { removeItem } = cartStore

const { price, currency } = useFormat()

const props = defineProps<{
  product: CartItem | null
}>()

const count = ref('1')
</script>

<template>
  <div v-if="product" class="product h-full max-h-[300px] md:max-h-[240px] flex gap-4">
    <router-link :to="`/product/${product.id}`">
      <div class="img-container">
        <img src="../../../assets/images/products/P4167/4167084_white.jpg" alt="" />
      </div>
    </router-link>
    <div class="product-info grid w-full">
      <div class="product-info__item flex flex-col gap-4">
        <router-link :to="`/product/${product.id}`">
          <div class="title">{{ product.name }}</div>
        </router-link>
        <ul class="content">
          <li>商品編號：{{ product.id }}</li>
          <li>顏色：{{ product.color }}</li>
          <li>尺寸：{{ product.size }}</li>
        </ul>
      </div>

      <div class="product-info__price">{{ currency(product.price) }}</div>

      <div class="product-info__count flex flex-col gap-2 items-end max-w-[80px] ml-auto">
        <BaseInput
          :model-value="product.quantity.toString()"
          @update:model-value="(val: string) => $emit('update-quantity', val)"
          type="number"
        ></BaseInput>

        <p class="del" @click="removeItem(product.id)">刪除</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product:not(:first-of-type) {
  border-top: 1px solid var(--border-gray);
  padding-top: 32px;
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

.img-container {
  flex: 0 0 auto;
  width: 160px;
  height: 192px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
