<template>
  <div
    ref="playListDetailWrapper"
    class="playListDetailWrapper w-100 h-100 bg-body"
    :style="`--bs-body-bg-rgb:${LightenDarkenColor(themeColor, -35)}`">
    <!-- 滚动核心 -->
    <div
      class="playListDetailContent position-relative z-2 blur"
      :class="[{ 'h-miniPlayer': miniPlayerStatus }]">
      <!-- 头部信息栏，展示歌单信息、专辑信息 -->
      <play-list-header
        :playlist="playList"
        :subscribed="subscribed"
        @changeSubscribe="changeSubscribe"></play-list-header>
      <!-- 列表头部。适用于歌单列表,专辑列表，推荐雷达列表，声音列表 -->
      <play-all-title
        @playAll="playAll"
        :listLength="playList.trackCount"
        class="text-light t-shadow-3"></play-all-title>
      <song-list
        :detailList="detailList"
        :loadFinish="loadFinish"
        :isPullUpLoad="isPullUpLoad"
        :listOpacity="listOpacity"
        @songList="songList"
        class="bg-body"></song-list>
    </div>
    <!-- 顶部搜索框，fixed定位。适用于官方雷达歌单、推荐歌单、专辑页 -->
    <list-search
      v-if="themeColor != []"
      :themeColor="LightenDarkenColor(themeColor, 30)"
      :title="titleText"
      :opacity="opacity"
      :collectStatus="collectStatus"
      :subscribed="subscribed"
      @changeSubscribe="changeSubscribe"
      class="t-shadow-3"></list-search>
    <!-- 背景图 -->
    <div class="w-100 h-100 position-absolute top-0 z-1">
      <img :src="`${coverImgUrl}?param=450y1050`" class="w-100" />
    </div>
  </div>
</template>
<script>
  import BScroll from "@better-scroll/core"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up"; //导入Better scroll上拉加载插件
  BScroll.use(Pullup); //注册插件
  import {
    getPlayListDetail,
    getPlayListTrackAll,
    setPlaylistSubscribe,
  } from "../api/getData.js";
  import { mapMutations, mapState } from "vuex";
  import ColorThief from "colorthief"; //自动计算颜色组件
  import playAllTitle from "../components/son/playAllTitle.vue"; //头部组件
  import throttle from "lodash/throttle"; //lodash节流
  export default {
    // 属性
    data() {
      return {
        titleText: "歌单", //搜索框文本依据滚动距离自动替换
        opacity: 0, //搜索框透明度
        collectStatus: false, //顶部收藏按钮的状态
        coverImgUrl: "", //背景图地址
        playList: {}, //歌单信息
        detailList: [], //当前渲染出的歌曲item
        themeColor: [], //主题色
        listOpacity: 1, // 歌曲列表主体透明度
        bs: null, //初始化Better scroll滚动盒子
        isPullUpLoad: false, //懒加载中
        loadFinish: false, //懒加载完毕
        subscribed: null, //歌单是否已经收藏
      };
    },
    // 计算属性
    computed: {
      ...mapState(["miniPlayerStatus"]),
    },
    // 方法
    methods: {
      ...mapMutations(["setSongList", "setPlayIndex"]),
      // 颜色混入
      LightenDarkenColor(RGB, v) {
        return RGB.map((i) => (i + v > 255 ? 255 : i + v < 0 ? 0 : i + v));
      },
      // 子元素的播放全部按钮,传出的方法
      playAll() {
        this.setSongList(this.playList.trackIds.map((i) => i.id));
        this.setPlayIndex(0);
      },
      // 列表加载
      async detailListLoad() {
        // 如果加载完毕
        if (this.detailList.length == this.playList.trackCount) {
          this.loadFinish = true;
          this.bs.closePullUp();
        }
        // 如果没加载完
        else {
          this.isPullUpLoad = true;
          let res = await getPlayListTrackAll(
            this.$route.query.id,
            15,
            this.detailList.length
          );
          if (res.songs) this.detailList.push(...res.songs);
          this.bs.finishPullUp();
          this.isPullUpLoad = false;
        }
        this.$nextTick(() => {
          this.bs.refresh();
        });
      },
      // 监测滚动坐标,修改页面样式
      styleChange: throttle(function (e) {
        if (-e.y > 293.96) {
          this.titleText = this.playList.name;
          this.collectStatus = true;
        } else {
          this.titleText = "歌单";
          this.collectStatus = false;
          this.opacity = -e.y / 293.96;
        }
        if (e.y > 0) {
          this.listOpacity = 1 - e.y / 280;
        }
      }, 200),
      // 点击修改歌单收藏状态,将在组件销毁前一次性发送请求
      changeSubscribe() {
        this.subscribed = !this.subscribed;
      },
      // 歌曲详情列表传出的方法,修改当前播放的列表为该歌单
      songList() {
        this.setSongList(this.playList.trackIds.map((i) => i.id));
      },
    },
    // 创建后生命周期
    async created() {
      //获取歌单详情页数据
      let res = await getPlayListDetail(this.$route.query.id);
      this.detailListLoad();
      this.playList = res.playlist;
      this.coverImgUrl = res.playlist.coverImgUrl;
      let colorThief = new ColorThief();
      let img = new Image();
      img.crossOrigin = "Anonymous"; //允许对未经过验证的图像进行跨源下载
      img.src = res.playlist.coverImgUrl;
      img.onload = () => {
        this.themeColor = colorThief.getColor(img);
      };
      this.subscribed = res.playlist.subscribed; //将歌单是否收藏的状态初始化赋值
    },
    // 挂载后生命周期
    mounted() {
      // 初始化Better Scroll
      this.bs = new BScroll(this.$refs.playListDetailWrapper, {
        click: true, //允许点击事件
        pullUpLoad: true,
      });
      // 上滑触底后执行懒加载
      this.bs.on("pullingUp", this.detailListLoad);
      this.bs.on("scroll", this.styleChange);
    },
    // 销毁前生命周期
    beforeDestroy() {
      if (this.subscribed != this.playList.subscribed) {
        let t = this.subscribed ? 1 : 2;
        setPlaylistSubscribe(t, this.playList.id);
      }
      this.bs.destroy();
    },
    // 组件
    components: {
      playAllTitle,
    },
  };
</script>
<style lang="scss">
  .playListDetailContent {
    width: calc(100% - 0.5px);
  }
</style>
