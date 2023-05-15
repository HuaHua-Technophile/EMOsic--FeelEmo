<template>
  <div class="cardHr" :class="Theme">
    <!-- title信息栏 -->
    <swiper-card-title
      :data="data.uiElement"
      :Theme="Theme"></swiper-card-title>
    <!-- 横板轮播图 -->
    <swiper-container slides-per-view="auto" class="ps-3">
      <swiper-slide v-for="(i, index) in data.creatives" :key="index">
        <div
          v-for="(j, indexs) in i.resources"
          :key="indexs"
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
  export default {
    props: ["data", "Theme"],
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
