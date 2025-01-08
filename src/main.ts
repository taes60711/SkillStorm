import { createApp } from 'vue';
import './style.css';
import PrimeVue from 'primevue/config';
import App from './App.vue';


const app = createApp(App);
app.use(PrimeVue);
app.mount('#app');



/// api用的ip & port
export const ip: string = "192.168.1.160";
export const port: string = "80";

/// "192.168.2.62"
///"192.168.1.160"