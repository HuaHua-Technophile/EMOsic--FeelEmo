//----bootstrap---------------------------
import "./assets/customBootStrap.scss"; //最先导入bootstrap样式,以便于可以被自定义样式覆盖
import "bootstrap/dist/js/bootstrap.bundle.js";
//----bootstrap icon字体图标库--------------
import "bootstrap-icons/font/bootstrap-icons.css"; //最先导入bootstrap icon字体图标
//----Swiper9.3.1-------------------------
import { register } from "swiper/element/bundle"; // 导入功能以注册Swiper自定义元素
/*//----lyric-parser歌词解析-----------------
let lyric = new Lyric(lyricStr, handler);
function hanlder({ lineNum, txt }) {
  // this hanlder called when lineNum change
} */
//----vue,路由，vuex---------------------
import Vue from "vue";
import App from "./App.vue";
import router from "./router/routerIndex";
import store from "./store/storeIndex";
//----vue全局2级组件-------------------
import squareCard from "./components/son/squareCard.vue";
Vue.component("square-card", squareCard);
import swiperCardTitle from "./components/son/swiperCardTitle.vue";
Vue.component("swiper-card-title", swiperCardTitle);
import listSearch from "./components/son/listSearch.vue";
Vue.component("list-search", listSearch);
import playListHeader from "./components/son/playListHeader.vue";
Vue.component("play-list-header", playListHeader);
//----vue全局1级组件-------------------
import squareSwiper from "./components/squareSwiper.vue";
Vue.component("square-swiper", squareSwiper);
import listSwiper from "./components/listSwiper.vue";
Vue.component("list-swiper", listSwiper);
import topSwiper from "./components/topSwiper.vue";
Vue.component("top-swiper", topSwiper);
import reFresh from "./components/reFresh.vue";
Vue.component("re-fresh", reFresh);
import bigPlayer from "./components/bigPlayer.vue";
Vue.component("big-player", bigPlayer);
import songList from "./components/songList.vue";
Vue.component("song-list", songList);
//----FontAwesome字体图标库---------
import { library } from "@fortawesome/fontawesome-svg-core"; /* 导入font核心 */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; //注册全局font框架组件
Vue.component("font-awesome-icon", FontAwesomeIcon); //注册全局font框架组件
import { faAngleRight, faShare } from "@fortawesome/free-solid-svg-icons"; //默认样式:填充
import {} from "@fortawesome/free-regular-svg-icons"; //免费样式:非填充
library.add(faAngleRight, faShare); //核心按需使用图标(分字重)
register(); // 注册Swiper自定义元素
//----自定义图标库-------------------
import "./assets/font_navbar/iconfont.css";
import "./assets/font_songLoop/iconfont.css";
import "./assets/font_Baidu_Wechat/iconfont.css";
import "./assets/font_Weibo/iconfont.css";
import "./assets/font_collection/iconfont.css";
//----Vant2组件导入
import "../node_modules/vant/lib/style/ellipsis.css"; //1，2，3行文本溢出隐藏
import "vant/lib/index.css";
import { Circle, ShareSheet, Overlay, NoticeBar, Tab, Tabs } from "vant"; //按需导入
Vue.use(Circle).use(ShareSheet).use(Overlay).use(NoticeBar).use(Tab).use(Tabs);
/* //----Lodash引入-------------------
import lodash from "lodash";
Vue.prototype._ = lodash; */
//----自定义预设样式-----------------
import "./assets/PresetStyle.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App), //替换根标签 为 根组件
}).$mount("#app");
//----全局过滤器:转换单位-------------
Vue.filter("ConUnit", function (num) {
  if (num < 10000) return num;
  let w = num > 10000 ? num / 10000 : num; //万计算
  let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万";
  return y;
});
//检测浏览器主题,对应切换亮色/暗色
/* const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
themeMedia.addListener((e) => {
  if (e.matches) {
    console.log(app.$data.globalTheme);
  } else {
    console.log(app.$data.globalTheme);
  }
}); */
