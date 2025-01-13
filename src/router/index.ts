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
    RouterManger.AUTH.HELLOWORLD,
    RouterManger.HOME.PROFILE.INDEX,
    RouterManger.HOME.PROFILE.EDIT,
    {
        path: '/:catchAll(.*)', // 攔截除了上方定義的其餘路由
        redirect: '/' // 導向首頁
    }
  ]
})

export default router
