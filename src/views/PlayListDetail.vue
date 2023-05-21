<template>
  <!-- <re-fresh
    :OccupyBgImg="coverImgUrl"
    :height="OccupyHeight"
    :themeColor="themeColor"
    class="bg-body">
    <div class="w-100">
      !-- 顶部搜索框，fixed定位。适用于官方雷达歌单、推荐歌单、专辑页 --
      <list-search
        v-if="themeColor != []"
        :themeColor="LightenDarkenColor(themeColor, 30)"
        :title="'歌单'"></list-search>
      !-- 头部信息栏，展示歌单信息、专辑信息 --
      <play-list-header :data="playList"></play-list-header>
      !-- 列表头部。适用于歌单列表,专辑列表，推荐雷达列表，声音列表 --
      <play-all-title
        @playAll="playAll"
        :listLength="playList.trackCount"
        class="text-light bg-body"></play-all-title>
      !-- 列表主体-歌曲（可选择列表主体-声音），懒加载 --
      <div class="ps-2 pe-3 bg-body t-shadow-4">
        <div
          v-for="(item, index) in songList"
          :key="index"
          class="d-flex align-items-center text-light pb-3">
          !-- 歌曲Item左侧信息：序列、歌名、标签、歌手、专辑 --
          <div
            @click="playThisSong(index)"
            class="flex-grow-1 d-flex align-items-center overflow-hidden">
            !-- 序号 --
            <span class="songItemIndex opacity-50 text-center flex-shrink-0">{{
              index + 1
            }}</span>
            !-- 具体信息 --
            <div class="flex-grow-1">
              !-- 歌曲名 --
              <div
                class="transition-8"
                :class="[{ 'text-danger': item.id == playSongId }]">
                {{ item.name }}
                <span v-if="item.tns" class="opacity-50">{{ item.tns }}</span>
              </div>
              !-- 作者及音频码率标签 --
              <div class="d-flex align-items-center">
                <span
                  v-if="item.fee == 1 || item.fee == 4"
                  class="InfoTag text-warning border border-warning d-flex align-items-center"
                  >VIP</span
                >
                <span
                  v-if="item.hr"
                  class="InfoTag text-danger border border-danger d-flex align-items-center"
                  >Hi·Res</span
                >
                <span
                  v-else-if="item.sq"
                  class="InfoTag text-danger border border-danger d-flex align-items-center"
                  >SQ</span
                >
                !-- 歌手信息 --
                <div class="fs-8 opacity-50 text-nowrap">
                  <span v-for="(j, indexs) in item.ar" :key="indexs"
                    ><span>{{ j.name }}</span
                    ><span v-if="indexs != item.ar.length - 1">/</span></span
                  >
                </div>
                !-- 专辑信息 --
                <div v-if="item.al" class="fs-8 opacity-50 text-nowrap">
                  <span class="ms-1 me-1">-</span>{{ item.al.name }}
                </div>
              </div>
            </div>
          </div>
          !-- 歌曲Item右侧信息：是否有mv，更多标签 --
          <div class="flex-shrink-0 opacity-50">
            <div class="d-flex align-items-center">
              <i v-if="item.mv != 0" class="bi bi-play-btn fs-5 me-4"></i>
              <i class="bi bi-three-dots-vertical fs-4"></i>
            </div>
          </div>
        </div>
      </div>
      !-- 懒加载判定模块 --
      <div v-if="!loadOver" ref="lazyLoad" class="text-center opacity-50">
        加载中
      </div>
    </div>
  </re-fresh> -->
  <div
    ref="playListDetailWrapper"
    class="playListDetailWrapper w-100"
    :class="miniPlayerStatus ? 'h-miniPlayer' : 'h-navBar'">
    <!-- 滚动核心 -->
    <div class="playListDetailContent">
      <!-- 头部信息栏，展示歌单信息、专辑信息 -->
      <play-list-header :data="playList"></play-list-header>
      <!-- 列表头部。适用于歌单列表,专辑列表，推荐雷达列表，声音列表 -->
      <play-all-title
        @playAll="playAll"
        :listLength="playList.trackCount"
        class="text-light bg-body"></play-all-title>
      <!-- 列表主体 -->
      <div
        v-for="(item, index) in detailList"
        :key="index"
        class="d-flex align-items-center text-light pb-3">
        <!-- 歌曲Item左侧信息：序列、歌名、标签、歌手、专辑 -->
        <div
          @click="playThisSong(index)"
          class="flex-grow-1 d-flex align-items-center overflow-hidden">
          <!-- 序号 -->
          <span class="songItemIndex opacity-50 text-center flex-shrink-0">{{
            index + 1
          }}</span>
          <!-- 具体信息 -->
          <div class="flex-grow-1">
            <!-- 歌曲名 -->
            <div
              class="transition-8"
              :class="[{ 'text-danger': item.id == playSongId }]">
              {{ item.name }}
              <span v-if="item.tns" class="opacity-50">{{ item.tns }}</span>
            </div>
            <!-- 作者及音频码率标签 -->
            <div class="d-flex align-items-center">
              <span
                v-if="item.fee == 1 || item.fee == 4"
                class="InfoTag text-warning border border-warning d-flex align-items-center"
                >VIP</span
              >
              <span
                v-if="item.hr"
                class="InfoTag text-danger border border-danger d-flex align-items-center"
                >Hi·Res</span
              >
              <span
                v-else-if="item.sq"
                class="InfoTag text-danger border border-danger d-flex align-items-center"
                >SQ</span
              >
              <!-- 歌手信息 -->
              <div class="fs-8 opacity-50 text-nowrap">
                <span v-for="(j, indexs) in item.ar" :key="indexs"
                  ><span>{{ j.name }}</span
                  ><span v-if="indexs != item.ar.length - 1">/</span></span
                >
              </div>
              <!-- 专辑信息 -->
              <div v-if="item.al" class="fs-8 opacity-50 text-nowrap">
                <span class="ms-1 me-1">-</span>{{ item.al.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- 歌曲Item右侧信息：是否有mv，更多标签 -->
        <div class="flex-shrink-0 opacity-50">
          <div class="d-flex align-items-center">
            <i v-if="item.mv != 0" class="bi bi-play-btn fs-5 me-4"></i>
            <i class="bi bi-three-dots-vertical fs-4"></i>
          </div>
        </div>
      </div>
      <div v-if="loadFinish" class="text-center fs-8">没有更多啦...</div>
      <div v-else class="text-center">
        <div v-show="isPullUpLoad">加载中...</div>
        <div v-show="!isPullUpLoad">松手加载</div>
      </div>
    </div>
    <!-- 顶部搜索框，fixed定位。适用于官方雷达歌单、推荐歌单、专辑页 -->
    <list-search
      v-if="themeColor != []"
      :themeColor="LightenDarkenColor(themeColor, 30)"
      :title="'歌单'"></list-search>
  </div>
</template>
<script>
  import BScroll from "@better-scroll/core"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up"; //导入Better scroll上拉加载插件
  BScroll.use(Pullup); //注册插件
  import { getPlayListDetail, getPlayListTrackAll } from "../api/getData.js";
  import { mapGetters, mapMutations, mapState } from "vuex";
  import ColorThief from "colorthief"; //自动计算颜色组件
  import playAllTitle from "../components/son/playAllTitle.vue"; //
  export default {
    data() {
      return {
        coverImgUrl: "",
        playList: {},
        detailList: [],
        themeColor: [],
        bs: null,
        isPullUpLoad: false,
        loadFinish: false,
      };
    },
    // 计算属性
    computed: {
      ...mapGetters(["playSongId"]),
      ...mapState(["miniPlayerStatus"]),
    },
    // 方法
    methods: {
      ...mapMutations(["setSongList", "setPlayIndex"]),
      // 颜色混入
      LightenDarkenColor(RGB, v) {
        return RGB.map((i) => (i + v > 255 ? 255 : i + v < 0 ? 0 : i + v));
      },
      // 歌单列表点击播放选定歌曲
      playThisSong(index) {
        this.setSongList(this.playList.trackIds.map((i) => i.id));
        this.setPlayIndex(index);
      },
      // 播放全部按钮
      playAll() {
        this.setSongList(this.playList.trackIds.map((i) => i.id));
        this.setPlayIndex(0);
      },
      // 列表加载
      async detailListLoad() {
        this.isPullUpLoad = true;
        let res = await getPlayListTrackAll(
          this.$route.query.id,
          15,
          this.detailList.length
        );
        this.detailList.push(...res.songs);
        this.bs.finishPullUp();
        this.bs.refresh();
        this.isPullUpLoad = false;
        // 如果加载完毕
        if (this.detailList.length == this.playList.trackCount) {
          this.loadFinish = true;
          this.bs.closePullUp();
        }
      },
    },
    // 创建后生命周期
    async created() {
      //获取歌单详情页数据
      let res = await getPlayListDetail(this.$route.query.id);
      this.detailListLoad();
      this.playList = res.playlist;
      let colorThief = new ColorThief();
      let img = new Image();
      img.crossOrigin = "Anonymous"; //允许对未经过验证的图像进行跨源下载
      img.src = res.playlist.coverImgUrl;
      img.onload = () => {
        this.themeColor = colorThief.getColor(img);
      };
    },
    // 挂载后生命周期
    mounted() {
      // 初始化Better Scroll
      this.bs = new BScroll(this.$refs.playListDetailWrapper, {
        click: true, //允许点击事件
        pullUpLoad: true,
      });
      this.bs.on("pullingUp", this.detailListLoad);
    },
    // 组件
    components: {
      playAllTitle,
    },
  };
</script>
<style lang="scss">
  .songItemIndex {
    width: 36px;
  }
</style>
