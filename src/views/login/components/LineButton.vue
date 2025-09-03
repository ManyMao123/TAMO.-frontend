<template>
  <button class="line-material-button" @click="handleLogin">
    <div class="line-material-button-state"></div>
    <div class="line-material-button-icon">
      <!-- LINE Logo SVG -->
      <svg
        viewBox="0 0 40 40"
        focusable="false"
        class="chakra-icon emotion-css-cache-1xm1rjy"
        data-e2e-id="login-line_icon"
        aria-hidden="true"
      >
        <g clip-path="url(#clip0_341_25824)">
          <path
            d="M20.5 40C31.5457 40 40.5 31.0457 40.5 20C40.5 8.9543 31.5457 0 20.5 0C9.4543 0 0.5 8.9543 0.5 20C0.5 31.0457 9.4543 40 20.5 40Z"
            fill="currentColor"
          ></path>
          <path
            d="M33.8378 18.836C33.8378 12.861 27.8478 8.00098 20.4865 8.00098C13.1253 8.00098 7.13525 12.8622 7.13525 18.836C7.13525 24.1922 11.8853 28.6772 18.3015 29.526C18.7365 29.6197 19.3278 29.8122 19.4778 30.1847C19.6128 30.5222 19.5653 31.051 19.5215 31.3922C19.5215 31.3922 19.3653 32.3347 19.3315 32.5347C19.2728 32.8722 19.0628 33.8547 20.4878 33.2547C21.9128 32.6547 28.1765 28.7272 30.9778 25.5035C32.9115 23.381 33.8378 21.2272 33.8378 18.836Z"
            fill="white"
          ></path>
          <path
            d="M29.3964 22.2882C29.5376 22.2882 29.6514 22.1744 29.6514 22.0332V21.0857C29.6514 20.9457 29.5364 20.8307 29.3964 20.8307H26.8476V19.8469H29.3964C29.5376 19.8469 29.6514 19.7332 29.6514 19.5919V18.6457C29.6514 18.5057 29.5364 18.3907 29.3964 18.3907H26.8476V17.4069H29.3964C29.5376 17.4069 29.6514 17.2932 29.6514 17.1519V16.2057C29.6514 16.0657 29.5364 15.9507 29.3964 15.9507H25.6501H25.6451C25.5039 15.9507 25.3901 16.0644 25.3901 16.2057V16.2107V22.0269V22.0307C25.3901 22.1719 25.5039 22.2857 25.6451 22.2857H25.6501H29.3964V22.2882Z"
            fill="currentColor"
          ></path>
          <path
            d="M15.5214 22.2882C15.6627 22.2882 15.7764 22.1744 15.7764 22.0332V21.0857C15.7764 20.9457 15.6614 20.8307 15.5214 20.8307H12.9714V16.2057C12.9714 16.0657 12.8564 15.9507 12.7164 15.9507H11.7689C11.6277 15.9507 11.5139 16.0644 11.5139 16.2057V22.0282V22.0319C11.5139 22.1732 11.6277 22.2869 11.7689 22.2869H11.7739H15.5214V22.2882Z"
            fill="currentColor"
          ></path>
          <path
            d="M17.7792 15.9507H16.8317C16.6904 15.9507 16.5767 16.0644 16.5767 16.2057V22.0332C16.5767 22.1744 16.6904 22.2882 16.8317 22.2882H17.7792C17.9204 22.2882 18.0342 22.1744 18.0342 22.0332V16.2057C18.0342 16.0657 17.9204 15.9507 17.7792 15.9507Z"
            fill="currentColor"
          ></path>
          <path
            d="M24.2253 15.9507H23.2778C23.1366 15.9507 23.0228 16.0644 23.0228 16.2057V19.6669L20.3566 16.0669C20.3503 16.0582 20.3428 16.0494 20.3366 16.0407L20.3353 16.0394C20.3303 16.0344 20.3253 16.0282 20.3203 16.0232C20.3191 16.0219 20.3166 16.0207 20.3153 16.0194C20.3103 16.0157 20.3066 16.0119 20.3016 16.0082C20.2991 16.0069 20.2966 16.0044 20.2941 16.0032C20.2903 15.9994 20.2853 15.9969 20.2803 15.9944C20.2778 15.9932 20.2753 15.9907 20.2728 15.9894C20.2678 15.9869 20.2641 15.9844 20.2591 15.9819C20.2566 15.9807 20.2541 15.9794 20.2516 15.9782C20.2466 15.9757 20.2416 15.9732 20.2366 15.9719C20.2341 15.9707 20.2316 15.9694 20.2278 15.9694C20.2228 15.9682 20.2178 15.9657 20.2128 15.9644C20.2103 15.9632 20.2066 15.9632 20.2041 15.9619C20.1991 15.9607 20.1941 15.9594 20.1891 15.9582C20.1853 15.9569 20.1816 15.9569 20.1778 15.9569C20.1728 15.9557 20.1691 15.9557 20.1641 15.9557C20.1591 15.9557 20.1553 15.9557 20.1503 15.9544C20.1478 15.9544 20.1441 15.9544 20.1416 15.9544H19.2003C19.0591 15.9544 18.9453 16.0682 18.9453 16.2094V22.0369C18.9453 22.1782 19.0591 22.2919 19.2003 22.2919H20.1478C20.2891 22.2919 20.4028 22.1782 20.4028 22.0369V18.5769L23.0716 22.1819C23.0903 22.2082 23.1128 22.2294 23.1378 22.2457C23.1391 22.2469 23.1403 22.2469 23.1403 22.2482C23.1453 22.2519 23.1503 22.2544 23.1566 22.2582C23.1591 22.2594 23.1616 22.2607 23.1641 22.2619C23.1678 22.2644 23.1728 22.2657 23.1766 22.2682C23.1803 22.2707 23.1853 22.2719 23.1891 22.2732C23.1916 22.2744 23.1941 22.2757 23.1966 22.2757C23.2028 22.2782 23.2078 22.2794 23.2141 22.2807C23.2153 22.2807 23.2166 22.2819 23.2178 22.2819C23.2391 22.2869 23.2616 22.2907 23.2841 22.2907H24.2253C24.3666 22.2907 24.4803 22.1769 24.4803 22.0357V16.2082C24.4803 16.0657 24.3666 15.9507 24.2253 15.9507Z"
            fill="currentColor"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_341_25824">
            <rect width="40" height="40" fill="white" transform="translate(0.5)"></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
  </button>
</template>

<script setup lang="ts">
const clientId = 'YOUR_LINE_CHANNEL_ID'
const redirectUri = 'YOUR_REDIRECT_URI'

const handleLogin = () => {
  const state = Math.random().toString(36).substring(2)
  const scope = 'profile openid email'
  const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scope)}`
  window.location.href = lineLoginUrl
}
</script>

<style scoped lang="scss">
.line-material-button {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  background-color: #06c755;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  height: 40px;
  width: 40px;
  padding: 0;
  position: relative;
  text-align: center;
  overflow: hidden;
  transition: background-color 0.218s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.line-material-button .line-material-button-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #06c755;
}

.line-material-button .line-material-button-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.218s;
}

.line-material-button:hover .line-material-button-state {
  background-color: rgba(0, 0, 0, 0.08);
  opacity: 1;
}

.line-material-button:active .line-material-button-state {
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
