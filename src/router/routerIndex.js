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
    component: () => import("../views/FindView/FindView.vue"),
  },
  {
    path: "/podcast",
    name: "podcast",
    component: () => import("../views/PodcastView.vue"),
  },
  {
    path: "/mine",
    name: "mine",
    component: () => import("../views/MineView.vue"),
  },
  {
    path: "/follow",
    name: "follow",
    component: () => import("../views/FollowView.vue"),
  },
  {
    path: "/cloudVillage",
    name: "cloudVillage",
    component: () => import("../views/CloudVillageView.vue"),
  },
  {
    path: "/playListDetail",
    name: "playListDetail",
    component: () => import("../views/PlayList/PlayListDetail.vue"),
  },
];
const router = new VueRouter({
  routes,
});
export default router;
