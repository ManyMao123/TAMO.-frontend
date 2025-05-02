<script setup lang="ts">
withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })

const fabPanelList = ['cart', 'favorites', 'shops', 'search', 'menu']
</script>

<template>
  <div class="fabPanel-container">
    <ul class="flex">
      <li v-for="(item, index) in fabPanelList" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.fabPanel-container {
  width: 500px;
  position: fixed;
  right: 0;
  bottom: 0;
  color: var(--white);
  background-color: var(--primary-color);

  ul li {
    padding-inline: var(--space-lg);
    height: 80px;
  }
}
</style>
