<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useUIStore } from '@/stores/ui'
import { useRouter } from 'vue-router'
import productImages from '@/assets/images/products'

const router = useRouter()
const uiStore = useUIStore()

const { closeSidebar } = uiStore

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
  <div class="history-section flex flex-col gap-2 px-10 pt-6 pb-5">
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
</template>

<style scoped lang="scss">
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
