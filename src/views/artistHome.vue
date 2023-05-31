<template>
  <div ref="artistHome" class="artistHomeView w-100 h-100 position-relative">
    <!-- 滚动内容 -->
    <div
      style="min-height: 101vh"
      class="overflow-hidden z-1"
      :class="[{ 'h-miniPlayer': miniPlayerStatus }, { blur: scrollEnd }]">
      <!-- 歌手信息栏,歌手头像 -->
      <div
        class="artist-info ms-3 me-3 pb-3 rounded-3"
        :class="{ 'pt-5': true }">
        <!-- 歌手头像 -->
        <!-- <div></div> -->
        <!-- 歌手名称/音乐达人标签 -->
        <div class="d-flex justify-content-center align-items-center mb-2">
          <span v-if="artist" class="fs-5 me-2">
            {{ artist.artist.name }}
          </span>
          <img
            v-if="artist && artist.identify.imageUrl"
            :src="`${artist.identify.imageUrl}?param=20y20`"
            class="identityIconUrl" />
        </div>
        <!-- 歌手别称 -->
        <div
          v-if="artist && artist.artist.alias"
          class="text-center fs-9 opacity-50">
          <span v-for="i in artist.artist.alias" :key="i" class="me-2">{{
            i
          }}</span>
        </div>
        <!-- 歌手定位(作词作曲) -->
        <div v-if="artist" class="text-center fs-7 mt-2 mb-2 opacity-50">
          {{ artist.identify.imageDesc }}
        </div>
        <!-- 关注按钮,因为没有数据,仅作装饰作用 -->
        <div class="text-center">
          <span
            @click="followed = !followed"
            class="d-inline-flex align-items-center fs-7 ps-3 pe-3 pt-1 pb-1 rounded-pill"
            :class="followed ? 'border' : 'bg-danger text-light'">
            <span v-if="followed">已</span>
            <i class="bi bi-plus" v-else></i>关注
          </span>
        </div>
      </div>
      <!-- 歌手信息 -->
      <div
        class="bg-body-secondary ms-3 me-3 p-3 rounded-3"
        style="margin-bottom: 61.5px">
        <div class="fs-5 mb-3">歌手信息<i class="bi bi-chevron-right"></i></div>
        <!-- 歌手性别/生日/星座/身高(如果有) -->
        <div v-if="artist" class="fs-7 mb-3">
          <span class="me-3">{{ artist.artist.name }}</span>
          <span class="opacity-50">
            <span v-if="artist.user" class="me-1">
              <span v-if="artist.user.gender == 1">男</span>
              <span v-if="artist.user.gender == 2">女</span>
            </span>
            <span v-if="birthday" class="me-1">{{ birthday }}</span>
            <span v-if="Constellation">{{ Constellation }}</span>
          </span>
        </div>
        <!-- 歌手简介 -->
        <div v-if="artist" class="opacity-50">
          {{ artist.artist.briefDesc }}
        </div>
      </div>
      <!-- 歌手单曲/专辑 -->
      <van-tabs
        v-model="active"
        animated
        color="#fb3c3c"
        background="transparent"
        :swipeable="true"
        :scrollspy="false"
        title-active-color="var(--bs-body-color)"
        title-inactive-color="var(--bs-secondary-color)"
        class="bg-dark"
        style="--bs-bg-opacity: 0.4">
        <van-tab title="单曲" ref="song">
          <div>
            <play-all-title
              :listLength="songList.length"
              @playAll="playAll"
              class="top-0"></play-all-title>
            <song-list
              :detailList="songList"
              :loadFinish="songLoadFinish"
              :isPullUpLoad="songIsPullUpLoad"
              @songList="songListChange()"></song-list>
          </div>
        </van-tab>
        <van-tab title="专辑" ref="album" class="ps-3 pe-3">
          <album-list
            :detailList="albumList"
            :loadFinish="albumLoadFinish"
            :isPullUpLoad="albumIsPullUpLoad"></album-list>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 顶栏,绝对定位在顶部 -->
    <div
      class="w-100 position-absolute top-0 start-0 d-flex justify-content-between pt-4 ps-3 pe-3 z-3"
      :class="[{ blur: scrollEnd }]">
      <!-- 左侧返回 -->
      <i class="bi bi-chevron-left fs-2" @click="$router.go(-1)"></i>
      <div v-if="scrollEnd && artist" class="fs-5">
        {{ artist.artist.name }}
      </div>
      <!-- 右侧放大镜进入搜索 -->
      <i
        class="bi bi-search fs-3"
        @click="$router.push({ name: 'searchInput' })"></i>
    </div>
    <!-- 歌手背景 -->
    <div
      class="position-absolute top-0 z-n1 w-100 transition-9"
      style="height: 100vw"
      :class="[{ 'h-100': scrollEnd }]">
      <img
        v-if="artist"
        :src="`${artist.artist.cover}?param=300y300`"
        class="w-100 h-100 object-fit-cover" />
    </div>
  </div>
</template>
<script>
  import {
    getArtistDetail,
    getArtistSongs,
    getArtistAlbum,
  } from "@/api/getData.js";
  import { mapMutations, mapState } from "vuex";
  import BScroll from "@better-scroll/core"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up"; //导入Better scroll上拉加载插件
  import NestedScroll from "@better-scroll/nested-scroll"; //导入嵌套滚动
  BScroll.use(NestedScroll); //嵌套滚动
  BScroll.use(Pullup); //注册插件
  import throttle from "lodash/throttle"; //lodash节流
  import playAllTitle from "../components/son/playAllTitle.vue";
  export default {
    data() {
      return {
        active: 0, //当前标签页激活的下标,默认:"单曲"
        artist: null, //歌手信息
        followed: false, //是否关注该歌手.因为没有传回数据,仅能做伪数据
        birthday: null, //歌手生日
        Constellation: null, //歌手星座
        scrollEnd: false, //最外层是否滚动到底部
        songList: [], //歌曲列表
        songCount: null, //歌曲总数
        songIsPullUpLoad: false, //单曲是否上拉加载中
        songLoadFinish: false, //单曲是否加载完成
        albumFirstLoad: true, //专辑标签页是否首次加载
        albumList: [], //专辑列表,一次性请求完.因为一个歌手没多少专辑
        albumIsPullUpLoad: false, //单曲是否上拉加载中
        albumLoadFinish: false, //单曲是否加载完成
        bs: new Array(3), //Better scroll实例化对象的存储数组
      };
    },
    // 计算属性
    computed: {
      ...mapState(["miniPlayerStatus"]),
    },
    // 方法
    methods: {
      ...mapMutations(["setSongList", "setPlayIndex"]),
      // 星座判断
      getConstellation(month, day) {
        switch (month) {
          case 1:
            if (day > 19) {
              return "水瓶座";
            } else return "摩羯座";
          case 2:
            if (day > 18) {
              return "双鱼座";
            } else return "水瓶座";
          case 3:
            if (day > 20) {
              return "白羊座";
            } else return "双鱼座";
          case 4:
            if (day > 19) {
              return "金牛座";
            } else return "白羊座";
          case 5:
            if (day > 20) {
              return "双子座";
            } else return "金牛座";
          case 6:
            if (day > 21) {
              return "巨蟹座";
            } else return "双子座";
          case 7:
            if (day > 22) {
              return "狮子座";
            } else return "巨蟹座";
          case 8:
            if (day > 22) {
              return "处女座";
            } else return "狮子座";
          case 9:
            if (day > 22) {
              return "天秤座";
            } else return "处女座";
          case 10:
            if (day > 23) {
              return "天蝎座";
            } else return "天秤座";
          case 11:
            if (day > 20) {
              return "射手座";
            } else return "天蝎座";
          case 12:
            if (day > 21) {
              return "摩羯座";
            } else return "射手座";
        }
      },
      // 页面滚动到底部后,修改顶栏样式
      titleChange: throttle(function (e) {
        if (e.y == this.bs[0].maxScrollY) {
          this.scrollEnd = true;
        } else {
          this.scrollEnd = false;
        }
      }, 500),
      // 歌曲加载
      async songListLoad() {
        let songList = await getArtistSongs(
          this.$route.query.id,
          30,
          this.songList.length
        );
        this.songList.push(...songList.songs);
        if (this.songCount === null) this.songCount = songList.total;
      },
      // 歌曲上拉加载
      songListPullUp() {
        // 如果加载完毕
        if (this.songList.length === this.songCount) {
          this.songLoadFinish = true;
          this.bs[1].closePullUp();
        }
        // 如果没加载完
        else {
          this.songIsPullUpLoad = true;
          this.songListLoad();
          this.bs[1].finishPullUp();
          this.songIsPullUpLoad = false;
        }
        this.$nextTick(() => {
          this.bs[1].refresh();
        });
      },
      // 专辑加载
      async albumListLoad() {
        let albumList = await getArtistAlbum(
          this.$route.query.id,
          30,
          this.albumList.length
        );
        this.albumList.push(...albumList.hotAlbums);
        this.albumLoadFinish = !albumList.more;
      },
      // 专辑上拉加载
      albumListPullUp() {
        // 如果加载完毕
        if (this.songLoadFinish) {
          this.bs[2].closePullUp();
        }
        // 如果没加载完
        else {
          this.albumIsPullUpLoad = true;
          this.albumListLoad();
          this.bs[2].finishPullUp();
          this.albumIsPullUpLoad = false;
        }
        this.$nextTick(() => {
          this.bs[2].refresh();
        });
      },
      // 单曲部分传出的方法,用于修改本地播放列表
      songListChange() {
        this.setSongList(this.songList.map((i) => i.id));
      },
      // 点击播放全部已加载
      playAll() {
        this.songListChange();
        this.setPlayIndex(0);
      },
    },
    // 监听器
    watch: {
      async active(newV) {
        if (newV === 1 && this.albumFirstLoad) {
          this.albumFirstLoad = false;
          this.albumListLoad();
          this.$nextTick(() => {
            this.bs[2] = new BScroll(this.$refs.album.$el, {
              click: true,
              pullUpLoad: true,
              nestedScroll: {
                groupId: 1, // groupId is a string or number
              },
            });
            this.bs[2].on("pullingUp", this.albumListPullUp);
          });
        }
      },
    },
    // 创建后生命周期
    async created() {
      let artist = await getArtistDetail(this.$route.query.id);
      this.artist = artist.data;
      if (this.artist.user) {
        let date = new Date(this.artist.user.birthday);
        this.birthday = date.toLocaleDateString();
        this.Constellation = this.getConstellation(
          date.getMonth() + 1,
          date.getDate()
        );
      }
      this.songListLoad(); //加载歌曲
      this.$nextTick(() => {
        this.bs[0].refresh(); // 最后重新计算Better scroll
        this.bs[1].refresh(); // 最后重新计算Better scroll
      });
    },
    // 挂载后生命周期
    mounted() {
      this.bs[0] = new BScroll(this.$refs.artistHome, {
        click: true,
        pullUpLoad: true,
        bounce: {
          bottom: false, //阻止底部的上拉回弹动画
        },
        nestedScroll: {
          groupId: 1, // groupId is a string or number
        },
      });
      this.bs[0].on("scroll", this.titleChange);
      this.bs[1] = new BScroll(this.$refs.song.$el, {
        click: true,
        pullUpLoad: true,
        nestedScroll: {
          groupId: 1, // groupId is a string or number
        },
      });
      this.bs[1].on("pullingUp", this.songListPullUp);
    },
    // 组件
    components: {
      playAllTitle,
    },
  };
</script>
<style lang="scss">
  .artist-info {
    margin-top: calc(100vw - 15px);
    background: linear-gradient(var(--bs-secondary-bg) 15px, transparent);
  }
  .identityIconUrl {
    width: 21px;
  }
  .van-tab__pane-wrapper {
    height: calc(100vh - 61.4px - 44px);
  }
  .van-tab__pane {
    min-height: calc(100vh - 61.4px - 44px + 10px);
  }
</style>
