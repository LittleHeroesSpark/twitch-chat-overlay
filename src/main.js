import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    messages: [],
    users: [],
  },
  getters: {
    messages: (state) => {
      return state.messages;
    },
    users: (state) => {
      return state.users;
    },
  },
  mutations: {
    addUser(state, payload) {
      var foundUser = state.users.find(
        (user) => user.userId === payload.userId
      );

      if (foundUser) {
        return;
      }

      state.users.push({
        userId: payload.userId,
        username: payload.username,
      });
    },
    addMessage(state, payload) {
      state.messages.push({
        tags: payload.tags,
        message: payload.message,
      });
    },
  },
  plugins: [createPersistedState()],
});

new Vue({
  store: store,
  render: (h) => h(App),
}).$mount("#app");
