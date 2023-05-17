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
        @miniPlayerChange="miniPlayerChange"></router-view>
    </transition>
    <!-- 底栏(迷你播放器\5大金刚键) -->
    <div
      class="pt-1 position-fixed w-100 bg-body"
      style="bottom: -1px; z-index: 99">
      <!-- 播放核心 -->
      <audio
        ref="playCore"
        src=""
        controls
        @timeupdate="setSchedule($event)"></audio>
      <!-- 底部迷你播放器(左右横滑切歌) -->
      <transition name="sideUp">
        <div
          v-show="songList.length != 0"
          class="align-items-center ps-3 pe-3"
          :class="[{ 'd-flex': songList.length != 0 }]">
          <!-- 播放器左侧专辑封面、歌曲名 -->
          <div class="flex-grow-1 overflow-hidden">
            <!-- 切歌轮播图 -->
            <swiper-container
              ref="miniPlayer"
              :loop="miniLoop"
              space-between="15">
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
                v-show="isPlaying"
                class="bi bi-pause text-white fs-3 position-absolute top-50 start-50 translate-middle"></i>
              <!-- 未在播放时显示三角形播放按钮 -->
              <i
                v-show="!isPlaying"
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
            <!-- 迷你播放列表 -->
            <i
              @click="miniListShow = true"
              class="bi bi-music-note-list fs-4 ms-3"></i>
          </div>
        </div>
      </transition>
      <!-- 底部导航栏(5大金刚键) -->
      <transition name="sideUp">
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
      </transition>
    </div>
    <!-- 迷你播放列表,在任意页面通用 -->
    <transition name="sideUp">
      <div
        ref="miniListBg"
        v-show="miniListShow"
        @click="miniListHidden($event)"
        class="miniList w-100 vh-100 position-fixed top-0">
        <div
          class="position-absolute start-50 translate-middle-x pt-3 ps-3 pe-3 bg-body rounded-5 overflow-hidden">
          <!-- 当前播放 -->
          <div class="mb-2">
            <span class="fs-5">当前播放</span>
            <span class="fs-7 opacity-50">({{ songList.length }})</span>
          </div>
          <!-- 循环控制\全部下载\歌单收藏\清除播放列表 -->
          <div
            class="d-flex justify-content-between align-items-center pb-2 border-bottom">
            <div v-show="songLoop == 0">
              <i class="iconfont icon-24gl-shuffle me-2"></i
              ><span>列表循环</span>
            </div>
            <div v-show="songLoop == 1">
              <i class="iconfont icon-24gl-repeat2 me-2"></i
              ><span>单曲循环</span>
            </div>
            <div v-show="songLoop == 2">
              <i class="iconfont icon-24gl-repeatOnce2 me-2"></i
              ><span>随机播放</span>
            </div>
            <div class="d-flex fs-5">
              <i class="bi bi-download me-3"></i>
              <i class="bi bi-collection-play me-3"></i>
              <i class="bi bi-trash"></i>
            </div>
          </div>
          <!-- 歌单列表主体 ,懒加载-->
          <van-list
            v-model="miniListLoading"
            :finished="miniListFinished"
            @load="miniListLoad()"
            class="pt-3 overflow-y-scroll">
            <div
              v-for="(item, index) in miniList"
              :key="index"
              class="d-flex justify-content-between mb-3">
              <!-- 列表左侧 -->
              <div
                class="d-flex align-items-end flex-grow-1 overflow-hidden"
                :class="{ 'text-danger': index == playIndex }">
                <span
                  v-if="item.fee == 1 || item.fee == 4"
                  class="InfoTag text-danger border border-danger d-flex align-items-center">
                  VIP
                </span>
                <span class="text-nowrap">{{ item.name }}</span>
                <!-- 歌手信息 -->
                <div class="ms-1 fs-8 opacity-50 text-nowrap">
                  ·
                  <span v-for="(j, indexs) in item.ar" :key="indexs"
                    ><span>{{ j.name }}</span
                    ><span v-if="indexs != item.ar.length - 1">/</span></span
                  >
                </div>
              </div>
              <!-- 列表右侧close按钮 -->
              <div class="ms-2 flex-shrink-0">
                <i class="bi bi-x-lg"></i>
              </div>
            </div>
          </van-list>
        </div>
      </div>
    </transition>
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
        playIndex: 0,
        currentRate: 0,
        currentTime: 0,
        duration: 0,
        isPlaying: false,
        miniPLayer: [],
        miniList: [],
        miniListShow: false,
        miniLoop: false,
        miniListLoading: false,
        miniListFinished: false,
        songLoop: 0,
      };
    },
    // 计算属性
    computed: {
      playSongId() {
        return this.songList[this.playIndex];
      },
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
      //隐藏迷你播放列表
      miniListHidden(e) {
        if (e.target == this.$refs.miniListBg) this.miniListShow = false;
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
          this.miniLoop = true;
          let param = this.songList;
          await getSongDetail(param).then((res) => {
            this.miniPLayer = res.songs;
          });
          this.$refs.miniPlayer.swiper.slideTo(this.playIndex, 0, false);
        } else {
          this.miniLoop = false;
          let param = null;
          if (this.playIndex === 0) {
            param = [
              this.songList[this.songList.length - 1],
              this.playSongId,
              this.songList[1],
            ];
          } else if (this.playIndex === this.songList.length - 1) {
            param = [
              this.songList[this.playIndex - 1],
              this.playSongId,
              this.songList[0],
            ];
          } else {
            param = [
              this.songList[this.playIndex - 1],
              this.playSongId,
              this.songList[this.playIndex + 1],
            ];
          }
          await getSongDetail(param).then((res) => {
            this.miniPLayer = res.songs;
          });
          this.$refs.miniPlayer.swiper.slideToLoop(1, 0, false);
        }
      },
      //传入整个播放列表,包含所有的歌曲id,渲染迷你的歌曲列表.播放列表删除某首歌后,直接删除相应列表dom,避免再次发送列表全部id进行请求
      async miniListLoad() {
        if (this.songList.length == this.miniList.length) {
          this.miniListFinished = true;
        } else {
          this.miniListFinished = false;
          let param = this.songList.slice(
            this.miniList.length,
            this.miniList.length + 20
          );
          await getSongDetail(param).then((res) => {
            this.miniList.push(...res.songs);
          });
          this.miniListLoading = false;
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
        this.miniListLoad();
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
  .view-leave-active,
  .sideUp-enter-active,
  .sideUp-leave-active {
    transition: all 0.5s;
  }
  .view-enter,
  .view-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
  .sideUp-enter,
  .sideUp-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }
  .miniList {
    z-index: 99999999;
    background: rgba(0, 0, 0, 0.5);
    > div {
      bottom: 1rem;
      width: calc(100% - 2rem);
    }
  }
  .van-list {
    max-height: 50vh !important;
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
