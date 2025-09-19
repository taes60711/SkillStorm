import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
  var mode = _a.mode;
  return {
    // base: "/SkillStorm/",
    plugins: [vue()],
    resolve: {
      alias: {
        "@": "/src"
      }
    }
  };
});
