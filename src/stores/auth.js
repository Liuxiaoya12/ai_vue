const store = {
    state: {
        token: null,
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        clearToken(state) {
            state.token = null
        },
    },
    actions: {
        login(context, token) {
            context.commit("setToken", token)
        },
        logout(context) {
            context.commit("clearToken")
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.token,
        getToken: (state) => state.token,
    },
}

export default {
    state: {
        token: null,
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        clearToken(state) {
            state.token = null
        },
    },
    actions: {
        login(context, token) {
            context.commit("setToken", token)
        },
        logout(context) {
            context.commit("clearToken")
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.token,
        getToken: (state) => state.token,
    },
}

