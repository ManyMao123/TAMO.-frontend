<script setup lang="ts">
import { ref } from 'vue'
import type { ColorOptionItem } from '@/types/models/searchFilters.types'
import { searchFilterOptions } from '@/types/models/searchFilters.options'
import RangeSlider from '@/components/RangeSlider.vue'

// 特定項目(key)顯示range條
const filterKeysIsRange = ['priceRange']
// 特定項目(key)顯示確認按鈕
const filterKeysHasBtn = ['color', 'priceRange']

const priceRange = ref({ min: 0, max: 10000 })
</script>

<template>
  <div class="search-filter">
    <div v-for="(option, key) in searchFilterOptions" :key="key">
      <div class="search-filter__header">{{ option.title }}</div>
      <ul class="search-filter__item">
        <li v-for="item in option.options" :key="item.value ?? '1'">
          <template v-if="key === 'color'">
            <div
              class="color-circle"
              :style="`background-color:${(item as ColorOptionItem).color};`"
            ></div>
          </template>

          {{ item.label }}
        </li>

        <div v-if="filterKeysIsRange.includes(key)" class="flex flex-col gap-4 py-4 px-4">
          <RangeSlider v-model="priceRange" :minValue="0" :maxValue="10000" class="mx-2" />
          <div class="flex gap-4 w-full">
            <div class="price-field">
              <input v-model="priceRange.min" type="text" />
            </div>
            <div class="price-field">
              <input v-model="priceRange.max" type="text" />
            </div>
          </div>
        </div>

        <div v-if="filterKeysHasBtn.includes(key)" class="flex gap-2 px-4 mt-4">
          <button>清除</button>
          <button class="is-filled">確定</button>
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-filter {
  margin-block: var(--space-md);

  > div {
    padding-block: var(--space-md);
  }
}

.search-filter__header {
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px solid var(--light-gray);
  padding-bottom: var(--space-xs);
}

.search-filter__item {
  padding-block: var(--space-xs);

  li {
    font-size: 0.75rem;
    padding-inline: var(--space-md);
    padding-block: var(--space-xs);
    cursor: pointer;
    display: flex;
    gap: 4px;
    align-items: center;

    &:hover {
      background: var(--light-gray);
    }
  }
}

.color-circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #ccc;
}

button {
  border: 1px solid var(--secondary-color);
  font-size: 0.75rem;
  width: 100%;
  max-width: 78px;
  cursor: pointer;
  padding: 2px;

  &.is-filled {
    background: var(--secondary-color);
    color: var(--white);
  }

  &:hover {
    background: var(--light-brown);
    border-color: var(--light-brown);
    color: var(--white);
  }
}

.price-field {
  display: flex;
  gap: 4px;
  width: 100%;
  border-bottom: 1px solid var(--secondary-color);
  font-size: 0.75rem;

  &::after {
    content: '元';
  }

  input {
    width: 100%;
    outline: none;
  }
}
</style>
