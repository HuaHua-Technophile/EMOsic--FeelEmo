<template>
  <div class="cardHr" :class="Theme">
    <!-- title信息栏 -->
    <swiper-card-title :data="data.uiElement"></swiper-card-title>
    <!-- swiper轮播图 -->
    <swiper-container slides-per-view="auto" class="ps-3 pb-3 pt-1">
      <swiper-slide
        v-for="(i, index) in data.creatives"
        :key="index"
        class="rounded-3"
        :class="[
          { 'bg-light shadow-sm': Theme == 'light' },
          { 'bg-body-tertiary': Theme == 'dark' },
        ]">
        <swiper-card-title
          :data="i.uiElement"
          class="mt-2 mb-2"></swiper-card-title>
        <div
          v-for="(j, indexs) in i.resources"
          :key="indexs"
          class="ps-3 pe-3 mb-3 d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <img
              :src="`${j.uiElement.image.imageUrl}?param=60y60`"
              class="topImg rounded" />
            <span class="Rank ms-2 me-2 fw-bolder">{{ indexs + 1 }}</span>
            <div>
              <span class="van-multi-ellipsis--l2">{{
                j.uiElement.mainTitle.title
              }}</span>
              <!-- 歌手信息 -->
              <span v-if="j.resourceExtInfo">
                <span
                  v-for="(k, indexss) in j.resourceExtInfo.artists"
                  :key="indexss"
                  class="fs-9 text-body-secondary"
                  >{{ k.name
                  }}<span v-if="indexss < j.resourceExtInfo.artists.length - 1"
                    >/</span
                  ></span
                >
              </span>
            </div>
          </div>
          <span
            class="fs-9 text-nowrap ms-2"
            :class="j.uiElement.labelText.textColor"
            >{{ j.uiElement.labelText.text }}</span
          >
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  export default {
    props: ["data"],
    computed: {
      ...mapState(["Theme"]),
    },
  };
</script>
<style lang="scss" scoped>
  swiper-slide {
    width: 85vw;
    margin-right: 5vw;
    > div:nth-child(2) .Rank {
      color: #ca9631;
    }
    > div:nth-child(3) .Rank {
      color: #8187ab;
    }
    > div:nth-child(4) .Rank {
      color: #cb7c51;
    }
  }
  .topImg {
    height: 3.5rem;
    max-width: 4.3rem;
  }
  .colorPrimary1 {
    color: #ee4143;
  }
  .colorSecondary7 {
    color: #4fb893;
  }
</style>
