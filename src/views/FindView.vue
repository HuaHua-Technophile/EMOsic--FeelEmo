<template>
  <div id="find-view" class="w-100 h-100">
    <div class="find-search blur w-100 position-fixed top-0 d-flex pt-4 z-3">
      <div class="d-flex justify-content-center align-items-center">
        <font-awesome-icon :icon="['fas', 'bars']" size="xl" />
      </div>
      <!-- input框是假的,点击后跳转真的搜索页面 -->
      <div
        :class="[
          'col-9 d-flex justify-content-between align-items-center rounded-pill ps-3 pe-3',
          { dark: Theme == 'dark' },
        ]">
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
    <div class="find-main">
      <swiper-container>
        <swiper-slide class="text-center">Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>
<script>
  import { getSearchHot } from "../api/findData.js";
  export default {
    props: ["Theme"],
    data() {
      return {
        timeId1: null,
        searchHot: {},
        searchHotList: [],
      };
    },
    // 生命周期函数获取数据
    created() {
      //获取搜索框热搜推广词
      getSearchHot().then((res) => {
        this.searchHotList = res.result.hots;
        this.searchHot = res.result.hots[0];
      });
    },
    mounted() {
      this.timeId1 = setInterval(() => {
        this.searchHotList.indexOf(this.searchHot) ==
        this.searchHotList.length - 1
          ? (this.searchHot = this.searchHotList[0])
          : (this.searchHot =
              this.searchHotList[
                this.searchHotList.indexOf(this.searchHot) + 1
              ]);
      }, 4000);
    },
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
    > div:nth-child(1) {
      flex-grow: 1;
    }
    > div:nth-child(2) {
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
    // background: linear-gradient(#291d25, #1b1b24 20%);
  }
</style>
