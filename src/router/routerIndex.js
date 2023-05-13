import Vue from "vue";
import VueRouter from "vue-router";
//----------自定义路由-----------
import find from "../views/FindView/FindView.vue";
import podcast from "../views/PodcastView.vue";
import mine from "../views/MineView.vue";
import follow from "../views/FollowView.vue";
import cloudVillage from "../views/CloudVillageView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/find", //重定向至发现页面
  },
  {
    path: "/find",
    name: "find",
    component: find,
  },
  {
    path: "/podcast",
    name: "podcast",
    component: podcast,
  },
  {
    path: "/mine",
    name: "mine",
    component: mine,
  },
  {
    path: "/follow",
    name: "follow",
    component: follow,
  },
  {
    path: "/cloudVillage",
    name: "cloudVillage",
    component: cloudVillage,
  },
];
const router = new VueRouter({
  routes,
});
export default router;
