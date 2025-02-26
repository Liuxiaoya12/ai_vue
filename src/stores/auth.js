// src/stores/auth.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex); // 确保 Vuex 已注册

export default new Vuex.Store({
    state: {
        token: localStorage.getItem("token") || null,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem("token");
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit("setToken", token);
        },
        logout({ commit }) {
            commit("clearToken");
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getToken: (state) => state.token,
    },
});