import Welcome from '../components/Welcome.vue'
import Register from '../components/account/Register.vue'
import Login from '../components/account/Login.vue'
import pwdForgot from '../components/account/PwdForgotView.vue'
import RichTextEditor from '../components/utilities/RichTextEditor.vue'
import Profile from '../components/profile/Index.vue'
import EditProfile from '../components/profile/Edit.vue'
import PostEditor from '../components/post/PostEditor.vue'
import CourseEditor from '@/components/course/CourseEditor.vue'

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
            path: '/richtextEditor',
            component: RichTextEditor,
            name: 'richtextEditor',
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


