<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import SignIn from './components/SignIn.vue'
import SignUp from './components/SignUp.vue'
import BaseBreadCrumb from '@/components/BaseBreadCrumb.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 狀態：登入或註冊
const status = ref(route.query.status ?? 'signin')
const isSignIn = computed(() => status.value === 'signin')

watch(
  () => route.query.status,
  val => {
    if (val) status.value = val as string
  }
)

const breadcrumbs = computed(() => [
  { label: 'ホーム', href: '/', icon: 'flowbite:home-solid' },
  { label: isSignIn.value ? '會員登入' : '會員註冊' }
])
</script>

<template>
  <div class="w-full flex flex-col gap-8 max-w-[1300px] h-full px-4">
    <!-- 麵包屑 -->
    <BaseBreadCrumb :breadcrumbs="breadcrumbs"></BaseBreadCrumb>

    <SignIn v-if="isSignIn" @changeStatus="status = $event" />
    <SignUp v-else @changeStatus="status = $event" />
  </div>
</template>

<style scoped lang="scss"></style>
