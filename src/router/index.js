import Vue from "vue"
import VueRouter from "vue-router"
import store from "@/stores/auth"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "personal-kb",
        name: "PersonalKB",
        component: () => import("@/views/PersonalKBView.vue"),
        meta: { requiresAuth: true },
      },
      // 添加新的知识库详情路由
      {
        path: "knowledge-base/:id",
        name: "KnowledgeBaseDetail",
        component: () => import("@/views/KnowledgeQAView/KnowledgeBaseDetail.vue"),
        meta: { requiresAuth: true },
        props: (route) => ({
          id: route.params.id,
          name: route.query.name // 传递name参数
        })
      },
      {
        path: "new-chat",
        name: "NewChat",
        component: () => import("@/views/NewChatView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "knowledge-qa",
        name: "KnowledgeQA",
        component: () => import("@/views/KnowledgeQAView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "doc-writing",
        name: "DocWriting",
        component: () => import("@/views/DocWritingView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/Profile.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

// index.js 的 beforeEach
router.beforeEach((to, from, next) => {
  console.log('当前 token:', store.getters.getToken); // 检查 token 是否存在
  console.log('是否已认证:', store.getters.isAuthenticated);
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login'); // 重定向到登录页
    } else {
      next(); // 放行
    }
  } else {
    next(); // 不需要认证的路由直接放行
  }
});

export default router