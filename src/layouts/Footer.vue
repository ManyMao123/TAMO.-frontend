<script setup lang="ts">
import { Icon } from '@iconify/vue'
withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })
</script>

<template>
  <div class="footer-container">
    <div class="footer-category">
      <div class="footer_nav_wrapper">
        <div class="flex flex-col gap-4">
          <div class="footer_nav">
            <a href="">使用指南</a><span>|</span> <a href="">聯絡方式</a><span>|</span>
            <a href="">公司簡介</a><span>|</span> <a href="">依據特定商取引法</a><span>|</span>
            <a href="">退貨政策</a>
          </div>
          <div class="footer_nav">
            <a href="">隱私權政策</a><span>|</span> <a href="">使用條款</a><span>|</span>
            <a href="">顧客服務方針</a><span>|</span> <a href="">徵才資訊</a>
          </div>
        </div>
        <div class="flex gap-4">
          <Icon icon="flowbite:x-solid" class="cursor-pointer" width="32" height="32  " />
          <Icon icon="flowbite:instagram-solid" class="cursor-pointer" width="32" height="32" />
        </div>
      </div>
      <div class="footer_logo">
        <img src="../assets/images/logo-ltd.svg" alt="logo.svg" />
      </div>
    </div>
    <div class="footer-label">© 2025 TAMO Co. Ltd. All rights Reserved.</div>
  </div>
</template>

<style scoped lang="scss">
.footer-container {
  width: 100%;
  margin-top: var(--space-lg);
}

.footer-category {
  padding-inline: var(--space-xl);
  padding-block: var(--space-lg);
  min-height: 180px;
  background-color: var(--secondary-color);
  color: var(--white);

  @media (width > 768px) {
    padding-inline: var(--space-2xl);
    padding-block: var(--space-xl);
  }
}

.footer_nav_wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 12px;
  border-bottom: 1px solid var(--light-brown);
  padding-bottom: var(--space-md);

  @media (width > 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.footer_nav {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  a,
  span {
    font-size: 0.75rem;
  }

  span {
    color: var(--light-brown);
  }
}

.footer_logo {
}

.footer-label {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-color);
  color: var(--white);
  font-weight: bold;
  flex-shrink: 0;
  font-size: 0.75rem;
  filter: brightness(0.8);
}
</style>
