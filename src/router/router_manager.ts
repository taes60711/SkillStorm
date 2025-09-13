import { createRouter, createWebHistory, useRoute } from "vue-router";
import { RouterPath } from "./router_path";
import { userDataStore } from "@/global/user_data"; // 引入全局用戶資料管理
import { GlobalData } from "@/global/global_data";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    RouterPath.AUTH.LOGIN,
    RouterPath.AUTH.REGISTER,
    RouterPath.AUTH.PWDFORGOT,
    RouterPath.HOME.POST.HOME,
    RouterPath.HOME.POST.POPULAR,
    RouterPath.HOME.POST.BOARD,
    RouterPath.HOME.COURSE.HOME,
    RouterPath.EXTENDS.COURSE,
    RouterPath.EXTENDS.POST,
    RouterPath.HOME.SUGGESTUSERS.HOME,
    {
      ...RouterPath.HOME.PROFILE.HOME,
      meta: { requiresAuth: true }
    },
    {
      ...RouterPath.HOME.POST.MY,
      meta: { requiresAuth: true }
    },
    {
      ...RouterPath.HOME.COURSE.MY,
      meta: { requiresAuth: true }
    },
    {
      ...RouterPath.HOME.PROFILE.EDIT,
      meta: { requiresAuth: true }
    },

    {
      path: "/:catchAll(.*)", // 攔截除了上方定義的其餘路由
      redirect: "/" // 導向首頁
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(`to.path > ${to.path} toParam > ${to.params.id}`);
  const isLogin = userDataStore.isLogin(); // 判斷是否有登入資料

  switch (isLogin) {
    case true:
      /// 已登入
      if (
        to.path === RouterPath.AUTH.LOGIN.path ||
        to.path === RouterPath.AUTH.REGISTER.path ||
        to.path === RouterPath.AUTH.PWDFORGOT.path
      ) {
        console.log("已登入，用戶從首頁跳轉到 POST 頁面");
        next(RouterPath.HOME.POST.HOME.path);
      } else {
        next();
      }
      break;

    case false:
      /// 不需要登入
      if (!to.meta.requiresAuth) {
        next();
      } else {
        console.log("Need Login");
        next(RouterPath.HOME.POST.HOME.path);
      }
      break;
  }

  if (to.path.includes("/post") && to.params !== undefined) {
    console.log(`to.path > ${to.path} toParam > ${to.params.id}`);

    GlobalData.getExtendsPost(to.params.id[0]);
    return;
  }

  if (to.path.includes("/course") && to.params !== undefined) {
    console.log(`to.path > ${to.path} toParam > ${to.params.id}`);
    GlobalData.getExtendsCourse(to.params.id[0]);
    return;
  }
});

export default router;
