<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import { Icon } from '@iconify/vue'

withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })

const categoryList = ['WOMEN', 'MEN', 'KIDS', 'LIFESTYLE']
const categorySelectedIndex: Ref<null | number> = ref(null)
</script>

<template>
  <!-- 分類及搜尋列 -->
  <div class="category-container flex justify-between items-center">
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

    <div class="search-container flex">
      <!-- input + search button -->
      <BaseInput :placeholder="'有什麼想找的嗎？'">
        <template #suffix>
          <button>
            <Icon icon="flowbite:search-outline" width="24" height="24" />
          </button>
        </template>
      </BaseInput>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category-container {
  padding-inline: var(--space-xs);
  border-bottom: 1px solid #e5e5e5;

  @media (width > 768px) {
    padding-inline: var(--space-xl);
  }

  @media (width > 1280px) {
    padding-inline: var(--space-8xl);
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

.search-container {
  width: 300px;

  button {
    min-width: 50px;
    min-height: 42px;
    background: var(--secondary-color);
    color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
