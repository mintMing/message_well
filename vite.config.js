import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve("./src"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // 允许使用 js 表达式
                javascriptEnabled: true,
                // 每个SCSS文件自动导入
                additionalData: "@import './src/styles/variable.scss';",
            },
        },
    },
});