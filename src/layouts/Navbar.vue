<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

withDefaults(defineProps<{ list?: { name: string; link: string }[] }>(), {
  list: () => [
    { name: '首頁', link: '/' },
    { name: '關於', link: '' },
    { name: '練習', link: '/ScrollAnimations' },
    { name: '🚀', link: '' }
  ]
})

// 控制漢堡選單的顯示
const isMenuOpen = ref(false)

const router = useRouter()
// 頁面切換
const goToPage = (link: string) => {
  router.push({ path: link })
}
</script>

<template>
  <nav class="nav">
    <!-- 漢堡選單 -->
    <div
      class="hamburger flex sm:hidden"
      @click="isMenuOpen = !isMenuOpen"
      :aria-expanded="isMenuOpen ? 'true' : 'false'"
      aria-label="Toggle menu"
    >
      <div :class="isMenuOpen ? 'open' : ''" class="hamburger-bar"></div>
      <div :class="isMenuOpen ? 'open' : ''" class="hamburger-bar"></div>
      <div :class="isMenuOpen ? 'open' : ''" class="hamburger-bar"></div>
    </div>

    <!-- 導覽列 -->
    <ul class="nav-list hidden sm:flex">
      <li class="nav-list__item" v-for="item in list" :key="item.link" @click="goToPage(item.link)">
        <div class="text-base md:text-xl">{{ item.name }}</div>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.nav {
  margin-inline: var(--space-xs);
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media (width > 768px) {
    margin-inline: var(--space-xl);
  }
}

.hamburger {
  width: 50px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  .hamburger-bar {
    background-color: white;
    height: 4px;
    width: 45px;
    margin-block: 5px;
    transition: all 0.3s ease;
  }

  .open.hamburger-bar {
    &:nth-child(1) {
      transform: rotate(40deg);
      position: relative;
      top: 14px;
    }

    &:nth-child(2) {
      opacity: 0;
    }

    &:nth-child(3) {
      transform: rotate(-40deg);
      position: relative;
      bottom: 14px;
    }
  }
}

.nav-list {
  height: 100%;
  min-width: 400px;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
}

.nav-list__item {
  height: 100%;
  color: var(--white);
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    // padding: var(--space-xs) var(--space-lg);
    // transition: background-color 0.3s;

    position: relative;
    padding: var(--space-md);
    z-index: 1;
    overflow: hidden;
    transition: color 0.3s; // 文字顏色變化

    @media (width > 768px) {
      padding: var(--space-xs) var(--space-lg);
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--primary-color);
      transform: scaleY(0);
      transform-origin: left;
      transition: transform 0.5s ease;
      z-index: -1;
    }
  }

  &:hover:not(:last-of-type) {
    div {
      color: var(--secondary-color);
      &::before {
        transform: scaleY(1);
      }
    }
  }

  &:hover:last-of-type {
    transform: scale(1.5);
  }
}
</style>
