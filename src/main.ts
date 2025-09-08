import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 引入pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 引入Bootstrap
import { createBootstrap } from 'bootstrap-vue-next'

// 引入Bootstrap CSS
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/customBootstrap.scss'

// 引入全局樣式文件
import './assets/variables.css'

// 引入部分組件作為全局組件
import BaseButton from './components/BaseButton.vue'
import BaseDialog from './components/BaseDialog.vue'

// 引入swiper-element
import { register } from 'swiper/element/bundle'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
register()

app.use(router)
app.use(pinia)
app.use(createBootstrap())

// 全局註冊部分組件
app.component('BaseButton', BaseButton)
app.component('BaseDialog', BaseDialog)

app.mount('#app')
