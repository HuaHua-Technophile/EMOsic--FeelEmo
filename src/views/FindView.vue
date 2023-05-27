<template>
  <div
    class="find-view w-100 h-100 noScrollBar overflow-y-scroll overflow-x-hidden"
    :class="[{ 'h-miniPlayer': miniPlayerStatus }]">
    <!-- 顶部搜索框 -->
    <div
      class="find-search blur position-fixed top-0 d-flex pt-4 ps-3 pe-3 z-3">
      <div
        class="d-flex justify-content-center align-items-center me-3"
        @click="$router.push({ name: 'userHome' })">
        <i class="bi bi-person fs-2"></i>
      </div>
      <!-- input框是假的,点击后跳转真的搜索页面 -->
      <div
        @click="toSearchInput()"
        class="flex-grow-1 d-flex justify-content-between align-items-center bg-secondary rounded-pill ps-3 pe-3"
        style="--bs-bg-opacity: 0.2">
        <div>
          <i class="bi bi-search me-2"></i
          ><span class="placeHolder text-secondary"
            >大家在搜:{{ searchHot.first }}</span
          >
        </div>
      </div>
    </div>
    <div class="find-main" :class="Theme">
      <!-- 发现页轮播图 -->
      <swiper-container
        class="bannerSwiper"
        ref="bannerSwiper"
        speed="700"
        loop="true"
        pagination="true"
        pagination-dynamic-bullets="true"
        autoplay-delay="8000"
        init="false">
        <swiper-slide
          v-for="(item, index) in bannerSwiperList"
          :key="index"
          @click="toBanner(item)"
          class="p-3 pb-1">
          <div>
            <img
              :src="`${item.pic}?param=382y152`"
              class="w-100 h-100 rounded-4" />
          </div>
        </swiper-slide>
      </swiper-container>
      <!-- 发现页滚动入口图标 -->
      <swiper-container
        calss="ballSwiper"
        ref="ballSwiper"
        slides-per-view="5"
        free-mode="true"
        pagination="true"
        pagination-type="progressbar"
        init="false">
        <swiper-slide v-for="(item, index) in ballList" :key="index">
          <div class="text-center">
            <div class="w-100 changeColor">
              <img :src="`${item.iconUrl}?param=137y137`" class="w-75" />
            </div>
            <div class="translate-middle-y" style="font-size: 13px">
              {{ item.name }}
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
      <!-- 发现页推荐歌单 -->
      <square-swiper v-if="playList1" :data="playList1"></square-swiper>
      <!-- 发现页精选歌曲 -->
      <list-swiper
        v-if="songList1"
        :data="songList1"
        class="pt-3 pb-3"></list-swiper>
      <!-- 未登录情况下,第三个是发现页排行榜 -->
      <top-swiper
        v-if="Block3 && Block3.showType == 'HOMEPAGE_SLIDE_TOPLIST'"
        :data="Block3"
        class="pt-3"></top-swiper>
      <!-- 已登录情况下,第三个是雷达歌单 -->
      <square-swiper
        v-if="Block3 && Block3.showType == 'HOMEPAGE_SLIDE_PLAYLIST'"
        :data="Block3"
        class="pt-3"></square-swiper>
      <!-- 未登录情况下,第四个是发现页雷达歌单 -->
      <square-swiper
        v-if="Block4 && Block4.showType == 'HOMEPAGE_SLIDE_PLAYLIST'"
        :data="Block4"></square-swiper>
      <!-- 已登录情况下,第四个是发现页歌曲拍卖 -->
      <!-- 未登录情况下,第五个是发现页新歌新碟 -->
      <list-swiper
        v-if="songList2"
        :data="songList2"
        class="pt-3 pb-3"></list-swiper>
    </div>
  </div>
</template>
<script>
  import { getSearchHot, getFind, getBall } from "../api/getData.js";
  import { mapState, mapMutations } from "vuex";
  export default {
    data() {
      return {
        timeIdList: [],
        searchHot: {},
        searchHotList: [],
        bannerSwiperList: [],
        ballList: [], //推荐入口图标
        //playList是方形轮播图
        playList1: null,
        Block4: null,
        Block3: null,
        // songList是横板轮播图
        songList1: null,
        songList2: null,
      };
    },
    // 计算属性
    computed: {
      ...mapState(["Theme", "miniPlayerStatus"]),
    },
    //方法
    methods: {
      ...mapMutations(["songListAdd", "setPlaySongId"]),
      // 首页轮播图点击跳转
      toBanner(item) {
        if (item.url) {
          window.location.href = item.url;
        }
        if (item.song) {
          this.songListAdd(item.song.id);
          this.setPlaySongId(item.song.id);
        } else {
          let id = item.encodeId;
          this.$router.push({ name: "playListDetail", query: { id } });
        }
      },
      // 点击跳转搜索页
      toSearchInput() {
        this.$router.push({ name: "searchInput" });
      },
    },
    //生命周期函数获取数据
    async created() {
      //获取搜索框热搜推广词
      await getSearchHot().then((res) => {
        this.searchHotList = res.result.hots;
        this.searchHot = res.result.hots[0];
      });
      //获取发现页圆形图标入口列表
      await getBall().then((res) => {
        this.ballList = res.data;
        // ballSwiper element注入自定义样式
        Object.assign(this.$refs.ballSwiper, {
          injectStyles: [
            `.swiper-pagination-progressbar.swiper-pagination-horizontal{
                --swiper-pagination-color:#ff4646;
              width:30px;
              left:50%;
              top:95%;
              border-radius:999px;
              overflow:hidden;
              transform:translateX(-50%);
            }`,
          ],
        });
        this.$refs.ballSwiper.initialize();
      });
      //获取发现页数据,包含:轮播图,推荐歌单
      await getFind().then((res) => {
        //轮播图数据写入,轮播图组件初始化前注入自定义样式,然后初始化轮播图
        this.bannerSwiperList = res.data.blocks[0].extInfo.banners;
        // bannerSwiper element注入自定义样式
        Object.assign(this.$refs.bannerSwiper, {
          injectStyles: [
            `.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{
                --swiper-pagination-color:white;
                --swiper-pagination-bullet-inactive-color:pink;
                --swiper-pagination-bullet-inactive-opacity:0.5;
                left:17px;
                bottom:20px;
                transform:none;}`,
          ],
        });
        this.$refs.bannerSwiper.initialize();
        //方形轮播图1数据写入
        this.playList1 = res.data.blocks[1];
        this.songList1 = res.data.blocks[2];

        this.Block3 = res.data.blocks[3];
        this.Block4 = res.data.blocks[4];

        this.songList2 = res.data.blocks[5];
      });
    },
    //挂载后设置定时器,嵌套轮播图的初始化注入特效
    mounted() {
      //定时修改发现页面输入框的推荐文本
      this.timeIdList.push(
        setInterval(() => {
          this.searchHotList.indexOf(this.searchHot) ==
          this.searchHotList.length - 1
            ? (this.searchHot = this.searchHotList[0])
            : (this.searchHot =
                this.searchHotList[
                  this.searchHotList.indexOf(this.searchHot) + 1
                ]);
        }, 8000)
      );
    },
    //组件销毁前清除定时器
    beforeDestroy() {
      this.timeIdList.forEach((id) => clearInterval(id));
    },
  };
</script>
<style lang="scss">
  .find-search {
    width: calc(100% - 0.5px);
    .placeHolder {
      font-size: 15px;
    }
  }
  .find-main {
    padding-top: 56.5px;
    &.light {
      background: linear-gradient(#f8ecee, #00000000 30%);
    }
    &.dark {
      background: linear-gradient(#291d25, #00000000 20%);
    }
  }
  .changeColor {
    color: #ff4646;
    overflow: hidden;
    text-indent: -1000px; //原本的图片向左移出视野外
    > img {
      filter: drop-shadow(500px 0px #ff4646);
      //再使用filter阴影填充,移回原本的位置
    }
  }
</style>
