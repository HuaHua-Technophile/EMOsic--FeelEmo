import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Theme: "dark",
    navBarShow: true,
  },
  getters: {},
  mutations: {
    //切换全局主题
    changeTheme(S) {
      if (S.Theme === "dark") {
        S.Theme = "light";
        document.documentElement.dataset.bsTheme = "light";
      } else {
        S.Theme = "dark";
        document.documentElement.dataset.bsTheme = "dark";
      }
    },
    // 隐藏底部导航栏
    navBarHidden(S) {
      S.navBarShow = false;
    },
    // 显示底部导航栏
    navBarShow(S) {
      S.navBarShow = false;
    },
  },
  actions: {},
  modules: {},
});
