import { createApp as create } from '@vue/runtime-dom'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import '@/assets/css/main.css' // 全局 CSS
import { userDataStore } from "@/global/user_data";

const app = create(App)

userDataStore.initializeFromLocalStorage();// 從 localStorage 初始化用戶資料

app.use(router)
app.use(PrimeVue)
app.mount('#app')