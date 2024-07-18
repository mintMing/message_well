module.exports = {
    extends: ["@commitlint/config-conventional"], // 继承conventional-changelog的提交规范
    rules: {
        "type-enum": [
            2, // 错误级别
            "always",
            [
                "feat", // 新功能
                "fix", // 修复
                "docs", // 文档
                "style", // 格式修改
                "refactor", // 重构
                "perf", // 性能优化
                "test", // 测试
                "chore", // 构建过程或辅助工具的变动
                "revert", // 撤销之前的提交
                "build", // 项目构建/外部依赖的变动
            ],
        ],
        "type-case": [0],
        "type-empty": [0],
        "scope-empty": [0],
        "scope-case": [0],
        "subject-full-stop": [0, "never"],
        "subject-case": [0], 
        "header-max-length": [0, "always", 72],
    },
};


