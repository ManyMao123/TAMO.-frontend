import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// 引入全局樣式文件
import './assets/variables.css'

// 引入部分組件作為全局組件
import BaseButton from './components/BaseButton.vue'
import BaseDialog from './components/BaseDialog.vue'

const app = createApp(App)

// 全局註冊部分組件
app.component('BaseButton', BaseButton)
app.component('BaseDialog', BaseDialog)

// 註冊 router
app.use(router)
app.mount('#app')
