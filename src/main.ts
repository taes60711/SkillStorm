import { createApp as create } from '@vue/runtime-dom'
import App from './App.vue'
import router from './router'
import './style.css'
import PrimeVue from 'primevue/config'

const app = create(App)
app.use(router)
app.use(PrimeVue)
app.mount('#app')

/// api用的ip & port
export const ip: string = import.meta.env.VITE_API_HOST || "localhost"
export const port: string = import.meta.env.VITE_API_PORT || "8080"

/// "192.168.2.62"
///"192.168.1.160"
