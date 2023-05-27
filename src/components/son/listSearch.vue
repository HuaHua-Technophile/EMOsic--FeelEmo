<template>
  <div
    class="listTitle position-fixed z-3 top-0 w-100 overflow-hidden d-flex align-items-center ps-3 pe-3 bg-body text-light transition-2"
    :style="[
      { '--bs-body-bg-rgb': themeColor },
      { '--bs-bg-opacity': opacity },
    ]">
    <div class="h-100 d-flex align-items-center overflow-hidden flex-grow-1">
      <i
        class="bi bi-arrow-left fs-2 flex-shrink-0"
        @click="$router.go(-1)"></i>
      <van-notice-bar
        :text="title"
        color="#e8e8e8"
        background="#00000000"
        class="fs-4 flex-grow-1" />
      <!-- 收藏按钮,只在滚动较少的情况下出现 -->
      <transition name="bounceOut">
        <span
          v-if="collectStatus"
          @click="$emit('changeSubscribe')"
          class="collectBtn d-flex align-items-center flex-shrink-0 me-3 rounded-pill fs-8 bg-light"
          style="--bs-bg-opacity: 0.1">
          <span v-show="subscribed" class="iconfont icon-shoucang1"
            >已收藏</span
          >
          <span v-show="!subscribed" class="iconfont icon-shoucang">收藏</span>
        </span>
      </transition>
    </div>
    <i
      class="bi bi-search fs-4 text-light"
      style="--bs-text-opacity: 0.8"
      @click="$router.push({ name: 'searchInput' })"></i>
  </div>
</template>
<script>
  export default {
    props: ["title", "themeColor", "opacity", "collectStatus", "subscribed"],
  };
</script>
<style lang="scss">
  .listTitle {
    height: 40px;
  }
  .collectBtn {
    padding: 3px 9px;
  }
</style>
