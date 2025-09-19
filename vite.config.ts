import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production"; // 判斷是否生產環境

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": "/src"
      }
    },
    build: {
      terserOptions: {
        compress: {
          drop_debugger: isProduction, // 刪掉 debugger
          // 使用 pure_funcs 只刪指定 console 函式
          pure_funcs: isProduction
            ? ["console.log", "console.debug", "console.info", "console.warn"]
            : []
        }
      }
    }
  };
});
