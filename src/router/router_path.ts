import Register from "../components/account/register/Register.vue";
import Login from "../components/account/Login.vue";
import pwdForgot from "../components/account/PwdForgotView.vue";
import Profile from "../components/profile/ProfileHome.vue";
import EditProfile from "../components/profile/ProfileEdit.vue";
import PostHome from "@/components/post/postHome/PostHome.vue";
import InfoBar from "@/components/utilities/InfoBar/InfoBar.vue";
import CourseHome from "@/components/course/CourseHome.vue";
import SuggestUsersHome from "@/components/suggestusers/SuggestUsersHome.vue";
import PostByBoard from "@/components/post/PostByBoard.vue";
import PostPopular from "@/components/post/postHome/PostPopular.vue";
import MyPost from "@/components/post/MyPost.vue";
import MyCourse from "@/components/course/MyCourse/MyCourse.vue";

export const RouterPath = {
  HOME: {
    /// MARK: 文章
    POST: {
      HOME: {
        path: "/",
        components: {
          default: PostHome,
          aside: InfoBar
        },
        name: "Home"
      },
      POPULAR: {
        path: "/popular",
        components: {
          default: PostPopular,
          aside: InfoBar
        },
        name: "Popular"
      },
      BOARD: {
        path: "/post/board/:boardtype",
        components: {
          default: PostByBoard,
          aside: InfoBar
        },
        name: "postBoard"
      },
      MY: {
        path: "/post/my",
        components: {
          default: MyPost,
          aside: InfoBar
        },
        name: "mypost"
      }
    },
    /// MARK: 個人資料
    PROFILE: {
      INDEX: {
        path: "/profile",
        components: {
          default: Profile,
          aside: InfoBar
        },
        name: "profile"
      },
      EDIT: {
        path: "/profile/edit",
        component: EditProfile,
        name: "profileEdit"
      }
    },
    /// MARK: 推薦使用者
    SUGGESTUSERS: {
      HOME: {
        path: "/suggestusers",
        components: {
          default: SuggestUsersHome,
          aside: InfoBar
        },
        name: "suggestusers"
      }
    },
    /// MARK: 技術分享
    COURSE: {
      HOME: {
        path: "/course",
        components: {
          default: CourseHome,
          aside: InfoBar
        },
        name: "courseHome"
      },
      /// MARK: 我的技術分享
      MY: {
        path: "/course/my",
        components: {
          default: MyCourse,
          aside: InfoBar
        },
        name: "mycourse"
      }
    }
  },
  AUTH: {
    /// MARK: 登入
    LOGIN: {
      path: "/login",
      component: Login,
      name: "login"
    },
    /// MARK: 註冊
    REGISTER: {
      path: "/register",
      component: Register,
      name: "register"
    },
    /// MARK: 忘記密碼
    PWDFORGOT: {
      path: "/forgotPassword",
      component: pwdForgot,
      name: "forgotPassword"
    }
  }
};
