import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Theme: "dark",
    navBarShow: true,
    // 播放核心----------------------
    songList: [],
    playIndex: -1,
  },
  // 计算属性
  getters: {
    playSongId(S) {
      return S.songList[S.playIndex] ? S.songList[S.playIndex] : -1;
    },
  },
  // 暴露的属性修改方法
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
    // 隐藏底部导航栏（五大金刚键）
    navBarHidden(S) {
      S.navBarShow = false;
    },
    // 显示底部导航栏（五大金刚键）
    navBarShow(S) {
      S.navBarShow = false;
    },
    //修改整个本地播放列表
    setSongList(S, List) {
      S.songList = List;
      S.songList.length == 0 && (S.playIndex = -1);
      console.log(S.songList);
    },
    // 播放列表删除指定歌曲
    songListReduce(S, songId) {
      S.songList.splice(S.songList.indexOf(songId), 1);
      S.songList.length == 0 && (S.playIndex = -1);
    },
    // 播放列表末尾添加歌曲
    songListAdd(S, songId) {
      S.songList.push(songId);
    },
    //设置具体的播放第几首歌
    setPlayIndex(S, Index) {
      S.playIndex = Index;
      console.log(S.playIndex);
    },
    //下一首歌
    nextSong(S) {
      S.playIndex == S.songList.length - 1
        ? (S.playIndex = 0)
        : (S.playIndex += 1);
    },
    //上一首歌
    preSong(S) {
      S.playIndex == 0
        ? (S.playIndex = S.songList.length - 1)
        : (S.playIndex -= 1);
    },
  },
  actions: {},
  modules: {},
});
