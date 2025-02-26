import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/stores/auth"
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import '@/assets/global.css'
import axios from "axios"
Vue.config.productionTip = false
Vue.use(ElementUI);
// 添加全局错误处理
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || "/api"
Vue.config.errorHandler = (err, vm, info) => {
  console.error("Global error:", err, info)
  // 可以在这里添加错误报告逻辑
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
