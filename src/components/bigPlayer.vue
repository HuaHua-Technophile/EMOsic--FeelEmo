<template>
  <div
    class="w-100 vh-100 position-fixed top-0"
    style="z-index: 8"
    :style="[
      { background: `url(${bigBG}?param=x90y210) center/cover` },
      // 理论上,如果用黑胶唱片中图片同样的请求参数.因为唱片机一次请求3张,因此有缓存,切换背景图不需要二次请求
    ]">
    <!-- 背景模糊遮罩 -->
    <div class="d-flex flex-column h-100 blur">
      <!-- 头部顶栏:收起按钮,歌曲信息,分享按钮 -->
      <div
        class="d-flex justify-content-between align-items-center ps-3 pe-3 pt-4 t-shadow-3">
        <!-- 收起按钮 -->
        <div class="flex-shrink-0">
          <i
            class="bi bi-chevron-down fs-1"
            @click="
              $emit('bigPlayerHidden');
              navBarShow();
              miniPlayerShow();
            "></i>
        </div>
        <!-- 歌曲信息 -->
        <div class="flex-grow-1 overflow-hidden text-center">
          <!-- 歌名 -->
          <div class="fs-5">{{ songName }}</div>
          <!-- 歌手 -->
          <div class="fs-7 opacity-50 van-ellipsis">
            <span v-for="(j, indexs) in songAr" :key="indexs"
              ><span>{{ j.name }}</span
              ><span v-if="indexs != songAr.length - 1">/</span></span
            >
          </div>
        </div>
        <!-- 分享按钮 -->
        <div class="flex-shrink-0">
          <i class="bi bi-share-fill fs-3"></i>
        </div>
      </div>
      <!-- 专辑旋转封面/歌词 -->
      <div class="position-relative flex-grow-1 w-100 h-100">
        <transition name="fadeIn">
          <lyric-rendering
            v-if="lrcStatus"
            class="w-100 h-100 position-absolute top-0"></lyric-rendering>
        </transition>
        <transition name="fadeIn">
          <div v-show="!lrcStatus" class="position-absolute top-0 w-100 h-100">
            <!-- 唱片机底座 -->
            <div
              class="recordPlayer position-absolute w-75 start-50 top-50 translate-middle rounded-pill"></div>
            <!-- 唱片机磁头 -->
            <div
              class="magneticHead position-absolute z-3"
              :class="[{ active: isPlaying }]">
              <img src="../assets/黑胶唱片机磁头.png" class="w-100" />
            </div>
            <swiper-container ref="recordPlayer" :loop="Loop" class="h-100">
              <swiper-slide v-for="(items, index) in List" :key="index">
                <div
                  class="positon-relative h-100 d-flex align-items-center justify-content-center">
                  <!-- 黑胶唱盘 -->
                  <img
                    class="position-absolute z-2 start-50 top-50 translate-middle w-75"
                    src="../assets/黑胶唱片.png" />
                  <!-- 专辑封面 -->
                  <img
                    class="albumCover rounded-pill object-fit-cover rotate"
                    :class="[{ rotatePaused: !isPlaying }]"
                    :src="`${items.al.picUrl}?param=x600y600`" />
                </div>
              </swiper-slide>
            </swiper-container>
          </div>
        </transition>
      </div>
      <!-- 底栏1:收藏\下载\歌词显示\评论\更多 -->
      <div
        class="ps-3 pe-3 mb-3 w-100 d-flex justify-content-around align-items-center fs-2 t-shadow-5">
        <i class="bi bi-heart"></i>
        <i class="bi bi-download"></i>
        <span
          class="fs-7 border border-light rounded"
          style="padding: 2px 5px"
          @click="lrcStatus = !lrcStatus"
          >词</span
        >
        <i class="bi bi-chat-text"></i>
        <i class="bi bi-three-dots-vertical"></i>
      </div>
      <!-- 底栏2:进度条 -->
      <div class="ps-3 pe-3 d-flex align-items-center t-shadow-8">
        <span>{{ currentTime | TimeFormat }}</span>
        <van-slider
          v-model="currentTimeBig"
          :min="0"
          :max="duration"
          active-color="#ffffff"
          inactive-color="#888888"
          bar-height="6"
          button-size="6"
          class="w-100 ms-3 me-3">
        </van-slider>
        <span>{{ duration | TimeFormat }}</span>
      </div>
      <!-- 底栏3:循环控制\上一首\播放暂停\上一首\迷你播放列表 -->
      <div
        class="d-flex justify-content-around align-items-center ps-3 pe-3 mb-3 fs-1 t-shadow-10">
        <!-- 循环控制 -->
        <div @click="setSongLoop()" class="t-shadow-4">
          <i v-show="songLoop == 0" class="iconfont icon-24gl-repeat2 me-2"></i>
          <i
            v-show="songLoop == 1"
            class="iconfont icon-24gl-repeatOnce2 me-2"></i>
          <i v-show="songLoop == 2" class="iconfont icon-24gl-shuffle me-2"></i>
        </div>
        <!-- 上一首 -->
        <i class="bi bi-skip-start-fill" @click="prev()"></i>
        <!-- 播放/暂停 -->
        <div @click="$emit('Play_Pause')" style="font-size: 50px">
          <i v-show="!isPlaying" class="bi bi-play-circle-fill"></i>
          <i v-show="isPlaying" class="bi bi-pause-circle-fill"></i>
        </div>
        <!-- 下一首 -->
        <i class="bi bi-skip-end-fill" @click="next()"></i>
        <!-- 迷你歌曲列表 -->
        <i
          class="bi bi-music-note-list"
          @click="
            $emit('miniListShow');
            $emit('miniListLoad');
          "></i>
      </div>
    </div>
  </div>
</template>
<script>
  import lyricRendering from "../components/son/lyricRendering.vue";
  import { mapGetters, mapMutations, mapState } from "vuex";
  export default {
    props: [
      "currentTime",
      "duration",
      "bigBG",
      "songName",
      "songAr",
      "isPlaying",
      "List",
      "Loop",
    ],
    data() {
      return {
        lrcStatus: true,
        timeIdList: [],
      };
    },
    // 计算属性
    computed: {
      ...mapState(["songLoop", "playIndex"]),
      ...mapGetters(["playSongId"]),
      currentTimeBig: {
        get: function () {
          return this.currentTime;
        },
        set: function (v) {
          this.$emit("setcurrentTime", v);
        },
      },
    },
    // 方法
    methods: {
      ...mapMutations([
        "navBarShow",
        "miniPlayerShow",
        "setSongLoop",
        "nextSong",
        "preSong",
      ]),
      prev() {
        this.$refs.recordPlayer.swiper.slidePrev(300, false);
        this.timeIdList.push(
          setTimeout(() => {
            this.preSong();
          }, 300)
        );
      },
      next() {
        this.$refs.recordPlayer.swiper.slideNext(300, false);
        this.timeIdList.push(
          setTimeout(() => {
            this.nextSong();
          }, 300)
        );
      },
    }, // 过滤器
    filters: {
      TimeFormat(data) {
        let m = parseInt(data / 60); //分钟
        let s = parseInt(data % 60); //秒
        return `${`${m}`.padStart(2, "0")}:${`${s}`.padStart(2, "0")}`;
      },
    },
    // 监听器
    watch: {
      List() {
        if (this.Loop) {
          this.$nextTick(() => {
            this.$refs.recordPlayer.swiper.slideToLoop(
              this.playIndex,
              0,
              false
            );
          });
        } else {
          this.$nextTick(() => {
            this.$refs.recordPlayer.swiper.slideTo(1, 0, false);
          });
        }
      },
    },
    components: { lyricRendering },
    // 挂载后生命周期
    mounted() {
      // 迷你播放器前滑，加载列表上一首
      this.$refs.recordPlayer.addEventListener("slideprevtransitionend", () => {
        this.preSong();
      });
      // 迷你播放器后滑，播放下一首
      this.$refs.recordPlayer.addEventListener("slidenexttransitionend", () => {
        this.nextSong();
      });
    },
    // 销毁前清空定时器
    beforeDestroy() {
      this.timeIdList.forEach((item) => {
        clearTimeout(item);
      });
    },
  };
</script>
<style lang="scss" scoped>
  .blur {
    width: calc(100% - 0.5px);
  }
</style>
<style lang="scss">
  .rotate {
    animation: rotate 15s linear infinite forwards;
  }
  .rotatePaused {
    animation-play-state: paused;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .recordPlayer {
    padding-bottom: 75%;
    background: rgba(0, 0, 0, 0.15);
    outline: 10px rgba(255, 255, 255, 0.2) solid;
  }
  .magneticHead {
    top: 5%;
    left: calc(50% - 15px);
    transition: all 1s;
    transform-origin: 0% 0%;
  }
  .magneticHead.active {
    transform: rotate(22deg);
  }
  .albumCover {
    width: 70%;
  }
</style>
