import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig(({ mode }) => ({
    plugins: [
        vue(),
        viteMockServe({
            localEnabled: mode === "development",
        }),
    ],
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
    server: {
        proxy: {
            "/api": {
                target: "http://192.168.190.185:3000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
}));
