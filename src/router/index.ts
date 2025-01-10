import { createRouter, createWebHistory } from 'vue-router'
import { RouterManger } from './router_manager'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    RouterManger.AUTH.WELCOME,
    RouterManger.AUTH.LOGIN,
    RouterManger.AUTH.REGISTER,
    RouterManger.AUTH.REGISTEREMAIL,
    RouterManger.AUTH.PWDFORGOT,
  ]
})

export default router
