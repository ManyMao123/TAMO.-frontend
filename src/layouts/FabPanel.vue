<script setup lang="ts">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useElementHover, useTimeoutFn, useMediaQuery } from '@vueuse/core'
import { useUIStore } from '@/stores/ui'
import { useRouter } from 'vue-router'

withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })

const uiStore = useUIStore()
const { openSidebar } = uiStore

const router = useRouter()

interface fabPanelItem {
  icon: string
  text: string
  action: () => void
}
const fabPanelList: fabPanelItem[] = [
  {
    icon: 'cart',
    text: '購物車',
    action: () => {
      router.push({ name: 'ShoppingCart' })
    }
  },
  { icon: 'heart', text: '喜愛清單', action: () => {} },
  { icon: 'search', text: '搜尋', action: () => openSidebar('search') },
  { icon: 'bars', text: '菜單', action: () => openSidebar('menu') }
]

const buttonRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
// 控制list是否顯示
const isListVisible = ref(true)

const isHoveringButton = useElementHover(buttonRef)
const isHoveringList = useElementHover(listRef)

const { start: startHideTimer, stop: stopHideTimer } = useTimeoutFn(() => {
  isListVisible.value = false
}, 500)

const isDesktop = useMediaQuery('(min-width: 768px)')

watch([isHoveringButton, isHoveringList], ([hoverBtn, hoverList]) => {
  if (!isDesktop.value) {
    if (hoverBtn || hoverList) {
      isListVisible.value = true
      stopHideTimer()
    } else {
      startHideTimer()
    }
  }
})

// 螢幕尺寸 > 768時，list永遠顯示
watch(
  isDesktop,
  desktop => {
    if (desktop) {
      isListVisible.value = true
      stopHideTimer()
    } else {
      isListVisible.value = false
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="fabPanel">
    <ul
      class="fabPanel__list flex flex-col gap-4 items-center md:flex-row md:gap-0"
      :class="{ 'is-open': isListVisible }"
      ref="listRef"
    >
      <li
        class="fabPanel__item flex flex-col items-center justify-center gap-1"
        v-for="(item, index) in fabPanelList"
        :key="index"
        @click="item.action"
      >
        <Icon :icon="`flowbite:${item.icon}-outline`" width="36" height="36" />
        <span>{{ item.text }}</span>
      </li>
    </ul>

    <button
      class="fabPanel__button flex md:hidden"
      :class="{ 'is-open': isListVisible }"
      ref="buttonRef"
    >
      <Icon icon="flowbite:close-outline" width="36" height="36" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.fabPanel {
  width: 86px;
  height: 86px;
  position: fixed;
  color: var(--white);
  z-index: 10000;
  bottom: 10px;
  right: 10px;

  @media (min-width: 768px) {
    width: fit-content;
    height: fit-content;
    right: 0;
    bottom: 0;
    border-radius: 0;
  }
}

.fabPanel__list {
  position: absolute;
  bottom: 50px;
  border-radius: 2rem 2rem 0 0;
  width: 86px;
  padding-block: 16px 50px;
  overflow: hidden;
  background-color: rgba(184, 154, 115, 0.5);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform-origin: bottom;
  transform: scaleY(0);
  transition: transform 0.3s ease-out;

  &.is-open {
    transform: scaleY(1);
  }

  @media (min-width: 768px) {
    background-color: var(--primary-color);
    border-radius: 0;
    bottom: 0px;
    height: 100%;
    width: 100%;
    position: relative;
    bottom: 0;
    padding-block: 0px;
  }
}

.fabPanel__item {
  padding-inline: var(--space-md);
  height: 72px;
  width: 72px;
  border-radius: 50%;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  transition: transform 0.3s ease;

  @media (min-width: 768px) {
    height: 85px;
    width: 100px;
  }

  span {
    font-size: 0.875rem;
  }

  &:hover {
    background: radial-gradient(
      circle at center,
      rgba(184, 154, 115, 0.3) 0%,
      rgba(184, 154, 115, 0.15) 40%,
      transparent 70%
    );
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
    filter: brightness(0.9);
  }
}

// 只在小尺寸畫面時會出現的按鈕
.fabPanel__button {
  width: 100%;
  height: 100%;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--primary-color);
  position: relative;
  z-index: 10005;
  &:hover {
    background-color: var(--primary-hover);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &.is-open svg {
    transform: rotate(45deg);
  }
}
</style>
