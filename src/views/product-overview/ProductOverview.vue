<script setup lang="ts">
import { computed, ref } from 'vue'
import productImages from '@/assets/images/products'
import BaseBreadCrumb from '@/components/BaseBreadCrumb.vue'
import SearchFilter from '@/views/product-overview/components/SearchFilter.vue'
import BasePaginator from '@/components/BasePaginator.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseDrawer from '@/components/BaseDrawer.vue'
import ProductCard from '@/components/ProductCard.vue'
import productList from '@/mocks/product.json'
import { useDevice } from '@/composables/useDevice'
import { Icon } from '@iconify/vue'

const { isMobile } = useDevice()

const breadcrumbs = [
  { label: 'ホーム', href: '/', icon: 'flowbite:home-solid' },
  { label: '商品總覽' }
]

// 搜尋結果
const productCount = computed(() => productList.length)

// tab選擇
const activeTab = ref('showOneColor')

function handlePageChange(page: number) {
  console.log('目前頁數：', page)
  // 可以更新你的資料列表
}

const selected = ref('newest')

const sortOptions = [
  { value: 'recommended', label: '推薦排序' },
  { value: 'newest', label: '依上架時間排序' },
  { value: 'popular', label: '熱門排序' },
  { value: 'reviewRating', label: '評價高的優先排序' },
  { value: 'reviewCount', label: '評論數多的優先排序' },
  { value: 'priceLowToHigh', label: '價格低 → 高' },
  { value: 'priceHighToLow', label: '價格高 → 低' },
  { value: 'discountHighToLow', label: '折扣高的優先排序' }
]
const showDrawer = ref(false)
</script>

<template>
  <div class="w-full flex flex-col gap-4 md:gap-8 max-w-[1300px] h-full px-4 md:px-8">
    <!-- 麵包屑 -->
    <BaseBreadCrumb :breadcrumbs="breadcrumbs"></BaseBreadCrumb>

    <div v-if="isMobile" class="flex justify-between items-end mt-4">
      <div class="text-2xl md:text-3xl mt-2">商品搜尋</div>
      <p class="text-sm">
        搜尋結果
        <span class="text-2xl font-bold">{{ productCount }}</span>
        件
      </p>
    </div>

    <p v-else class="text-3xl mt-2">商品搜尋</p>

    <div class="overview-container grid" :class="{ 'mobile-grid': isMobile }">
      <div v-if="!isMobile" class="w-full max-w-[200px] min-w-[140px] flex flex-col gap-2">
        <div class="text-sm">
          <p>搜尋結果</p>
          <p>
            <span class="text-2xl font-bold">{{ productCount }}</span>
            件
          </p>
        </div>
        <SearchFilter />
      </div>

      <!-- 篩選按鈕 -->
      <button
        v-if="isMobile"
        class="filter-btn flex justify-center items-center gap-1"
        @click="() => (showDrawer = true)"
      >
        <Icon icon="flowbite:filter-outline" width="16" height="16" /> 篩選
      </button>

      <BaseDrawer v-model="showDrawer" :max-width="320" is-rounded> <SearchFilter /></BaseDrawer>

      <div class="w-full">
        <div class="product-list-header flex flex-col items-end gap-4">
          <div class="tab-list w-full flex gap-2">
            <div
              class="tab-item"
              :class="{ 'is-active': activeTab === 'showAllColor' }"
              @click="activeTab = 'showAllColor'"
            >
              多色顯示
            </div>

            <div
              class="tab-item"
              :class="{ 'is-active': activeTab === 'showOneColor' }"
              @click="activeTab = 'showOneColor'"
            >
              單色顯示
            </div>

            <BasePaginator
              class="ml-4 md:ml-10 lg:ml-auto"
              :total-items="100"
              :items-per-page="10"
              @update:currentPage="handlePageChange"
            />
          </div>
          <div class="w-full max-w-[155px]">
            <BaseSelect v-model="selected" :options="sortOptions" />
          </div>
        </div>

        <div class="product-list p-8 grid md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-16">
          <ProductCard v-for="product in productList" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overview-container {
  grid-template-columns: minmax(140px, 200px) 1fr;
  gap: 16px;

  &.mobile-grid {
    grid-template-columns: 1fr;
  }
}

.filter-btn {
  margin-left: auto;
  width: 90px;
  cursor: pointer;
  background: var(--primary-color);
  color: var(--white);
  border-radius: 12px;
  font-size: 0.75rem;
  padding-block: 1px;

  &:hover {
    background: var(--primary-hover);
  }

  &:active {
    background: var(--primary-active);
  }
}

.tab-list {
  border-bottom: 1px solid var(--border-gray);
}

.tab-item {
  position: relative;
  top: 1px;
  text-align: center;
  width: 100%;
  min-width: 100px;
  max-width: 200px;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--border-gray);
  background: var(--light-gray);
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  letter-spacing: 1px;

  &.is-active {
    background: var(--white);
    font-weight: bold;
    border-bottom: none;
  }
}
</style>
