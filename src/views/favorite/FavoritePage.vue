<script setup lang="ts">
import { computed } from 'vue'
import BaseBreadCrumb from '@/components/BaseBreadCrumb.vue'
import SectionBlock from '@/layouts/SectionBlock.vue'
import FavItem from './components/FavItem.vue'
import productList from '@/mocks/product.json'

const breadcrumbs = [
  { label: 'ホーム', href: '/', icon: 'flowbite:home-solid' },
  { label: '個人頁面', href: '/tops' },
  { label: '收藏清單' }
]

// 收藏清單件數
const favCount = computed(() => productList.length)
</script>

<template>
  <div class="w-full flex flex-col gap-8 max-w-[1300px] h-full px-4">
    <!-- 麵包屑 -->
    <BaseBreadCrumb :breadcrumbs="breadcrumbs"></BaseBreadCrumb>
    <SectionBlock :title="'收藏清單'" :subTitle="'FAVORITE'">
      <div class="list-section grid gap-2">
        <FavItem v-for="product in productList" :key="product.id" :product="product"></FavItem>
      </div>

      <p class="text-right text-xs">全{{ favCount }}件</p>
    </SectionBlock>
  </div>
</template>

<style scoped lang="scss">
.list-section {
  grid-template-columns: 1fr;

  @media (width > 1200px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
