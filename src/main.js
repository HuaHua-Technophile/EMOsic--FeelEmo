import "./assets/customBootStrap.scss"; //最先导入bootstrap样式,以便于可以被自定义样式覆盖
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css"; //最先导入bootstrap icon字体图标
//-------------------------------
import Vue from "vue";
import App from "./App.vue";
import router from "./router/routerIndex";
import store from "./store";
//-------------------------------
import { library } from "@fortawesome/fontawesome-svg-core"; /* 导入font核心 */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; //注册全局font框架组件
Vue.component("font-awesome-icon", FontAwesomeIcon); //注册全局font框架组件
import { faBars } from "@fortawesome/free-solid-svg-icons"; //默认样式:填充
import {} from "@fortawesome/free-regular-svg-icons"; //免费样式:非填充
library.add(faBars); //核心按需使用图标(分字重)
//------------------------------
import { register } from "swiper/element/bundle"; // 导入功能以注册Swiper自定义元素
register(); // 注册Swiper自定义元素
//--------------------------------
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App), //替换根标签 为 根组件
}).$mount("#app");
//检测浏览器主题,对应切换亮色/暗色
/* const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
themeMedia.addListener((e) => {
  if (e.matches) {
    console.log(app.$data.globalTheme);
  } else {
    console.log(app.$data.globalTheme);
  }
}); */
