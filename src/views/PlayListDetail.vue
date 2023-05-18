<template>
  <re-fresh
    :OccupyBgImg="coverImgUrl"
    :height="OccupyHeight"
    :themeColor="themeColor"
    class="bg-body">
    <div class="w-100">
      <!-- 顶部搜索框，fixed定位。适用于官方雷达歌单、推荐歌单、专辑页 -->
      <list-search
        v-if="themeColor != []"
        :themeColor="LightenDarkenColor(themeColor, 30)"
        :title="'歌单'"></list-search>
      <!-- 头部信息栏，展示歌单信息、专辑信息 -->
      <play-list-header :data="playList"></play-list-header>
      <!-- 列表头部。适用于歌单列表，声音列表 -->
      <play-all-title
        @playAll="playAll"
        :listLength="playList.trackCount"
        class="text-light bg-body"></play-all-title>
      <!-- 列表主体-歌曲（可选择列表主体-声音），懒加载 -->
      <div class="ps-2 pe-3 bg-body t-shadow-4">
        <div
          v-for="(item, index) in songList"
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
              <div>
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
      </div>
      <!-- 懒加载判定模块 -->
      <div v-if="!loadOver" ref="lazyLoad" class="text-center opacity-50">
        加载中
      </div>
    </div>
  </re-fresh>
</template>
<script>
  import { getPlayListDetail, getPlayListTrackAll } from "../api/getData.js";
  import { mapState } from "vuex";
  import ColorThief from "colorthief"; //自动计算颜色组件
  import playAllTitle from "../components/son/playAllTitle.vue";
  export default {
    data() {
      return {
        coverImgUrl: "",
        playList: {},
        songList: [],
        OccupyHeight: 266,
        themeColor: [],
        loadOver: false,
        io: new IntersectionObserver(async () => {
          if (
            !this.playList.trackCount ||
            this.songList.length < this.playList.trackCount
          ) {
            await getPlayListTrackAll(
              this.$route.query.id,
              15,
              this.songList.length
            ).then((res) => {
              this.songList.push(...res.songs);
            });
          } else this.loadOver = true;
        }),
      };
    },
    computed: { ...mapState(["Theme"]) },
    methods: {
      // 颜色混入
      LightenDarkenColor(RGB, v) {
        return RGB.map((i) => (i + v > 255 ? 255 : i + v < 0 ? 0 : i + v));
      },
      // 播放全部歌单(第一首)
      playAll() {
        this.$emit(
          "songListChange",
          this.playList.trackIds.map((i) => i.id)
        );
        this.$emit("setIndex", 0);
        this.$emit("miniPlayerChange");
      },
      // 播放选定歌曲
      playThisSong(index) {
        this.$emit(
          "songListChange",
          this.playList.trackIds.map((i) => i.id)
        );
        this.$emit("setIndex", index);
        this.$emit("miniPlayerChange");
      },
    },
    // 生命周期
    async created() {
      //获取歌单详情页数据
      await getPlayListDetail(this.$route.query.id).then((res) => {
        this.coverImgUrl = res.playlist.coverImgUrl;
        this.playList = res.playlist;
        let colorThief = new ColorThief();
        let img = new Image();
        img.crossOrigin = "Anonymous"; //允许对未经过验证的图像进行跨源下载
        img.src = this.coverImgUrl;
        img.onload = () => {
          this.themeColor = colorThief.getColor(img);
        };
      });
    },
    mounted() {
      this.io.observe(this.$refs.lazyLoad);
    },
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
