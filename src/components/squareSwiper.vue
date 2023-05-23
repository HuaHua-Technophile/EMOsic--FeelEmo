<template>
  <div class="cardHr pb-3 pt-3" :class="Theme">
    <!-- title信息栏 -->
    <swiper-card-title :data="data.uiElement"></swiper-card-title>
    <!-- 轮播图 -->
    <swiper-container
      v-if="data.creatives"
      slides-per-view="auto"
      space-between="10"
      class="fs-7 ps-3 pe-3">
      <swiper-slide
        v-for="(item, index) in data.creatives"
        :key="index"
        @click="toPlayListDetail(item, $event)"
        class="pt-3">
        <!-- 单个不切换的slide -->
        <div v-if="item.resources.length === 1" class="position-relative">
          <!-- 背景图卡片 -->
          <square-card :size="'100%'">
            <template #playCount>
              <i class="bi bi-play-fill"></i
              ><span>{{
                item.resources[0].resourceExtInfo.playCount | ConUnit
              }}</span>
            </template>
            <template #img>
              <img :src="`${item.uiElement.image.imageUrl}?param=x138y138`" />
            </template>
            <template #playIcon>
              <i
                ref="playBtn"
                class="bi bi-play-fill fs-1"
                @click="playThisList(index)"></i>
            </template>
          </square-card>
          <span class="van-multi-ellipsis--l2">{{
            item.uiElement.mainTitle.title
          }}</span>
        </div>
        <!-- 三个切换的slide -->
        <slide
          v-if="item.resources.length === 3"
          :item="item"
          @setFirstIndex="setFirstIndex"></slide>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
<script>
  import { mapMutations, mapState } from "vuex";
  import slide3 from "./son/squareSwiperFirstSlide.vue";
  import { getPlayListDetail } from "../api/getData.js";
  export default {
    props: ["data"],
    data() {
      return {
        firstIndex: 0,
      };
    },
    computed: {
      ...mapState(["Theme"]),
    },
    methods: {
      ...mapMutations(["setPlayIndex", "setSongList"]),
      // 点击跳转歌单详情路由
      toPlayListDetail(item, e) {
        let id = null;
        if (item.resources.length == 1) id = item.creativeId;
        else id = item.resources[this.firstIndex].resourceId;
        if (e.target.nodeName == "IMG") {
          this.$router.push({ name: "playListDetail", query: { id } });
        }
      },
      // 播放当前歌单
      async playThisList(index) {
        await getPlayListDetail(this.data.creatives[index].creativeId).then(
          (res) => {
            this.setSongList(res.playlist.trackIds.map((i) => i.id));
          }
        );
        this.setPlayIndex(0);
      },
      // 首个轮播slide切换时,点击的歌单也需同步更改
      setFirstIndex(index) {
        this.firstIndex = index;
      },
    },
    // 组件
    components: {
      slide: slide3,
    },
  };
</script>
<style lang="scss" scoped>
  swiper-slide {
    width: 33.3vw;
  }
  .bgShadow {
    background: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
  }
</style>
