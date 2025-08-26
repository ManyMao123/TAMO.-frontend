<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="search-container py-8">
    <div class="search-section px-7 pb-8">
      <p class="text-2xl font-bold tracking-wide py-4">商品搜尋</p>
      <!-- 搜尋input -->
      <div class="flex">
        <BaseInput :placeholder="'有什麼想找的嗎？'">
          <template #suffix>
            <button>
              <Icon icon="flowbite:search-outline" width="32" height="32" />
            </button>
          </template>
        </BaseInput>
      </div>
    </div>

    <!-- 列表 -->
    <div class="list-section">
      <ul class="">
        <li>從分類搜尋找起</li>
        <li>從出清商品中探索</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-container {
  button {
    min-width: 64px;
    min-height: 55px;
    background: var(--secondary-color);
    color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
.search-section {
  border-bottom: 1px solid var(--light-gray);
}

// 清單樣式
.list-section {
  ul li {
    border-bottom: 1px solid var(--light-gray);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 24px;
    padding-inline: 24px;

    &::after {
      content: '';
      border-top: 2px solid var(--light-brown);
      border-right: 2px solid var(--light-brown);
      width: 10px;
      height: 10px;
      transform: rotate(45deg);
      margin-left: auto;
    }

    &:hover {
      background: var(--light-gray);
    }
  }
}
</style>
