import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { cloneDeep } from "lodash";
export default new Vuex.Store({
  state: {
    Theme: "dark", //全局主题
    miniPlayerStatus: false, //迷你播放器的显示/隐藏状态
    songList: [], //本地播放列表
    songListBackup: [], //本地播放列表在随机乱序前的备份
    playIndex: -1, //当前歌曲的下标
    songLoop: 0, //播放循环模式
    shareStatus: false, //分享面板状态
    shareInfo: "", // 待分享信息
    kw: "", //搜索关键词,在许多路由中使用到,因此存储在vuex中
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
    // 隐藏底部迷你播放器
    miniPlayerHidden(S) {
      S.miniPlayerStatus = false;
    },
    // 显示底部迷你播放器
    miniPlayerShow(S) {
      S.miniPlayerStatus = true;
    },
    //修改整个本地播放列表
    setSongList(S, idList) {
      S.songListBackup = cloneDeep(idList);
      S.songList = cloneDeep(idList);
      S.songList.length == 0
        ? ((S.playIndex = -1), (S.miniPlayerStatus = false))
        : (S.miniPlayerStatus = true);
    },
    // 播放列表删除指定歌曲
    songListReduce(S, songId) {
      S.songList.splice(S.songList.indexOf(songId), 1);
      S.songListBackup.splice(S.songListBackup.indexOf(songId), 1);
      S.songList.length == 0
        ? ((S.playIndex = -1), (S.miniPlayerStatus = false))
        : (S.miniPlayerStatus = true);
    },
    // 播放列表末尾添加歌曲
    songListAdd(S, songId) {
      S.songList.push(songId);
      S.songListBackup.push(songId);
    },
    // 设置具体播放哪一首歌
    setPlaySongId(S, songId) {
      S.playIndex = S.songList.indexOf(songId);
    },
    //设置具体的播放第几首歌
    setPlayIndex(S, Index) {
      S.playIndex = Index;
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
    // 设置循环方式
    setSongLoop(S, loop) {
      if (loop) {
        S.songLoop = loop;
      } else {
        S.songLoop = S.songLoop == 2 ? 0 : S.songLoop + 1;
      }
      // 如果是随机播放，则修改歌单列表顺序，实现伪随机
      if (S.songLoop == 2) {
        let id = S.songList[S.playIndex];
        S.songList = S.songList.sort(() => Math.random() - 0.5);
        S.playIndex = S.songList.indexOf(id);
      } else {
        S.songList = cloneDeep(S.songListBackup);
      }
    },
    // 修改分享信息
    setShareInfo(S, info) {
      S.shareInfo = info;
    },
    // 分享面板显示
    shareShow(S) {
      S.shareStatus = true;
    },
    // 分享面板隐藏
    shareHidden(S) {
      S.shareStatus = false;
    },
    // 设置搜索关键词
    setKw(S, kw) {
      S.kw = kw;
    },
  },
  actions: {},
  modules: {},
});
