import { createApp as create } from '@vue/runtime-dom'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

const app = create(App)
app.use(router)
app.use(PrimeVue)
app.mount('#app')

