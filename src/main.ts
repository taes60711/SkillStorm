import { createApp as create } from '@vue/runtime-dom'
import App from './App.vue'
import router from './router/router_manager'
import PrimeVue from 'primevue/config'
import '@/assets/css/main.css' // 全局 CSS
import { userDataStore } from "@/global/user_data";
import PostService from './services/post_service'

const app = create(App)
app.use(router)
app.use(PrimeVue)
app.mount('#app')

userDataStore.initializeFromLocalStorage();// 從 localStorage 初始化用戶資料
new PostService().getAllPostBoard();