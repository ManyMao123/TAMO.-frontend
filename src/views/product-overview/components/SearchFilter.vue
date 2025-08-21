<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ColorOptionItem } from '@/types/models/searchFilters.types'
import { searchFilterOptions } from '@/types/models/searchFilters.options'
import RangeSlider from '@/components/RangeSlider.vue'
import { Icon } from '@iconify/vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import CheckboxGroup from '@/components/CheckboxGroup.vue'
import { useDevice } from '@/composables/useDevice'

const { isMobile } = useDevice()

// 特定項目(key)顯示range條
const filterKeysIsRange = ['priceRange']
// 特定項目(key)顯示確認按鈕
const filterKeysHasBtn = ['color', 'priceRange']

// 顏色選擇器，呈現顏色圓形的樣式
const colorCircleStyle = (payload: ColorOptionItem) => {
  let styleString = ''

  // 若顏色為「其他色」， border 為虛線
  if (payload.value === 'other') styleString += 'border: 1px dashed #999; '

  // 若顏色為「金色」或「銀色」
  if (payload.value === 'gold') {
    styleString += `background: linear-gradient(
      -45deg,
       #fee88f 0%,
      #f4dc7a 40%,
      #fff7aa 60%,
      #f4dc7a 80%,
       #fee88f 100%
    ); `
  } else if (payload.value === 'silver') {
    styleString += `background: linear-gradient(
      -45deg,
      #e8e8e8 0%,
      #d4d4d4 40%,
      #ffffff 60%,
      #d4d4d4 80%,
      #e8e8e8 100%
    );`
  } else {
    styleString += `background-color:${payload.color}; `
  }

  return styleString
}

// 價錢範圍
const priceRange = ref({ min: 0, max: 10000 })
// 顏色多選
const selectedColor = ref([])

// 取得queryString
const route = useRoute()
const router = useRouter()

// 選擇篩選條件
function selectOption(payload: Record<string, string | number | string[]>) {
  const newQuery: Record<string, string | string[]> = {}

  // 先把原本 router.query 轉成 string/string[]，過濾掉 null/undefined
  Object.entries(route.query).forEach(([k, v]) => {
    if (v != null) {
      newQuery[k] = Array.isArray(v) ? v.map(String) : String(v)
    }
  })

  // 再加上 payload
  Object.entries(payload).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      newQuery[k] = v.map(String)
    } else {
      newQuery[k] = String(v)
    }
  })

  router.push({ query: newQuery })
}

// 取消指定的篩選條件
function cancelOption(payload: Record<string, string | number | string[]>) {
  const newQuery: Record<string, string | string[]> = {}

  // 先把原本 query 轉成 string/string[]
  Object.entries(route.query).forEach(([k, v]) => {
    if (v != null) {
      newQuery[k] = Array.isArray(v) ? v.map(String) : String(v)
    }
  })

  // 移除 payload 中指定的值
  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // 如果是陣列，逐一刪除
      if (Array.isArray(newQuery[key])) {
        newQuery[key] = (newQuery[key] as string[]).filter(v => !value.includes(v))
        if ((newQuery[key] as string[]).length === 0) delete newQuery[key]
      } else if (typeof newQuery[key] === 'string') {
        if (value.includes(newQuery[key] as string)) delete newQuery[key]
      }
    } else {
      // 單值刪除
      if (newQuery[key] === String(value)) delete newQuery[key]
    }
  })

  router.push({ query: newQuery })
}

function clear(key: string) {
  if (key === 'priceRange') {
    cancelOption({ price_min: priceRange.value.min, price_max: priceRange.value.max })
    priceRange.value = { min: 0, max: 10000 }
  } else {
    cancelOption({ color: selectedColor.value })
    selectedColor.value = []
  }
}

function processQueryByKey(key: string) {
  if (key === 'priceRange') {
    selectOption({ price_min: priceRange.value.min, price_max: priceRange.value.max })
  } else {
    selectOption({
      color: selectedColor.value
    })
  }
}
</script>

<template>
  <div class="search-filter">
    <!-- 手機尺寸顯示 Title -->
    <div v-if="isMobile" class="flex items-center gap-1 text-lg font-bold">
      <Icon icon="flowbite:filter-outline" width="18" height="18" /> 篩選
    </div>

    <div v-for="(option, key) in searchFilterOptions" :key="key">
      <div class="search-filter__header">{{ option.title }}</div>
      <ul class="search-filter__item">
        <!-- 顏色選擇器區塊 -->
        <template v-if="key === 'color'">
          <CheckboxGroup v-model="selectedColor">
            <li
              v-for="item in option.options"
              :key="item.value ?? '1'"
              :class="{ 'is-selected': item.value === route.query[key] }"
            >
              <BaseCheckbox
                :label="item.label"
                :value="(item as ColorOptionItem).value"
                class="w-full"
                circle
              >
                <div class="color-circle" :style="colorCircleStyle(item as ColorOptionItem)"></div>
                {{ item.label }}
              </BaseCheckbox>
            </li>
          </CheckboxGroup>
        </template>

        <template v-else>
          <li
            v-for="item in option.options"
            :key="item.value ?? '1'"
            :class="{ 'is-selected': item.value === route.query[key] }"
            @click="selectOption({ [key]: item.value ?? '' })"
          >
            {{ item.label }}

            <Icon
              v-if="item.value === route.query[key]"
              icon="flowbite:close-circle-outline"
              width="18"
              height="18"
              class="ml-auto"
              @click.stop="cancelOption({ [key]: item.value ?? '' })"
            />
          </li>
        </template>

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
          <button @click="clear(key)">清除</button>
          <button class="is-filled" @click="processQueryByKey(key)">確定</button>
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-filter {
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
    margin-block: var(--space-xs);
    font-size: 0.75rem;
    padding-inline: var(--space-md) var(--space-sm);
    padding-block: var(--space-xs);
    cursor: pointer;
    display: flex;
    gap: 4px;
    align-items: center;

    &:hover {
      background: var(--light-gray);
    }

    &.is-selected {
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
