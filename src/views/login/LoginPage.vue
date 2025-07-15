<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import BaseBreadCrumb from '@/components/BaseBreadCrumb.vue'
import BaseForm from '@/components/BaseForm.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import BaseButton from '@/components/BaseButton.vue'

const breadcrumbs = [
  { label: 'ホーム', href: '/', icon: 'flowbite:home-solid' },
  { label: 'Login' }
]

const username = ref('')
const usernameError = ref('')
const rememberUserName = ref(false)

watch(rememberUserName, val => console.log(val))
</script>

<template>
  <div class="w-full flex flex-col gap-8 max-w-[1300px] h-full px-4">
    <!-- 麵包屑 -->
    <BaseBreadCrumb :breadcrumbs="breadcrumbs"></BaseBreadCrumb>
    <!-- 登入區-->
    <div class="login-section flex flex-col items-center w-full gap-4 max-w-[980px] mx-auto">
      <h2 class="mb-4">登入</h2>

      <p class="font-bold text-xl">以 TAMO 會員資訊登入</p>

      <div class="w-full max-w-[420px] flex flex-col gap-8">
        <BaseForm class="my-4">
          <BaseInput v-model="username" label="信箱" :error="usernameError" />
          <BaseInput v-model="username" label="密碼" :error="usernameError" />
          <BaseCheckbox
            v-model="rememberUserName"
            label="記住我的電子郵件地址"
            class="self-center"
          />
        </BaseForm>
        <BaseButton>登入</BaseButton>
        <a href="" class="flex items-center self-center">
          忘記密碼請點這裡
          <Icon icon="flowbite:arrow-up-right-from-square-outline" width="16" height="16" />
        </a>
      </div>
    </div>
    <!-- 註冊區 -->
    <div class="signup-section flex flex-col items-center w-full gap-4 max-w-[980px] mx-auto">
      <p class="font-bold text-xl">TAMO 新會員註冊</p>

      <p class="text-sm">登入 TAMO 之前，請先註冊 TAMO 會員（線上與門市通用）。</p>

      <div class="w-full max-w-[420px] flex flex-col gap-8">
        <BaseButton>會員註冊</BaseButton>
        <div class="text-xs text-center leading-[1.5]">
          <p>※ 將前往 TAMO 會員頁面</p>
          <p>※ 加入會員免費，無需支付任何費用</p>
        </div>

        <a href="" class="flex items-center self-center">
          點此了解 TAMO 會員福利內
          <Icon icon="flowbite:arrow-up-right-from-square-outline" width="16" height="16" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-section {
  border-bottom: 2px solid var(--light-gray);
  padding-bottom: var(--space-2xl);
  padding-inline: var(--space-md);
}

.signup-section {
  padding-top: var(--space-2xl);
  padding-inline: var(--space-md);
}

a {
  font-size: 0.75rem;
  text-decoration: underline;
}
</style>
