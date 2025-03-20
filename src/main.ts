import { createApp as create } from "@vue/runtime-dom";
import App from "./App.vue";
import router from "./router/router_manager";
import PrimeVue from "primevue/config";
import "@/assets/css/tailwind_style.css"; // 導入tailwind
import "@fortawesome/fontawesome-free/css/all.css";

const app = create(App);
app.use(router);
app.use(PrimeVue);
app.mount("#app");
