// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    // 👇 加上 GitHub Pages 仓库名
    base: "/SkillStorm/",
    resolve: {
      alias: {
        "@": "/src"
      }
    }
  };
});
