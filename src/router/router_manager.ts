import { createRouter, createWebHistory } from "vue-router";
import { RouterPath } from "./router_path";
import { userDataStore } from "@/global/user_data"; // 引入全局用戶資料管理

const router = createRouter({
  history: createWebHistory(),
  routes: [
    RouterPath.AUTH.WELCOME,
    RouterPath.AUTH.LOGIN,
    RouterPath.AUTH.REGISTER,
    RouterPath.AUTH.PWDFORGOT,
    RouterPath.AUTH.HELLOWORLD,
    {
      ...RouterPath.HOME.PROFILE.INDEX,
      meta: { requiresAuth: true },
    },
    {
      ...RouterPath.HOME.PROFILE.EDIT,
      meta: { requiresAuth: true },
    },
    {
      ...RouterPath.HOME.POST.EDIT,
      meta: { requiresAuth: true },
    },
    {
      ...RouterPath.HOME.COURSE.EDIT,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)", // 攔截除了上方定義的其餘路由
      redirect: "/", // 導向首頁
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!userDataStore.userData.value; // 判斷是否有登入資料

  /// 不需驗證
  if (!to.meta.requiresAuth) {
    // 繼續導航
    next();
    return;
  }

  /// 未登入
  if (!isAuthenticated) {
    console.log("未登入，跳轉到首頁");
    // 跳轉到首頁
    next(RouterPath.AUTH.WELCOME.path);
    return;
  }

  /// 已登入
  if (to.path === RouterPath.AUTH.LOGIN.path || to.path === RouterPath.AUTH.WELCOME.path) {
    // 跳轉到 PROFILE 頁面
    console.log("已登入，用戶從首頁跳轉到 PROFILE 頁面");
    next(RouterPath.HOME.PROFILE.INDEX.path);
  } else {
    next();
  }

});

export default router;
