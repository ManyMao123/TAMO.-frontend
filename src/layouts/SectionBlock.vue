<script setup lang="ts">
import { ref } from 'vue'
withDefaults(defineProps<{ title?: string; subTitle?: string }>(), {
  title: 'Title'
})
</script>

<template>
  <div class="section-block">
    <p class="title__main">{{ title }}</p>
    <p v-if="subTitle" class="title__sub">- {{ subTitle }} -</p>

    <div class="p-4 lg:p-6 w-full">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  margin-block: var(--space-xs);
  max-width: 100%;

  @media (width > 1280px) {
    max-width: 1200px;
    margin-block: var(--space-xl);
  }

  .title__main {
    font-weight: bold;
    font-size: 1.5rem;
  }

  .title__sub {
    font-size: 1rem;
    color: var(--light-brown);
  }
}
</style>
