<template>
  <div
    class="find-view w-100 h-100 noScrollBar"
    :class="[{ 'h-miniPlayer': miniPlayerStatus }]">
    <!-- 顶部搜索框 -->
    <div class="find-search blur position-fixed top-0 d-flex pt-4 z-3">
      <div
        class="d-flex justify-content-center align-items-center"
        @click="toMineView()">
        <i class="bi bi-person fs-2"></i>
      </div>
      <!-- input框是假的,点击后跳转真的搜索页面 -->
      <div
        class="col-9 d-flex justify-content-between align-items-center rounded-pill ps-3 pe-3"
        :class="Theme">
        <div>
          <i class="bi bi-search me-2"></i
          ><span class="placeHolder text-secondary"
            >大家在搜:{{ searchHot.first }}</span
          >
        </div>
      </div>
      <div class="text-center">
        <i class="bi bi-mic fs-4"></i>
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
              :src="`${item.pic}?param=x382y152`"
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
              <img :src="`${item.iconUrl}?param=x137y137`" class="w-75" />
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
      ...mapMutations(["changeTheme", "songListAdd", "setPlaySongId"]),
      // 左上角跳转至"我的/设置"页面
      toMineView() {
        this.$router.push({ name: "mine" });
      },
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
  .find-view {
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .find-search {
    width: calc(100% - 0.7px);
    > div:nth-child(1) {
      flex-grow: 1;
    }
    > div:nth-child(2).light {
      background: rgba(0, 0, 0, 0.15);
    }
    > div:nth-child(2).dark {
      background: rgba(255, 255, 255, 0.15);
    }
    > div:nth-child(3) {
      flex-grow: 1;
    }
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
