// import axios from "axios"
// import store from "@/stores/auth"
// //
// // const api = axios.create({
// //     baseURL: "/api",
// //     headers: {
// //         "Content-Type": "application/json",
// //     },
// // })
// //
// // export const login = async (email, password) => {
// //     return await api.post("/user/login", { email, password })
// // }
// //
// // export const register = async (name, email, password, repeatpassword) => {
// //     return await api.post("/user/register", { name, email, password, repeatpassword })
// // }
// // 创建一个新的 axios 实例，用于非登录/注册请求
// const api = axios.create({
//     baseURL: "http://127.0.0.1:8010",
//     headers: {
//         "Content-Type": "application/json",
//     },
// })
// export const login = async (email, password) => {
//     return await axios.post('http://127.0.0.1:8010/user/login', { email, password })
// }
// export const register = async (name, email, password, repeatpassword) => {
//     return await axios.post("http://127.0.0.1:8010/user/register", { name, email, password, repeatpassword })
// }
//
// // 如果存在令牌,则为请求添加认证头
// api.interceptors.request.use((config) => {
//     const token = store.state.token
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// })
//
// export default api
import axios from "axios"
import store from '@/stores/auth'
// 创建一个新的 axios 实例
const api = axios.create({
    // 使用相对路径，让环境配置决定完整的 URL
    baseURL: process.env.VUE_APP_API_BASE_URL || "/api",
    headers: {
        "Content-Type": "application/json",
    },
})
// 登录和注册函数使用 api 实例
export const login = async (email, password) => {
    try {
        // 使用相对路径 '/user/login'
        const response = await api.post("/user/login", { email, password })
        console.log("Login response:", response)
        return response
    } catch (error) {
        console.error("Login error:", error.response || error)
        throw error
    }
}

export const register = async (name, email, password, repeatpassword) => {
    console.log("Attempting registration with:", { name, email, password, repeatpassword }) // 添加日志
    return await api.post("/user/register", { name, email, password, repeatpassword })
}

// 如果存在令牌，则为请求添加认证头
api.interceptors.request.use((config) => {
    const token = store.state.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    console.log("Request config:", config) // 添加日志
    return config
})

// 添加响应拦截器以记录错误
api.interceptors.request.use(
    (config) => {
        console.log("Outgoing request:", config) // 添加请求日志
        return config
    },
    (error) => {
        console.error("Request error:", error) // 添加请求错误日志
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (response) => {
        console.log("Received response:", response) // 添加响应日志
        return response
    },
    (error) => {
        console.error("Response error:", error.response || error) // 添加详细错误日志
        return Promise.reject(error)
    },
)

export default api



