import Welcome from '../components/Welcome.vue'
import Register from '../components/account/Register.vue'
import Login from '../components/account/Login.vue'
import pwdForgot from '../components/account/PwdForgotView.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Profile from '../components/profile/Index.vue'
import EditProfile from '../components/profile/Edit.vue'

export const RouterPath = {
    AUTH: {
        WELCOME: {
            path: '/',
            component: Welcome,
            name: 'welcome',
        },
        LOGIN: {
            path: '/login',
            component: Login,
            name: 'login',
        },
        REGISTER: {
            path: '/register',
            component: Register,
            name: 'register',
        },
        PWDFORGOT: {
            path: '/forgotPassword',
            component: pwdForgot,
            name: 'forgotPassword',
        },
        HELLOWORLD: {
            path: '/helloworld',
            component: HelloWorld,
            name: 'helloWorld',
        },
    },
    HOME: {
        PROFILE: {
            INDEX: {
                path: '/profile',
                component: Profile,
                name: 'profile',
            },
            EDIT: {
                path: '/profile/edit',
                component: EditProfile,
                name: 'profileEdit',
            }
        }
    },
}


