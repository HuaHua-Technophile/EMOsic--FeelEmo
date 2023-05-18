<template>
  <div
    class="w-100 vh-100 position-fixed top-0"
    :style="[
      { background: `url(${bigBG}?param=x90y210) center/cover` },
      { 'z-index': 99 },
    ]">
    <!-- 背景模糊遮罩 -->
    <div class="d-flex flex-column h-100 ps-3 pe-3 blur">
      <!-- 头部顶栏:收起按钮,歌曲信息,分享按钮 -->
      <div
        class="d-flex justify-content-between align-items-center pt-4 t-shadow-3">
        <!-- 收起按钮 --><i
          class="bi bi-chevron-down fs-1"
          @click="
            $emit('bigPlayerHidden');
            navBarShow();
            miniPlayerShow();
          "></i>
        <!-- 歌曲信息 -->
        <div class="text-center">
          <!-- 歌名 -->
          <div class="fs-5">{{ songName }}</div>
          <!-- 歌手 -->
          <div class="fs-7 opacity-50">
            <span v-for="(j, indexs) in songAr" :key="indexs"
              ><span>{{ j.name }}</span
              ><span v-if="indexs != songAr.length - 1">/</span></span
            >
          </div>
        </div>
        <!-- 分享按钮 --><i class="bi bi-share-fill fs-3"></i>
      </div>
      <!-- 专辑旋转封面 -->
      <div class="flex-grow-1"></div>
      <!-- 底栏1:收藏\下载\歌词显示\评论\更多 -->
      <div></div>
      <!-- 底栏2:进度条 -->

      <div class="d-flex align-items-center t-shadow-8">
        <span>{{ currentTime | TimeFormat }}</span>
        <van-slider
          v-model="currentRate"
          :min="0"
          :max="100"
          active-color="white"
          inactive-color="black"
          bar-height="6"
          button-size="6"
          class="w-100 ms-3 me-3">
        </van-slider>
        <span>{{ duration | TimeFormat }}</span>
      </div>
      <!-- 底栏3:循环控制\上一首\播放暂停\上一首\迷你播放列表 -->
      <div
        class="d-flex justify-content-around align-items-center mb-3 fs-1 t-shadow-10">
        <!-- 循环控制 -->
        <div @click="setSongLoop()" class="t-shadow-4">
          <i v-show="songLoop == 0" class="iconfont icon-24gl-repeat2 me-2"></i>
          <i
            v-show="songLoop == 1"
            class="iconfont icon-24gl-repeatOnce2 me-2"></i>
          <i v-show="songLoop == 2" class="iconfont icon-24gl-shuffle me-2"></i>
        </div>
        <i class="bi bi-skip-start-fill" @click="preSong()"></i>
        <!-- 播放/暂停 -->
        <div @click="$emit('Play_Pause')" style="font-size: 50px">
          <i v-show="!isPlaying" class="bi bi-play-circle-fill"></i>
          <i v-show="isPlaying" class="bi bi-pause-circle-fill"></i>
        </div>
        <i class="bi bi-skip-end-fill" @click="nextSong()"></i>
        <i class="bi bi-music-note-list" @click="$emit('miniListShow')"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapState } from "vuex";
  import {} from "../api/getData.js";
  export default {
    props: [
      "currentTime",
      "duration",
      "bigBG",
      "songName",
      "songAr",
      "isPlaying",
    ],
    data() {
      return {};
    },
    // 计算属性
    computed: {
      ...mapState(["songLoop"]),
      ...mapGetters(["playSongId"]),
      currentRate: {
        get: function () {
          return (this.currentTime / this.duration) * 100;
        },
        set: function (v) {
          this.$emit("setcurrentRate", v);
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
    }, // 过滤器
    filters: {
      TimeFormat(data) {
        let m = parseInt(data / 60); //分钟
        let s = parseInt(data % 60); //秒
        return `${`${m}`.padStart(2, "0")}:${`${s}`.padStart(2, "0")}`;
      },
    },
    // 创建后生命周期
    created() {},
  };
</script>
<style lang="scss" scoped>
  .blur {
    width: calc(100% - 0.5px);
  }
  .van-slider__button {
    width: 8px !important;
    height: 8px !important;
    background: red;
  }

  $slider-button-border-radius: 50%;
</style>
