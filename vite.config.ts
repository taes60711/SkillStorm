// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    plugins: [vue()],
    // base: '/SkillStorm/',
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    // 用 esbuild 內建的 drop 移除 console/debugger
    esbuild: {
      drop: isProd ? ['console', 'debugger'] : []
    }
  }
})
