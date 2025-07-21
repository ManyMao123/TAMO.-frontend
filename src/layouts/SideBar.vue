<script setup lang="ts">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useElementHover, useTimeoutFn, useMediaQuery } from '@vueuse/core'
import { useUIStore } from '@/stores/ui'
import { storeToRefs } from 'pinia'
import { useScrollLock } from '@vueuse/core'
import { useRouter } from 'vue-router'
import productImages from '@/assets/images/products'

withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })

const router = useRouter()
const uiStore = useUIStore()

const { isSidebarOpen } = storeToRefs(uiStore)
const { openSidebar, closeSidebar, toggleSidebar } = uiStore

// 鎖定 body 的滾動
const isLocked = useScrollLock(document.body)

// watch sidebar 狀態，控制 scroll lock
watch(isSidebarOpen, val => (isLocked.value = val))

function goToLoginPage() {
  closeSidebar()
  router.push({ name: 'LoginPage' })
}

const historyProductList = productImages.map((e, index) => ({
  image: e,
  title: `圖片 ${index + 1}`
}))
</script>

<template>
  <div class="sidebar-container" v-show="isSidebarOpen">
    <div class="sidebar-overlay" @click="closeSidebar"></div>
    <Transition name="sidebar-slide">
      <div v-show="isSidebarOpen" class="sidebar-section">
        <div class="sidebar-scroll-content">
          <div class="member-section flex">
            <div @click="goToLoginPage">
              <Icon icon="flowbite:user-circle-outline" width="30" height="30" />
              會員登入
            </div>
            <div>
              <Icon icon="flowbite:user-add-solid" width="30" height="30" />

              註冊
            </div>
          </div>
          <!-- 瀏覽紀錄 -->
          <div class="history-section flex flex-col gap-2 px-10 pt-6">
            <div class="flex justify-between items-center">
              <p>瀏覽紀錄</p>
              <p class="text-sm cursor-pointer">查看更多</p>
            </div>
            <div class="grid grid-cols-5 gap-2">
              <img
                class="w-full"
                v-for="(item, index) in 5"
                :key="index"
                :src="historyProductList[item].image"
                :alt="historyProductList[item].title"
              />
            </div>
          </div>

          <!-- 搜尋 -->
          <div class="list-section">
            <div class="list-section__title">搜尋分類</div>
            <ul>
              <li>從分類搜尋找起</li>
              <li>從最新商品找起</li>
              <li>XXXX</li>
              <li>XXXX</li>
              <li>從出清商品中探索</li>
            </ul>
          </div>

          <!-- 查看 -->
          <div class="list-section">
            <div class="list-section__title">探索更多</div>
            <ul>
              <li>從分類搜尋找起</li>
              <li>從最新商品找起</li>
              <li>XXXX</li>
              <li>XXXX</li>
              <li>從出清商品中探索</li>
            </ul>
          </div>
        </div>

        <!-- 關閉按鈕 -->
        <button
          class="close-button flex flex-col items-center justify-center"
          @click="closeSidebar"
        >
          <Icon icon="flowbite:close-outline" width="30" height="30" />
          <p class="text-xs">關閉</p>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.sidebar-container {
  z-index: 50000;
}

// 後方黑幕
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); // 黑黑透明感
}

// sidebar白色區塊
.sidebar-section {
  z-index: 50002;
  background: var(--white);
  width: 100%;
  max-width: 500px;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
}

// 右下角關閉按鈕
.close-button {
  width: 80px;
  height: 80px;
  cursor: pointer;
  border-radius: 50%;
  background-color: var(--primary-color);
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 50005;
  color: var(--white);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: var(--primary-hover);
  }
}

/* Transition右側滑動 */
.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(100%);
}
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.sidebar-slide-enter-to,
.sidebar-slide-leave-from {
  transform: translateX(0);
}

.sidebar-scroll-content {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--light-brown) transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--light-gray);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

// 會員區塊樣式
.member-section {
  border-bottom: 1px solid var(--light-gray);
  cursor: pointer;

  > div:first-of-type {
    border-right: 1px solid var(--light-gray);
  }

  > div {
    width: 100%;
    height: 80px;
    padding: var(--space-md);
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 8px;

    &::after {
      content: '';
      border-top: 2px solid var(--light-brown);
      border-right: 2px solid var(--light-brown);
      width: 10px;
      height: 10px;
      transform: rotate(45deg);
      margin-left: auto;
    }
  }

  > div:hover {
    background: var(--light-gray);
  }
}

// 清單樣式
.list-section {
  &__title {
    font-weight: bold;
    padding: 40px 24px 8px;
    border-bottom: 3px solid var(--secondary-color);
  }

  ul li {
    padding: 20px 24px;
    border-bottom: 1px solid var(--light-gray);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

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
