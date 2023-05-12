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
        ref="bannerSwiper"
        speed="700"
        loop="true"
        pagination="true"
        pagination-dynamic-bullets="true"
        init="false">
        <swiper-slide
          v-for="(item, index) in bannerSwiperList"
          :key="index"
          class="p-3">
          <div><img :src="item.pic" class="w-100 h-100 rounded-4" /></div>
        </swiper-slide>
      </swiper-container>
      <!-- 发现页滚动入口图标 -->
      <swiper-container
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
            <div>
              {{ item.name }}
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
      <!-- 发现页推荐歌单 -->
    </div>
  </div>
</template>
<script>
  import { getSearchHot, getFind, getBall } from "../api/findData.js";
  export default {
    props: ["Theme"],
    data() {
      return {
        timeId1: null,
        searchHot: {},
        searchHotList: [],
        bannerSwiperList: [],
        ballList: [],
        recommendedPlaylist: [],
      };
    },
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
        Object.assign(this.$refs.bannerSwiper, {
          // swiper element注入自定义样式
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
        this.recommendedPlaylist = res.data.blocks[1].creatives;
      });
      //获取发现页圆形图标入口列表
      getBall().then((res) => {
        this.ballList = res.data;
        Object.assign(this.$refs.ballSwiper, {
          // swiper element注入自定义样式
          injectStyles: [
            `.swiper-pagination-progressbar.swiper-pagination-horizontal{
              --swiper-pagination-color:#ff4646;
            width:30px;
            left:50%;
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
      this.timeId1 = setInterval(() => {
        this.searchHotList.indexOf(this.searchHot) ==
        this.searchHotList.length - 1
          ? (this.searchHot = this.searchHotList[0])
          : (this.searchHot =
              this.searchHotList[
                this.searchHotList.indexOf(this.searchHot) + 1
              ]);
      }, 8000);
    },
    //组件销毁前清除定时器
    beforeDestroy() {
      clearInterval(this.timeId1);
    },
  };
</script>
<style lang="scss">
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
</style>
