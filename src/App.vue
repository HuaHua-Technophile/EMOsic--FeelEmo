<template>
  <div class="w-100 vh-100 noScrollBar">
    <transition name="view">
      <router-view
        :Theme="Theme"
        @changeTheme="changeTheme"
        @navBarHidden="navBarHidden"
        @navBarShow="navBarShow"
        @songListChange="songListChange"
        @setIndex="setIndex"
        @playSong="playSong"
        @miniPlayerChange="miniPlayerChange"></router-view>
    </transition>
    <!-- 底栏 -->
    <div
      class="pt-1 position-fixed w-100 bg-body"
      style="bottom: -1px; z-index: 99">
      <!-- 底部播放器 -->
      <!-- 播放核心 -->
      <audio
        ref="playCore"
        src=""
        controls
        @timeupdate="setSchedule($event)"></audio>
      <div class="d-flex align-items-center ps-3 pe-3">
        <!-- 播放器左侧专辑封面、歌曲名 -->
        <div class="flex-grow-1 overflow-hidden">
          <!-- 切歌轮播图 -->
          <swiper-container ref="miniPlayer" loop="true" space-between="15">
            <swiper-slide
              v-for="(item, index) in miniPLayer"
              :key="index"
              class="w-100 d-flex align-items-center overflow-hidden text-nowrap">
              <img
                v-if="item.al"
                :src="`${item.al.picUrl}?param=x40y40`"
                class="rounded-pill me-2" />
              <span> {{ item.name }} </span>
              <span class="ms-1 me-1 opacity-50">-</span>
              <span v-if="item.ar" class="opacity-50">{{
                item.ar[0].name
              }}</span>
            </swiper-slide>
          </swiper-container>
        </div>
        <!-- 播放器右侧环形进度条、歌单列表展开-->
        <div class="ms-3 flex-sherk-0 d-flex align-items-center">
          <!-- 环形进度条 -->
          <div
            class="miniPlayerBtn position-relative rounded-pill"
            @click="Play_Pause()">
            <!-- 正在播放显示暂停按钮 -->
            <i
              v-if="isPlaying"
              class="bi bi-pause text-white fs-3 position-absolute top-50 start-50 translate-middle"></i>
            <!-- 未在播放时显示三角形播放按钮 -->
            <i
              v-else
              class="bi bi-play-fill text-white fs-3 position-absolute top-50 translate-middle"
              style="left: 55%"></i>
            <van-circle
              v-model="currentRate"
              :rate="100"
              :stroke-width="130"
              :size="26"
              :layer-color="'white'"
              :color="'red'"
              class="position-absolute start-50 translate-middle" />
          </div>
          <i class="bi bi-music-note-list fs-4 ms-3"></i>
        </div>
      </div>
      <!-- 底部导航栏 -->
      <nav v-if="navBar" class="nav justify-content-around">
        <router-link class="nav-link" to="/find">
          <span class="iconfont icon-netease-cloud-music-line"></span>
          <span>发现</span>
        </router-link>
        <router-link class="nav-link" to="/podcast">
          <i class="bi bi-broadcast"></i><span>播客</span>
        </router-link>
        <router-link class="nav-link" to="/mine">
          <i class="bi bi-music-note-beamed"></i><span>我的</span>
        </router-link>
        <router-link class="nav-link" to="/follow">
          <span class="iconfont icon-guanzhu"></span><span>关注</span>
        </router-link>
        <router-link class="nav-link" to="/cloudVillage">
          <span class="iconfont icon-taolunqu"></span><span>云村</span>
        </router-link>
      </nav>
    </div>
    <!-- Big播放器 -->
  </div>
</template>
<script>
  import { getSongUrl, getSongDetail } from "./api/getData.js";
  import throttle from "lodash/throttle";
  export default {
    data() {
      return {
        Theme: "dark",
        navBar: true,
        songList: [],
        currentRate: 0,
        currentTime: 0,
        duration: 0,
        isPlaying: false,
        miniPLayer: [],
        playIndex: 0,
      };
    },
    //方法
    methods: {
      //切换全局主题
      changeTheme() {
        if (this.Theme === "dark") {
          this.Theme = "light";
          this.ThemeColor = "#3e465b";
          this.ThemeBgColor = "#f8f9fd";
          document.documentElement.dataset.bsTheme = "light";
        } else {
          this.Theme = "dark";
          this.ThemeColor = "#e8e8e8";
          this.ThemeBgColor = "#1a1a23";
          document.documentElement.dataset.bsTheme = "dark";
        }
      },
      // 隐藏底部导航栏
      navBarHidden() {
        this.navBar = false;
      },
      // 显示底部导航栏
      navBarShow() {
        this.navBar = false;
      },
      // 下一首歌
      nextSong() {
        this.playIndex == this.songList.length - 1
          ? (this.playIndex = 0)
          : (this.playIndex += 1);
        this.playSong();
        this.miniPlayerChange();
      },
      // 上一首歌
      preSong() {
        this.playIndex == 0
          ? (this.playIndex = this.songList.length - 1)
          : (this.playIndex -= 1);
        this.playSong();
        this.miniPlayerChange();
      },
      // 修改当前index,任意第几首歌
      setIndex(index) {
        this.playIndex = index;
        this.playSong();
      },
      // 播放当前指定index的歌曲
      async playSong() {
        await getSongUrl(this.songList[this.playIndex]).then((res) => {
          this.$refs.playCore.src = res.data[0].url;
        });
        this.$refs.playCore.ondurationchange = () => {
          this.duration = this.$refs.playCore.duration;
          this.$refs.playCore.play();
        };
      },
      // 传入一个歌曲列表,修改歌曲列表
      songListChange(data) {
        this.songList = data;
      },
      // 播放列表末尾添加歌曲
      songListAdd(songId) {
        this.songList.push(songId);
      },
      // 播放列表删除指定歌曲
      songListReduce(songId) {
        this.songList.splice(this.songList.indexOf(songId), 1);
      },
      //点击播放按钮暂停/继续歌曲
      Play_Pause() {
        if (this.isPlaying) {
          this.$refs.playCore.pause();
          this.isPlaying = false;
        } else {
          this.$refs.playCore.play();
          this.isPlaying = true;
        }
      },
      // time update事件,修改播放进度
      setSchedule: throttle(function (e) {
        this.currentTime = e.target.currentTime;
        this.currentRate = (this.currentTime / this.duration) * 100;
      }, 1000),
      // 传入当前index,渲染底部迷你播放器
      async miniPlayerChange() {
        // 如果歌曲列表只有1~3首,不需要动态加载
        if (this.songList.length <= 3) {
          let param = this.songList;
          await getSongDetail(param).then((res) => {
            this.miniPLayer = res.songs;
          });
          this.$refs.miniPlayer.swiper.slideTo(this.playIndex, 0, false);
        } else {
          let param = null;
          if (this.playIndex == 0) {
            param = [
              this.songList[this.songList.length - 1],
              this.songList[0],
              this.songList[1],
            ];
          } else if (this.playIndex == this.songList.length - 1) {
            param = [
              this.songList[this.playIndex - 1],
              this.songList[this.playIndex],
              this.songList[0],
            ];
          } else {
            param = [
              this.songList[this.playIndex - 1],
              this.songList[this.playIndex],
              this.songList[this.playIndex + 1],
            ];
          }
          await getSongDetail(param).then((res) => {
            this.miniPLayer = res.songs;
          });
          this.$refs.miniPlayer.swiper.slideTo(1, 0, false);
        }
      },
    },
    // 挂载后生命周期
    mounted() {
      //dom音频添加监听事件,用于方向修改vue中存储的播放状态
      this.$refs.playCore.onplay = () => {
        this.isPlaying = true;
      };
      this.$refs.playCore.onpause = () => {
        this.isPlaying = false;
      };
      // 迷你播放器前滑，加载列表上一首
      this.$refs.miniPlayer.addEventListener("slideprevtransitionend", () => {
        this.preSong();
      });
      // 迷你播放器后滑，播放下一首
      this.$refs.miniPlayer.addEventListener("slidenexttransitionend", () => {
        this.nextSong();
      });
    },
    // 监听器
    watch: {
      //监听歌曲列表,如果删到不剩歌,取消播放;
      songList(newVal) {
        if (newVal.length == 0) {
          this.miniPLayer = [];
          this.$refs.playCore.pause();
          this.$refs.playCore.src = "";
        }
      },
    },
  };
</script>
<style lang="scss">
  .view-enter-active,
  .view-leave-active {
    transition: all 0.5s;
  }
  .view-enter,
  .view-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
  .miniPlayerBtn {
    box-shadow: 0 1px 5px black;
    height: 26px;
    width: 26px;
    > .van-circle {
      top: 48%;
      > svg > path {
        opacity: 0.5;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .nav-link {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--bs-secondary-color);
    > *:nth-child(1) {
      width: 30px;
      height: 30px;
      transition: all 0.5s;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > *:nth-child(2) {
      transition: all 0.5s;
      font-size: 12px;
    }
    &.router-link-active {
      > *:nth-child(1) {
        background: var(--bs-red);
        border-radius: 999999px;
        color: var(--bs-light);
        font-size: 23px;
      }
      > *:nth-child(2) {
        color: var(--bs-red);
      }
    }
  }
</style>
