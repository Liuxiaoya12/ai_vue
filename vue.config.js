module.exports = {
    devServer: {
        proxy: {
            "/api": {
                host: '127.0.0.1',
                target: "http://localhost:8010",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "", // 这会移除 /api 前缀
                },
                logLevel: "debug", // 添加这行来查看详细日志
            },
        },
    },
}
