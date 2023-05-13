<template>
  <div class="hr pt-2 pb-3" :class="Theme">
    <!-- title信息 -->
    <div
      class="d-flex justify-content-between align-items-center ps-3 pe-3 mb-2">
      <div class="fs-5 fw-bold">
        <span>{{ data.uiElement.subTitle.title }}</span
        ><i class="bi bi-chevron-right fs-6"></i>
      </div>
      <div class="fs-3">
        <i class="bi bi-three-dots-vertical text-body-tertiary"></i>
      </div>
    </div>
    <!-- 轮播图 -->
    <swiper-container
      v-if="data.creatives"
      slides-per-view="auto"
      space-between="10"
      class="fs-7 ps-3 pe-3">
      <swiper-slide v-for="(item, index) in data.creatives" :key="index">
        <!-- 单个不切换的slide -->
        <div v-if="item.resources.length === 1" class="position-relative">
          <!-- 顶部播放量/阴影遮罩 -->
          <div
            class="bgShadow position-absolute w-100 Clearfix t-shadow-2 rounded-top-3">
            <div class="float-end me-2 mt-1 mb-3 fw-bold fs-8 text-light">
              <i class="bi bi-play-fill"></i
              >{{ item.resources[0].resourceExtInfo.playCount | ConUnit }}
            </div>
          </div>
          <i
            class="playIcon bi bi-play-fill position-absolute end-0 fs-1 me-1 t-shadow-2 text-light"></i>
          <!-- 背景图 -->
          <img :src="item.uiElement.image.imageUrl" class="w-100 rounded-3" />
          <span class="t-overflow-2">{{ item.uiElement.mainTitle.title }}</span>
        </div>
        <!-- 三个切换的slide -->
        <slide v-if="item.resources.length === 3" :item="item"></slide>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
<script>
  import slide3 from "./playList3.vue";
  export default {
    props: ["data", "Theme"],
    components: {
      slide: slide3,
    },
  };
</script>
<style lang="scss" scoped>
  .hr.light {
    border-bottom: 1px solid #e5e6eb;
  }
  .hr.dark {
    border-bottom: 1px solid #24242c;
  }
  swiper-slide {
    width: 33.3vw;
  }
  .bgShadow {
    background: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
  }
  .playIcon {
    top: 99px;
  }
</style>
