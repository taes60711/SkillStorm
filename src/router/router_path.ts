import Welcome from '../components/Welcome.vue'
import Register from '../components/account/register/Register.vue'
import Login from '../components/account/Login.vue'
import pwdForgot from '../components/account/PwdForgotView.vue'
import RichTextEditor from '../components/utilities/RichTextEditor.vue'
import Profile from '../components/profile/Index.vue'
import EditProfile from '../components/profile/Edit.vue'
import PostEditor from '../components/post/PostEditor.vue'
import CourseEditor from '@/components/course/CourseEditor.vue'
import PostHome from '@/components/post/PostHome.vue'
import InfoBar from '@/components/utilities/InfoBar.vue'

export const RouterPath = {
    AUTH: {
        WELCOME: {
            path: '/',
            components: {
                default: Welcome,
                aside: InfoBar
            },
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
        },
        POST: {
            HOME: {
                path: '/post',
                components: {
                    default: PostHome,
                    aside: InfoBar
                },
                name: 'postHome',
            },
            EDIT: {
                path: '/post/edit',
                component: PostEditor,
                name: 'postEdit',
            },

        },
        COURSE: {
            EDIT: {
                path: '/course/edit',
                component: CourseEditor,
                name: 'courseEdit',
            },

        }
    },
}


