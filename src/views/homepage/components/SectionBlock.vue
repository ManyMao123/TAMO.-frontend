<script setup lang="ts">
import { ref } from 'vue'
withDefaults(defineProps<{ title?: string; subTitle?: string }>(), {
  title: 'Title',
  subTitle: 'sub Title'
})
</script>

<template>
  <div class="section-block">
    <p class="title__main">{{ title }}</p>
    <p class="title__sub">- {{ subTitle }} -</p>

    <div class="flex gap-8 p-6">
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
  // margin-top: var(--space-xl);
  margin-block: var(--space-xl) var(--space-xl);

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
