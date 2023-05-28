import Vue from "vue";
import VueRouter from "vue-router";
//----------自定义路由-----------
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/find", //重定向至发现页面
  },
  {
    path: "/find",
    name: "find",
    component: () => import("../views/FindView.vue"),
  },
  {
    path: "/userHome",
    name: "userHome",
    component: () => import("../views/userHome.vue"),
  },
  {
    path: "/playListDetail",
    name: "playListDetail",
    component: () => import("../views/PlayListDetail.vue"),
  },
  {
    path: "/album",
    name: "album",
    component: () => import("../views/albumView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginRegistration.vue"),
  },
  {
    path: "/searchInput",
    name: "searchInput",
    component: () => import("../views/searchInput.vue"),
  },
  {
    path: "/searchResult",
    name: "searchResult",
    component: () => import("../views/searchResult.vue"),
  },
];
const router = new VueRouter({
  routes,
});
export default router;
