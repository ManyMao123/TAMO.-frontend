import { ref, onMounted, onUnmounted } from 'vue'

export function useDevice() {
  const isMobile = ref(false)

  const checkDevice = () => {
    // 用 UserAgent 判斷手機
    const uaCheck = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

    // 用螢幕寬度判斷 (540px 以下算手機)
    const widthCheck = window.matchMedia('(max-width: 540px)').matches

    isMobile.value = uaCheck || widthCheck
  }

  // 螢幕改變時檢查
  onMounted(() => {
    checkDevice()
    window.addEventListener('resize', checkDevice)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkDevice)
  })

  const isDesktop = ref(false)
  onMounted(() => {
    isDesktop.value = !isMobile.value
  })

  return { isMobile, isDesktop }
}
