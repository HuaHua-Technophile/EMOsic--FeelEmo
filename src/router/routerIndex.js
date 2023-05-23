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
    path: "/mine",
    name: "mine",
    component: () => import("../views/MineView.vue"),
  },
  {
    path: "/playListDetail",
    name: "playListDetail",
    component: () => import("../views/PlayListDetail.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginRegistration.vue"),
  },
];
const router = new VueRouter({
  routes,
});
export default router;
