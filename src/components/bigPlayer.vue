<template>
  <div
    class="w-100 vh-100 position-fixed top-0 text-light"
    style="z-index: 6"
    :style="[
      { background: `url(${bigBG}?param=90y210) center/cover` },
      // 理论上,如果用黑胶唱片中图片同样的请求参数.因为唱片机一次请求3张,因此有缓存,切换背景图不需要二次请求
    ]">
    <!-- 背景暗色遮罩 -->
    <div class="w-100 h-100 bg-dark" style="--bs-bg-opacity: 0.3">
      <!-- 背景模糊遮罩 -->
      <div class="d-flex flex-column w-100 h-100 blur">
        <!-- 头部顶栏:收起按钮,歌曲信息,分享按钮 -->
        <div
          class="d-flex justify-content-between align-items-center ps-3 pe-3 pt-4 t-shadow-3">
          <!-- 收起按钮 -->
          <div class="flex-shrink-0">
            <i
              class="bi bi-chevron-down fs-1"
              @click="
                $emit('bigPlayerHidden');
                miniPlayerShow();
              "></i>
          </div>
          <!-- 歌曲信息 -->
          <div class="flex-grow-1 overflow-hidden text-center">
            <!-- 歌名 -->
            <div class="ms-3 me-3 fs-5 van-ellipsis">{{ songName }}</div>
            <!-- 歌手 -->
            <div class="fs-7 opacity-50 van-ellipsis">
              <span v-for="(j, indexs) in songAr" :key="indexs"
                ><span>{{ j.name }}</span
                ><span v-if="indexs != songAr.length - 1">/</span></span
              >
            </div>
          </div>
          <!-- 分享按钮 -->
          <div class="flex-shrink-0" @click="shareThisSong()">
            <i class="bi bi-share-fill fs-3"></i>
          </div>
        </div>
        <!-- 专辑旋转封面/歌词 -->
        <div class="position-relative flex-grow-1 mt-4 mb-4">
          <!-- 歌词组件,需要保活 -->
          <transition name="fadeIn">
            <keep-alive>
              <lyric-rendering
                :currentTime="currentTime"
                :isPlaying="isPlaying"
                @lrcSetTime="lrcSetTime"
                v-if="lrcStatus"
                class="position-absolute top-0 bottom-0 start-0 end-0"></lyric-rendering>
            </keep-alive>
          </transition>
          <!-- 黑胶唱片机 -->
          <transition name="fadeIn">
            <div
              v-show="!lrcStatus"
              class="position-absolute top-0 bottom-0 start-0 end-0">
              <!-- 唱片机底座 -->
              <div
                class="recordPlayer position-absolute w-75 start-50 top-50 translate-middle rounded-pill"></div>
              <!-- 唱片机磁头 -->
              <div
                class="magneticHead position-absolute z-3 transition-10"
                :class="[{ active: isPlaying }]">
                <img src="../assets/黑胶唱片机磁头.png" class="w-75" />
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
                      :src="`${items.al.picUrl}?param=600y600`" />
                  </div>
                </swiper-slide>
              </swiper-container>
            </div>
          </transition>
        </div>
        <!-- 底栏1:收藏\下载\歌词显示\评论 -->
        <div
          class="ps-3 pe-3 mb-3 w-100 d-flex justify-content-around align-items-center fs-2 t-shadow-5">
          <i
            class="bi"
            :class="songlike ? 'bi-heart-fill text-danger' : 'bi-heart'"
            @click="changeSongLike()"></i>
          <i class="bi bi-download" @click="downloadThisSong(songUrl)"></i>
          <span
            class="fs-7 border border-light rounded"
            style="padding: 2px 5px"
            @click="lrcStatus = !lrcStatus"
            >词</span
          >
          <i class="bi bi-chat-text"></i>
        </div>
        <!-- 底栏2:进度条 -->
        <div class="ps-3 pe-3 d-flex align-items-center t-shadow-8">
          <span>{{ currentTime | TimeFormat }}</span>
          <div
            class="w-100 h-100 ms-2 me-2 rounded-5 overflow-hidden position-relative">
            <input
              type="range"
              class="currentRate w-100 position-absolute top-50 translate-middle-y"
              min="0"
              max="1000"
              step="1"
              v-model="currentRate" />
          </div>
          <span>{{ duration | TimeFormat }}</span>
        </div>
        <!-- 底栏3:循环控制\上一首\播放暂停\上一首\迷你播放列表 -->
        <div
          class="d-flex justify-content-around align-items-center ps-3 pe-3 mb-3 fs-1 t-shadow-10">
          <!-- 循环控制 -->
          <div @click="setSongLoop()" class="t-shadow-4">
            <i
              v-show="songLoop == 0"
              class="iconfont icon-24gl-repeat2 me-2"></i>
            <i
              v-show="songLoop == 1"
              class="iconfont icon-24gl-repeatOnce2 me-2"></i>
            <i
              v-show="songLoop == 2"
              class="iconfont icon-24gl-shuffle me-2"></i>
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
  </div>
</template>
<script>
  import lyricRendering from "../components/son/lyricRendering.vue";
  import { mapGetters, mapMutations, mapState } from "vuex";
  import { like } from "@/api/getData.js";
  import { Toast } from "vant";
  export default {
    props: [
      "songUrl",
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
        lrcStatus: false, //歌词页面的显示/隐藏
        timeIdList: [], //定时器列表
        songlike: false, //歌曲收藏状态，但因为登陆后请求数据中不包含是否已喜欢该歌曲，因此只能做本地伪数据。
      };
    },
    // 计算属性
    computed: {
      ...mapState(["songLoop", "playIndex"]),
      ...mapGetters(["playSongId"]),
      currentRate: {
        get: function () {
          return (this.currentTime / this.duration) * 1000;
        },
        set: function (rate) {
          this.$emit("setCurrentRate", rate);
        },
      },
    },
    // 方法
    methods: {
      ...mapMutations([
        "miniPlayerShow",
        "setSongLoop",
        "nextSong",
        "preSong",
        "setShareInfo",
        "shareShow",
      ]),
      //歌词点击跳转进度
      lrcSetTime(time) {
        this.$emit("setCurrentTime", time / 1000);
      },
      // 上一首歌
      prev() {
        this.$refs.recordPlayer.swiper.slidePrev(300, false);
        this.timeIdList.push(
          setTimeout(() => {
            this.preSong();
          }, 300)
        );
      },
      // 下一首歌
      next() {
        this.$refs.recordPlayer.swiper.slideNext(300, false);
        this.timeIdList.push(
          setTimeout(() => {
            this.nextSong();
          }, 300)
        );
      },
      // 点击分享当前歌曲
      shareThisSong() {
        this.setShareInfo(`https://music.163.com/#/song?id=${this.playSongId}`);
        this.shareShow();
      },
      // 点击下载当前歌曲
      downloadThisSong(url, fileName = "未知文件") {
        const el = document.createElement("a");
        el.style.display = "none";
        el.setAttribute("target", "_blank");
        /*优点：
  可以下载txt、png、pdf等类型文件
  download的属性是HTML5新增的属性
  href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式；所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)

  缺点：
  a标签只能做get请求，所有url有长度限制
  无法获取下载进度
  无法在header中携带token做鉴权操作
  跨域限制
  无法判断接口是否返回成功
  IE兼容问题*/
        fileName && el.setAttribute("download", fileName);
        el.href = url;
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
      },
      // 点击喜欢该歌曲后，修改本地的伪数据，并尝试发起真正的请求
      async changeSongLike() {
        this.songlike = !this.songlike;
        let res = await like(this.playSongId, this.songlike);
        res.code === 200 && this.songlike
          ? Toast("喜欢成功")
          : Toast("取消喜欢成功");
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
      // 换新歌之后,迫于无奈,请求的歌曲数据中不包含是否已经喜欢过该歌曲,只能将本地伪数据修改为未喜欢
      playSongId() {
        this.songlike = false;
      },
    },
    // 组件
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
    transform-origin: 0% 0%;
  }
  .magneticHead.active {
    transform: rotate(22deg);
  }
  .albumCover {
    width: 70%;
  }
  // 原生input美化思路:https://segmentfault.com/a/1190000041543171###
  .currentRate {
    appearance: none;
    &::-webkit-slider-runnable-track {
      height: 4px;
      background: #ffffff6c;
      border-radius: 99px;
    }
    &::-webkit-slider-thumb {
      appearance: none;
      height: 14px;
      width: 14px;
      border-radius: 50%;
      background-color: white;
      margin-top: -5px;
      border: 1px solid transparent;
      border-image: linear-gradient(
          90deg,
          #ec5f67,
          #f99157,
          #fac863,
          #99c794,
          #5fb3b3,
          #6699cc,
          #c594c5
        )
        0 fill / 5 15.5 5 0 / 0 0 0 70vw; /*绘制元素外矩形*/
      transition: all 0.5s;
    }
  }
</style>
