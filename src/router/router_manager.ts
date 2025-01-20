import { createRouter, createWebHistory } from "vue-router";
import { RouterPath } from "./router_path";
import { userDataStore } from "@/global/user_data"; // 引入全局用戶資料管理

const router = createRouter({
  history: createWebHistory(),
  routes: [
    RouterPath.AUTH.WELCOME,
    RouterPath.AUTH.LOGIN,
    RouterPath.AUTH.REGISTER,
    RouterPath.AUTH.REGISTEREMAIL,
    RouterPath.AUTH.PWDFORGOT,
    RouterPath.AUTH.HELLOWORLD,
    {
      ...RouterPath.HOME.PROFILE.INDEX,
      meta: { requiresAuth: true }, // 加上需要驗證的標記
    },
    {
      ...RouterPath.HOME.PROFILE.EDIT,
      meta: { requiresAuth: true }, // 加上需要驗證的標記
    },
    {
      path: "/:catchAll(.*)", // 攔截除了上方定義的其餘路由
      redirect: "/", // 導向首頁
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!userDataStore.userData.value; // 判斷是否有登入資料

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 如果需要驗證，且未登入，跳轉到首頁
    console.log("未登入，跳轉到首頁");
    next(RouterPath.AUTH.WELCOME.path);
  } else if (isAuthenticated && to.path === RouterPath.AUTH.WELCOME.path) {
    // 已登入但訪問首頁，跳轉到 PROFILE 頁面
    console.log("已登入，用戶從首頁跳轉到 PROFILE 頁面");
    next(RouterPath.HOME.PROFILE.INDEX.path);
  } else if (isAuthenticated && to.path === RouterPath.AUTH.LOGIN.path) {
    // 已登入但訪問登入頁，跳轉到 PROFILE 頁面
    console.log("已登入，用戶從登入頁跳轉到 PROFILE 頁面");
    next(RouterPath.HOME.PROFILE.INDEX.path);
  } else {
    next(); // 繼續導航
  }
});

export default router;
