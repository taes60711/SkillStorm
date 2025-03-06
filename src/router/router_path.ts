import Register from '../components/account/register/Register.vue'
import Login from '../components/account/Login.vue'
import pwdForgot from '../components/account/PwdForgotView.vue'
import Profile from '../components/profile/Index.vue'
import EditProfile from '../components/profile/Edit.vue'
import PostEditor from '../components/post/PostEditor.vue'
import CourseEditor from '@/components/course/CourseEditor.vue'
import PostHome from '@/components/post/PostHome.vue'
import InfoBar from '@/components/utilities/InfoBar.vue'

export const RouterPath = {
    HOME: {
        POST: {
            HOME: {
                path: '/',
                components: {
                    default: PostHome,
                    aside: InfoBar
                },
                name: 'Home',
            },
            EDIT: {
                path: '/post/edit',
                component: PostEditor,
                name: 'postEdit',
            },

        },
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
        },

        COURSE: {
            EDIT: {
                path: '/course/edit',
                component: CourseEditor,
                name: 'courseEdit',
            },

        }
    },
    AUTH: {
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

    },
}


