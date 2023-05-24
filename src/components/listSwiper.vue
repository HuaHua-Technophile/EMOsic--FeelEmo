<template>
  <div class="cardHr" :class="Theme">
    <!-- title信息栏 -->
    <swiper-card-title
      :data="data.uiElement"
      @playThisResource="playThisResource"></swiper-card-title>
    <!-- 横板轮播图 -->
    <swiper-container slides-per-view="auto" class="ps-3 pt-3">
      <swiper-slide v-for="(i, index) in data.creatives" :key="index">
        <div
          v-for="(j, indexs) in i.resources"
          :key="indexs"
          @click="playThisSong(j.resourceId)"
          class="d-flex align-items-center"
          :class="{ 'mb-3': indexs != 2 }">
          <img
            :src="`${j.uiElement.image.imageUrl}?param=x74y74`"
            class="img rounded-3 me-3" />
          <div>
            <div class="mainTitle fw-bold">
              <span class="van-multi-ellipsis--l2">{{
                j.uiElement.mainTitle.title
              }}</span>
            </div>
            <div class="">
              <span
                v-if="j.uiElement.subTitle"
                class="subTitle fs-8 text-danger rounded-3 me-1">
                {{ j.uiElement.subTitle.title }} </span
              ><span class="fs-7 text-body-secondary">{{
                j.resourceExtInfo.artists[0].name
              }}</span>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
<script>
  import { mapMutations, mapState } from "vuex";
  export default {
    props: ["data"],
    // 计算属性
    computed: {
      ...mapState(["Theme"]),
    },
    // 方法
    methods: {
      ...mapMutations(["setSongList", "setPlayIndex", "setPlaySongId"]),
      // 点击播放整个歌单
      playThisResource() {
        this.setSongList(this.data.resourceIdList);
        this.setPlayIndex(0);
      },
      // 点击某个歌曲播放
      playThisSong(id) {
        this.setSongList(this.data.resourceIdList);
        this.setPlaySongId(id);
      },
    },
  };
</script>
<style lang="scss" scoped>
  swiper-slide {
    width: 85vw;
    margin-right: 5vw;
  }
  .img {
    width: 21%;
  }
  .mainTitle {
    font-size: 17px;
  }
  .subTitle {
    padding: 1px 5px 2px 5px;
    background: rgba(var(--bs-danger-rgb), 0.1);
  }
</style>
