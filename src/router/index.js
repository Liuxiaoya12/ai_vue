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
        // meta: { requiresAuth: true },
      },
      {
        path: "new-chat",
        name: "NewChat",
        component: () => import("@/views/NewChatView.vue"),
        // meta: { requiresAuth: true },
      },
      {
        path: "knowledge-qa",
        name: "KnowledgeQA",
        component: () => import("@/views/KnowledgeQAView.vue"),
        // meta: { requiresAuth: true },
      },
      {
        path: "doc-writing",
        name: "DocWriting",
        component: () => import("@/views/DocWritingView.vue"),
        // meta: { requiresAuth: true },
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/Profile.vue"),
        // meta: { requiresAuth: true },
      },
    ],
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if ((to.name === "Login" || to.name === "Register") && store.getters.isAuthenticated) {
    next("/personal-kb")
  } else {
    next()
  }
})

export default router

