<template>
  <div
    ref="albumWrapper"
    class="albumWrapper w-100 h-100 bg-body"
    :style="`--bs-body-bg-rgb:${LightenDarkenColor(themeColor, -35)}`">
    <!-- 滚动核心 -->
    <div
      class="albumContent position-relative z-2 blur"
      :class="[{ 'h-miniPlayer': miniPlayerStatus }]">
      <!-- 头部信息栏，展示歌单信息、专辑信息 -->
      <play-list-header
        :album="album"
        :subscribed="subscribed"
        @changeSubscribe="changeSubscribe"></play-list-header>
      <!-- 列表头部。适用于歌单列表,专辑列表，推荐雷达列表，声音列表 -->
      <play-all-title
        @playAll="playAll"
        :listLength="detailList.length"
        class="text-light t-shadow-3"></play-all-title>
      <song-list
        :detailList="detailList"
        :loadFinish="loadFinish"
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
  import { getAlbum, setAlbumSub } from "../api/getData.js";
  import { mapMutations, mapState } from "vuex";
  import ColorThief from "colorthief"; //自动计算颜色组件
  import playAllTitle from "../components/son/playAllTitle.vue"; //头部组件
  import throttle from "lodash/throttle"; //lodash节流
  export default {
    // 属性
    data() {
      return {
        titleText: "专辑", //搜索框文本依据滚动距离自动替换
        opacity: 0, //搜索框透明度
        collectStatus: false, //顶部收藏按钮的状态
        coverImgUrl: "", //背景图地址
        album: {}, //专辑信息
        detailList: [], //当前渲染出的歌曲item
        themeColor: [], //主题色
        listOpacity: 1, // 歌曲列表主体透明度
        subscribed: null, //专辑是否已经收藏
        bs: null, //初始化Better scroll滚动盒子
        loadFinish: true, //加载完毕
        timeIdList: [], //定时器ID,销毁前一次性清除
      };
    },
    // 计算属性
    computed: {
      ...mapState(["miniPlayerStatus"]),
    },
    // 方法
    methods: {
      ...mapMutations(["setSongList"]),
      // 颜色混入
      LightenDarkenColor(RGB, v) {
        return RGB.map((i) => (i + v > 255 ? 255 : i + v < 0 ? 0 : i + v));
      },
      // 子元素的播放全部按钮,传出的方法
      playAll() {
        this.setSongList(this.detailList.map((i) => i.id));
        this.setPlayIndex(0);
      },
      // 监测滚动坐标,修改页面样式
      styleChange: throttle(function (e) {
        if (-e.y > 293.96) {
          this.titleText = this.album.name;
          this.collectStatus = true;
        } else {
          this.titleText = "专辑";
          this.collectStatus = false;
          this.opacity = -e.y / 293.96;
        }
        if (e.y > 0) {
          this.listOpacity = 1 - e.y / 280;
        }
      }, 200),
      // 点击修改专辑收藏状态,将在组件销毁前一次性发送请求
      changeSubscribe() {
        this.subscribed = !this.subscribed;
      },
      // 歌曲详情列表传出的方法,修改当前播放的列表为该歌单
      songList() {
        this.setSongList(
          this.album
            ? this.detailList.map((i) => i.id)
            : this.playList.trackIds.map((i) => i.id)
        );
      },
    },
    // 创建后生命周期
    async created() {
      //获取歌单详情页数据
      let res = await getAlbum(this.$route.query.id);
      // 因为专辑的歌曲不多.一般15首以内.所以一次性全部都被丢在了请求的专辑数据中,直接赋值即可,无需二次请求.
      this.album = res.album;
      this.detailList = res.songs;
      this.coverImgUrl = res.album.blurPicUrl;
      let colorThief = new ColorThief();
      let img = new Image();
      img.crossOrigin = "Anonymous"; //允许对未经过验证的图像进行跨源下载
      img.src = res.album.blurPicUrl;
      img.onload = () => {
        this.themeColor = colorThief.getColor(img);
      };
      this.subscribed = res.album.info.liked; //将专辑是否收藏的状态初始化赋值
      this.$nextTick(() => {
        // 因为接口数据请求较慢,必须使用延时器进行补偿
        this.timeIdList.push(
          setTimeout(() => {
            console.log("重新计算");
            this.bs.refresh();
          }, 500)
        );
      });
    },
    // 挂载后生命周期
    mounted() {
      // 初始化Better Scroll
      this.bs = new BScroll(this.$refs.albumWrapper, {
        click: true, //允许点击事件
      });
      this.bs.on("scroll", this.styleChange);
    },
    // 销毁前生命周期
    beforeDestroy() {
      if (this.subscribed != this.album.info.liked) {
        let t = this.subscribed ? 1 : 2;
        setAlbumSub(t, this.album.id);
      }
      this.bs.destroy();
      this.timeIdList.forEach((i) => clearTimeout(i));
    },
    // 组件
    components: {
      playAllTitle,
    },
  };
</script>
<style lang="scss">
  .albumContent {
    width: calc(100% - 0.5px);
    min-height: 101vh;
  }
</style>
