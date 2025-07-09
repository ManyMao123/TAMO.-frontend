<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import BaseCarousel from '@/components/BaseCarousel.vue'
import productImages from '@/assets/images/products'

withDefaults(defineProps<{ img?: string; text?: string }>(), { img: '', text: '' })

const newClothSlides = Array.from({ length: 18 }, (_, index) => ({
  image: productImages[index % productImages.length],
  title: `圖片 ${index + 1}`,
  onlyImg: true
}))
const activeTab = ref<'latest' | 'popular'>('latest')
</script>

<template>
  <div class="staff-styling-section max-h-[810px] flex flex-col gap-4">
    <!-- 標題-->
    <h2 class="text-center font-bold">店員實穿</h2>
    <!-- Tabs 頁籤 -->
    <div class="tabs-header flex gap-2">
      <div :class="{ 'is-selected': activeTab === 'latest' }" @click="activeTab = 'latest'">
        最新
      </div>
      <div :class="{ 'is-selected': activeTab === 'popular' }" @click="activeTab = 'popular'">
        熱門
      </div>
    </div>
    <!-- Tabs 內容 -->
    <div class="tabs-content">
      <div class="tab-panel" id="latest" :class="{ hidden: activeTab !== 'latest' }">
        <BaseCarousel
          :slides="newClothSlides"
          :slides-per-view="3"
          :slides-per-group="3"
          :height="500"
          :rows="2"
          :enable-pagination="false"
          :spaceBetween="10"
        >
          <template #default="{ item }">
            <div class="staff-slide">
              <img :src="item.image" :alt="item.title" />
              <p>158cm</p>
              <p>尺寸：one</p>
              <p>顏色：YELLOW</p>
            </div>
          </template>
        </BaseCarousel>
        <div class="more-button">MORE</div>
      </div>
      <div class="tab-panel" id="popular" :class="{ hidden: activeTab !== 'popular' }">
        這是熱門的內容
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  font-size: 1.6rem;
}

.staff-styling-section {
  background-color: #f4f4f4;
  padding: 2.5rem;
}

.tabs-header {
  > div {
    width: 100%;
    cursor: pointer;
    padding: 0.75rem;
    text-align: center;
    border-bottom: 3px solid var(--light-gray);
    font-size: 0.75rem;
    color: #333;

    &.is-selected {
      border-bottom: 3px solid var(--secondary-color);
      color: var(--secondary-color);
      font-weight: 900;
    }
  }
}

.tab-panel {
  padding-block: var(--space-md);
}

.staff-slide {
  img {
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 0.75rem;
  }
}

.more-button {
  width: fit-content;
  margin-inline: auto;
  margin-block: var(--space-lg);
  padding-block: var(--space-xs);
  padding-inline: var(--space-2xl);
  cursor: pointer;
  border-bottom: solid 1px #747474;
  position: relative;
  font-weight: bold;

  &::after {
    position: absolute;
    top: 11px;
    right: 10px;
    line-height: 1;
    display: block;
    content: '▼';
    transform: rotate(-90deg);
    font-size: 0.6rem;
  }
}
</style>
