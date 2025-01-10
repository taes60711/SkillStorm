import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import PrimeVue from 'primevue/config'

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.mount('#app')

/// api用的ip & port
export const ip: string = "192.168.1.160"
export const port: string = "80"

/// "192.168.2.62"
///"192.168.1.160"
