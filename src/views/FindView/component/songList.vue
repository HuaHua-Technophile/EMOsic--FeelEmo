<template>
  <div class="hr pt-2 pb-3" :class="Theme">
    <!-- title信息栏 -->
    <div class="d-flex justify-content-between align-items-center ps-3 pe-3">
      <div class="fs-5 fw-bold">
        <i class="loop bi bi-arrow-clockwise fs-2 position-relative"></i>
        <span>{{ data.uiElement.subTitle.title }}</span>
        <button
          v-if="data.uiElement.button.text != ''"
          class="btn btn-sm rounded-pill d-inline-flex ms-2 align-items-center"
          :class="Theme">
          <i class="bi bi-play-fill fs-6"></i>{{ data.uiElement.button.text }}
        </button>
      </div>
      <div class="fs-3">
        <i class="bi bi-three-dots-vertical text-body-tertiary"></i>
      </div>
    </div>
    <!-- 横板轮播图 -->
    <swiper-container slides-per-view="auto" class="ps-3 pt-2">
      <swiper-slide v-for="(i, index) in data.creatives" :key="index">
        <div
          v-for="(j, indexs) in i.resources"
          :key="indexs"
          class="d-flex align-items-center"
          :class="{ 'mb-3': indexs != 2 }">
          <img :src="j.uiElement.image.imageUrl" class="img rounded-3 me-3" />
          <div>
            <div class="mainTitle fw-bold">
              <span>{{ j.uiElement.mainTitle.title }}</span>
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
  export default {
    props: ["data", "Theme"],
  };
</script>
<style lang="scss" scoped>
  .hr.light {
    border-bottom: 1px solid #e5e6eb;
  }
  .hr.dark {
    border-bottom: 1px solid #24242c;
  }
  .loop {
    top: 3px;
  }
  .btn-sm {
    padding-top: 1px;
    padding-bottom: 1px;
  }
  .btn.dark {
    background: #24242c;
  }
  .btn.light {
    background: #eaedf2;
  }
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
