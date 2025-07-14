<script setup lang="ts">
import { Icon } from '@iconify/vue'
withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })

interface fabPanelItem {
  icon: string
  text: string
}
const fabPanelList: fabPanelItem[] = [
  { icon: 'cart', text: '購物車' },
  { icon: 'heart', text: '喜愛清單' },
  { icon: 'search', text: '搜尋' },
  { icon: 'bars', text: '菜單' }
]
</script>

<template>
  <div class="fabPanel">
    <ul class="fabPanel__list flex">
      <li class="fabPanel__item gap-1" v-for="(item, index) in fabPanelList" :key="index">
        <Icon :icon="`flowbite:${item.icon}-outline`" width="36" height="36" />
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.fabPanel {
  width: 420px;
  position: fixed;
  right: 0;
  bottom: 0;
  color: var(--white);
  background-color: var(--primary-color);
  z-index: 10000;

  .fabPanel__item {
    padding-inline: var(--space-md);
    // padding-block: var(--space-md);
    height: 86px;
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;

    span {
      font-size: 0.875rem;
    }

    &:hover {
      filter: brightness(0.75);
    }
  }
}
</style>
