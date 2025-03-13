import Register from "../components/account/register/Register.vue";
import Login from "../components/account/Login.vue";
import pwdForgot from "../components/account/PwdForgotView.vue";
import Profile from "../components/profile/Index.vue";
import EditProfile from "../components/profile/Edit.vue";
import PostEditor from "../components/post/PostEditor.vue";
import CourseEditor from "@/components/course/CourseEditor.vue";
import PostHome from "@/components/post/PostHome.vue";
import InfoBar from "@/components/utilities/InfoBar.vue";
import CourseHome from "@/components/course/CourseHome.vue";
import SuggestUsersHome from "@/components/suggestusers/SuggestUsersHome.vue";
import PostByBoard from "@/components/post/PostByBoard.vue";

export const RouterPath = {
  HOME: {
    /// MARK: 文章
    POST: {
      HOME: {
        path: "/",
        components: {
          default: PostHome,
          aside: InfoBar,
        },
        name: "Home",
      },
      BOARD: {
        path: "/post/board",
        components: {
          default: PostByBoard,
          aside: InfoBar,
        },
        name: "postBoard",
      },
    },
    /// MARK: 個人資料
    PROFILE: {
      INDEX: {
        path: "/profile",
        components: {
          default: Profile,
          aside: InfoBar,
        },
        name: "profile",
      },
      EDIT: {
        path: "/profile/edit",
        component: EditProfile,
        name: "profileEdit",
      },
    },
    /// MARK: 推薦使用者
    SUGGESTUSERS: {
      HOME: {
        path: "/suggestusers",
        components: {
          default: SuggestUsersHome,
          aside: InfoBar,
        },
        name: "suggestusers",
      },
    },
    /// MARK: 技術分享
    COURSE: {
      HOME: {
        path: "/course",
        components: {
          default: CourseHome,
          aside: InfoBar,
        },
        name: "courseHome",
      },
      EDIT: {
        path: "/course/edit",
        component: CourseEditor,
        name: "courseEdit",
      },
    },
  },
  AUTH: {
    /// MARK: 登入
    LOGIN: {
      path: "/login",
      component: Login,
      name: "login",
    },
    /// MARK: 註冊
    REGISTER: {
      path: "/register",
      component: Register,
      name: "register",
    },
    /// MARK: 忘記密碼
    PWDFORGOT: {
      path: "/forgotPassword",
      component: pwdForgot,
      name: "forgotPassword",
    },
  },
};
