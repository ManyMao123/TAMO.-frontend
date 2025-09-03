<script setup lang="ts">
import { ref } from 'vue'
import BaseForm from '@/components/BaseForm.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import BaseButton from '@/components/BaseButton.vue'
import GoogleButton from './GoogleButton.vue'
import LineButton from './LineButton.vue'

// 定義 emit
const emit = defineEmits<{
  (e: 'changeStatus', value: 'signin' | 'signup'): void
}>()

const username = ref('')
const usernameError = ref('')
const signupAgree = ref(false)
const isSubscribed = ref(false)

function goToSignIn() {
  emit('changeStatus', 'signin')
}
</script>

<template>
  <div>
    <!-- 註冊區-->
    <div class="signup-section flex flex-col items-center w-full gap-4 max-w-[980px] mx-auto">
      <p class="font-bold text-xl">TAMO 新會員註冊</p>

      <div class="w-full max-w-[428px] flex flex-col gap-4">
        <BaseForm class="my-4">
          <BaseInput v-model="username" label="信箱" :error="usernameError" />
          <BaseInput v-model="username" label="密碼" :error="usernameError" />

          <div class="flex flex-col gap-2 mt-4">
            <BaseCheckbox v-model="signupAgree">
              我同意網站<a href="">服務條款</a>及<a href="">隱私權政策</a>
            </BaseCheckbox>
            <BaseCheckbox
              v-model="isSubscribed"
              label="我願意接收 TAMO 官方網站的最新優惠消息及服務推廣相關資訊"
            />
          </div>
        </BaseForm>

        <BaseButton>下一步</BaseButton>
      </div>

      <div class="flex flex-col gap-4 mt-4">
        <p class="flex items-center self-center text-sm">或使用社群帳戶註冊</p>
        <div class="w-full flex items-center justify-center gap-2">
          <GoogleButton />
          <LineButton />
        </div>
      </div>
    </div>

    <!-- 返回登入 -->
    <div class="w-full max-w-[428px] flex flex-col gap-4 mx-auto mt-8">
      <BaseButton plain @click="goToSignIn">返回登入</BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.signup-section {
  border-bottom: 2px solid var(--light-gray);
  padding-bottom: var(--space-2xl);
  padding-inline: var(--space-md);
}

a {
  text-decoration: underline;
}
</style>
