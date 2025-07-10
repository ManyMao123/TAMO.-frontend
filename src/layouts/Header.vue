<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })

const headerLeftSelected: Ref<boolean> = ref(true)

const categoryList = ['WOMEN', 'MEN', 'KIDS', 'LIFESTYLE']
const categorySelectedIndex: Ref<null | number> = ref(null)
</script>

<template>
  <header>
    <!-- 最上方的兩大區塊 -->
    <div class="header-container">
      <div :class="{ 'is-selected': headerLeftSelected }" @click="headerLeftSelected = true">
        <div class="img-container">
          <img src="../assets/images/logo.svg" alt="logo.svg" />
        </div>
      </div>

      <div :class="{ 'is-selected': !headerLeftSelected }" @click="headerLeftSelected = false">
        <div class="img-container">
          <!-- <img src="" alt="" /> -->
          <!-- 先隨便用文字代替 -->
          <span>MEDIA</span>
        </div>
      </div>
    </div>

    <!-- 分類及搜尋列 -->
    <div class="category-container">
      <ul class="category-list flex p-2 lg:p-4">
        <li
          class="category-item"
          v-for="(item, index) in categoryList"
          :key="index"
          :class="{ selected: categorySelectedIndex === index }"
          @click="categorySelectedIndex = index"
        >
          {{ item }}
        </li>
      </ul>

      <div class="search-container">
        <!-- input + search button -->
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  border-bottom: 1px solid #e5e5e5;
}

.header-container {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e5e5e5;

  div {
    width: 100%;
    height: 87px;

    &.is-selected {
      border-bottom: 8px solid var(--secondary-color);
    }
  }
  .img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
      // width: 100%;
      // height: 100%;
    }

    span {
      color: var(--secondary-color);
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
}

.category-container {
  margin-inline: var(--space-xs);

  @media (width > 768px) {
    margin-inline: var(--space-xl);
  }

  @media (width > 1280px) {
    margin-inline: var(--space-8xl);
  }
}

.category-list {
  height: 50px;

  @media (width > 1280px) {
    height: 70px;
  }
}

.category-item {
  width: 100%;
  max-width: 140px;
  padding-block: var(--space-sm);
  padding-inline: var(--space-sm);
  cursor: pointer;
  letter-spacing: 2px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (width > 1280px) {
    max-width: 140px;
    padding-inline: var(--space-lg);
  }

  &.selected {
    background-color: var(--secondary-color);
    color: var(--white);
  }
}
</style>
