import globals from "globals";
import pluginJs from "@eslint/js"; //
import pluginVue from "eslint-plugin-vue"; // 查找vue语法错误

import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-node";
import configPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import VueEslintParser from "vue-eslint-parser";

export default [
    {
        files: ["**/*.{js,mjs,cjs,vue}"],
    },
    {
        languageOptions: {
            ecmaVersion: "latest", // 支持最新的 ECMAScript 特性
            sourceType: "module", // 使用 ECMAScript 模块
            parser: VueEslintParser, // 使用 Vue 解析器
            globals: {
                ...globals.browser, // 包含浏览器全局变量
                ...globals.node, // 包含 Node.js 全局变量
                jest: true, // 包含 Jest 全局变量
            },
        },
    },
    pluginJs.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    {
        plugins: {
            prettier: prettierPlugin,
            import: importPlugin, // import 是 JavaScript 的关键字
            node: nodePlugin,
        },
        rules: {
            "no-undef": ["error", { typeof: true, ignoreExports: true }],
            "no-var": "error", // 要求使用 let 或 const 而不是 var
            "no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空行
            "no-unexpected-multiline": "error", // 禁止空余的多行
            "no-useless-escape": "off", // 禁止不必要的转义字符
            "vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
            "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用
            "vue/no-mutating-props": "off", // 不允许组件 prop的改变
            "vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
            semi: ["error", "always"], // 表达式必须加上分号
            ...configPrettier.rules, //  禁用与 Prettier 冲突的规则
            "prettier/prettier": "error", // Prettier 规则优先
            quotes: ["error", "double"], // 必须使用双引号
            "vue/no-undefined-components": "error",
            "vue/no-unused-components": "error",
        },
        ignores: ["node_modules/*", "mock/*"],
    },
];
