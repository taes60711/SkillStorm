import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../components/Welcome.vue'
import RegisterEmail from '../components/RegisterEmail.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register/email',
      name: 'registerEmail',
      component: RegisterEmail
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

export default router
