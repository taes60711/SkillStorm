import Welcome from '../components/Welcome.vue'
import RegisterEmail from '../components/account/RegisterEmail.vue'
import Register from '../components/account/Register.vue'
import Login from '../components/account/Login.vue'
import pwdForgot from '../components/account/PwdForgotView.vue'

export const RouterManger = {
    AUTH: {
        WELCOME: {
            path: '/',
            component: Welcome,
            // name: 'welcome',
        },
        LOGIN: {
            path: '/login',
            component: Login
            // name: 'login',
        },
        REGISTEREMAIL: {
            path: '/register/email',
            component: RegisterEmail
            // name: 'registerEmail',
        },
        REGISTER: {
            path: '/register',
            component: Register
            // name: 'register',
        },
        PWDFORGOT: {
            path: '/forgotPassword',
            component: pwdForgot
            // name: 'register',
        }

    },
    HOME: {

    }
}