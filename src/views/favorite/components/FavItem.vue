<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/BaseButton.vue'
import productList from '@/mocks/product.json'
import { computed } from 'vue'
import { useFormat } from '@/composables/useFormat'
import type { Product } from '@/types/models/product.types'
import { useCartStore } from '@/stores/cart'

const { price } = useFormat()

const cartStore = useCartStore()
const { addItem } = cartStore

const props = withDefaults(defineProps<{ product: Product | null }>(), {
  product: () => productList[4]
})

const discountRate = computed(() => 0.8)
const discountText = computed(() => getDiscountText(discountRate.value))

function getDiscountText(rate: number) {
  const percent = Math.round((1 - rate) * 100)
  return `${percent}% OFF`
}

// 是否有特價
const hasDiscount = computed(() => props.product?.isSale || props.product?.isTimeSale)

function addToCart(product: Product) {
  const item = {
    id: product.id,
    name: product.name,
    size: product.size,
    color: product.color,
    price: product.price
  }
  addItem(item)
}
</script>

<template>
  <div v-if="product" class="favorite-item">
    <!-- 第一列：登錄日 及 取消收藏按鈕 -->
    <div class="flex justify-between items-center">
      <p>登錄日：2025/09/03</p>
      <button class="heart-btn">
        <Icon icon="flowbite:heart-solid" width="20" height="20" />
      </button>
    </div>

    <!-- 第二列：商品資訊 -->
    <div class="item-info flex flex-col md:flex-row gap-8">
      <router-link :to="`/product/${product.id}`">
        <div class="img-container">
          <img :src="product.imgs[0].path" alt="" />
        </div>
      </router-link>

      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <div v-if="product.isSale" class="badge w-fit">特價</div>
          <div v-if="product.isTimeSale" class="badge w-fit">限時特價</div>
          <dl>
            <dt>商品名稱</dt>
            <dd>
              <router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
            </dd>
            <dt>商品編號</dt>
            <dd>{{ product.id }}</dd>
            <dt>顏色</dt>
            <dd>{{ product.color }}</dd>
            <dt>尺寸</dt>
            <dd>{{ product.size }}</dd>
            <dt>價格</dt>
            <dd :class="{ 'is-sale': hasDiscount }">
              <p>${{ price(product.price) }}</p>

              <template v-if="hasDiscount">
                <p>
                  ${{ price(product.price * discountRate) }}
                  <span class="discount-text">{{ discountText }}</span>
                </p>
              </template>

              <p class="point">( 63 點數回饋)</p>
            </dd>
          </dl>
        </div>

        <BaseButton v-if="product.inStock" class="max-w-[180px]" @click="addToCart(product)">
          加入購物車
        </BaseButton>
        <BaseButton v-else class="max-w-[180px]" plain>到貨通知</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.favorite-item {
  border-top: 1px solid var(--border-gray);
  padding-block: var(--space-md);
  padding-right: var(--space-md);
}

.heart-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--accent-color);
  background: var(--light-gray);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.item-info {
  dl {
    display: grid;
    grid-template-columns: 70px 1fr;
    gap: 8px 16px;
    font-size: 0.75rem;
  }

  dt,
  dd {
    position: relative;
    display: inline;
    margin: 0;
  }

  dt::after {
    content: '：';
    position: absolute;
    right: 0;
  }

  dd.is-sale {
    p {
      font-weight: bold;
      color: var(--accent-color);
    }

    p:first-of-type {
      color: var(--border-gray);
      text-decoration: line-through;
    }

    .discount-text {
      font-size: 0.625rem;
    }

    .point {
      font-weight: normal;
    }
  }

  .badge {
    font-size: 0.75rem;
    font-weight: bold;
    padding-inline: var(--space-xs);
    color: var(--white);
    background: var(--accent-color);
  }
}

.img-container {
  width: 100%;
  max-width: 160px;
  height: 192px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
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
