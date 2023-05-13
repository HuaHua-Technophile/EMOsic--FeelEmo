<template>
  <div id="find-view" class="w-100 h-100">
    <div class="find-search blur position-fixed top-0 d-flex pt-4 z-3">
      <div class="d-flex justify-content-center align-items-center">
        <font-awesome-icon :icon="['fas', 'bars']" size="xl" />
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
        <div>
          <i class="bi bi-qr-code-scan"></i>
        </div>
      </div>
      <div class="text-center">
        <i class="bi bi-mic fs-4"></i>
      </div>
    </div>
    <div class="find-main" :class="Theme">
      <!-- 发现页轮播图 -->
      <swiper-container
        v-if="bannerSwiperList != []"
        id="bannerSwiper"
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
          class="p-3 pb-1">
          <div><img :src="item.pic" class="w-100 h-100 rounded-4" /></div>
        </swiper-slide>
      </swiper-container>
      <!-- 发现页滚动入口图标 -->
      <swiper-container
        v-if="ballList != []"
        id="ballSwiper"
        ref="ballSwiper"
        slides-per-view="5"
        free-mode="true"
        pagination="true"
        pagination-type="progressbar"
        init="false">
        <swiper-slide v-for="(item, index) in ballList" :key="index">
          <div class="text-center">
            <div class="w-100 changeColor">
              <img :src="item.iconUrl" class="w-75" />
            </div>
            <div class="translate-middle-y" style="font-size: 13px">
              {{ item.name }}
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
      <!-- 发现页推荐歌单 -->
      <div class="d-flex justify-content-between align-items-center ps-3 pe-3">
        <div class="fs-5">推荐歌单<i class="bi bi-chevron-right fs-6"></i></div>
        <div class="fs-3"><i class="bi bi-three-dots-vertical"></i></div>
      </div>
      <swiper-container
        v-if="rePlayList != []"
        id="rePlay"
        slides-per-view="auto"
        space-between="10"
        class="fs-7 ps-3 pe-3">
        <swiper-slide>
          <div class="w-100 pb-100 position-relative">
            <div class="position-absolute top-0 end-0 bottom-0 start-0">
              <!-- 竖向轮播图需要html和body的position-ralative -->
              <swiper-container
                v-if="rePlayListFirst != {}"
                id="verSwiper"
                ref="verSwiper"
                init="false"
                class="w-100 h-100">
                <swiper-slide
                  v-for="(item, index) in rePlayListFirst.resources"
                  :key="index"
                  class="w-100">
                  <img
                    :src="item.uiElement.image.imageUrl"
                    class="w-100 rounded-3" />
                </swiper-slide>
              </swiper-container>
            </div>
          </div>
          <div class="text-over-2">{{ rePlayListFirstText }}</div>
        </swiper-slide>
        <swiper-slide v-for="(item, index) in rePlayList" :key="index">
          <div class="w-100">
            <div class="position-relative t-shadow-4 text-white">
              <div class="position-absolute top-0 end-0 mt-1 me-2">
                <i class="bi bi-play-fill"></i
                >{{ item.resources[0].resourceExtInfo.playCount | ConUnit }}
              </div>
              <img
                :src="item.uiElement.image.imageUrl"
                class="w-100 rounded-3" />
              <i
                class="bi bi-play-fill fs-1 position-absolute bottom-0 end-0 me-1"></i>
            </div>
            <div class="text-over-2">
              {{ item.uiElement.mainTitle.title }}
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>
<script>
  import { getSearchHot, getFind, getBall } from "../api/findData.js";
  export default {
    props: ["Theme"],
    data() {
      return {
        timeIdList: [],
        searchHot: {},
        searchHotList: [],
        bannerSwiperList: [],
        ballList: [],
        rePlayListFirst: {},
        rePlayListFirstText: "",
        rePlayList: [],
      };
    },
    //组件方法
    methods: {},
    // 生命周期函数获取数据
    created() {
      //获取搜索框热搜推广词
      getSearchHot().then((res) => {
        this.searchHotList = res.result.hots;
        this.searchHot = res.result.hots[0];
      });
      //获取发现页数据,包含:轮播图 , 推荐歌单
      getFind().then((res) => {
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

        //推荐歌单数据写入
        this.rePlayListFirst = res.data.blocks[1].creatives.shift();
        this.rePlayListFirstText =
          this.rePlayListFirst.resources[0].uiElement.mainTitle.title;
        this.rePlayList = res.data.blocks[1].creatives;
      });
      //获取发现页圆形图标入口列表
      getBall().then((res) => {
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
    },
    //挂载后设置定时器
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
      //推荐歌单第一个竖向轮播图的注入属性及样式
      Object.assign(this.$refs.verSwiper, {
        direction: "vertical",
        loop: true,
        /* autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        }, */
        effect: "creative",
        creativeEffect: {
          prev: {
            translate: [0, "-120%", -500],
          },
          next: {
            translate: [0, "120%", -500],
          },
        },
        injectStyles: [
          `swiper-slide>img{
            height:calc( 100% + 1px ) !important;
          }`,
        ],
      });
      this.$refs.verSwiper.initialize(); //初始化轮播图,但无法触发自动播放
    },
    //组件销毁前清除定时器
    beforeDestroy() {
      this.timeIdList.forEach((id) => clearInterval(id));
    },
  };
</script>
<style lang="scss" scoped>
  #find-view::-webkit-scrollbar {
    display: none;
  }
  #find-view {
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .find-search {
    width: calc(100% - 0.6px);
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
    height: 130vh;
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
  #rePlay {
    > swiper-slide {
      width: 33.3vw;
    }
  }
</style>
