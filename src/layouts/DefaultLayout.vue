<script setup lang="ts">
import Header from '@/layouts/Header.vue'
import Footer from '@/layouts/Footer.vue'
import FabPanel from '@/layouts/FabPanel.vue'
import BaseBreadCrumb from '@/components/BaseBreadCrumb.vue'

withDefaults(defineProps<{ text?: string }>(), { text: 'Button' })
</script>

<template>
  <div class="layout-container flex flex-col">
    <Header></Header>

    <!-- 畫面 -->
    <main
      class="layout-container__main flex-1 flex items-center justify-center py-2 md:py-4 lg:py-10"
    >
      <slot></slot>
    </main>

    <Footer></Footer>

    <!-- 固定右下角的浮動區塊 -->
    <FabPanel></FabPanel>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  // border: 1px solid red;
  width: 100%;
  height: 100%;
}
</style>
