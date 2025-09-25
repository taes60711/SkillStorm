// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var isProd = mode === 'production';
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
    };
});
