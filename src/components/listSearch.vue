<template>
  <div
    v-if="themeColor != []"
    class="listTitle position-fixed z-3 top-0 w-100 overflow-hidden d-flex align-items-center ps-3 pe-2 bg-body text-light"
    :style="[{ '--bs-body-bg-rgb': themeColor }, { '--bs-bg-opacity': 0 }]">
    <div class="h-100 d-flex align-items-center overflow-hidden flex-grow-1">
      <i class="bi bi-arrow-left fs-2 me-3 flex-shrink-0"></i>
      <span class="fs-4 overflow-hidden text-nowrap flex-grow-1 me-3">{{
        title
      }}</span>
      <span
        class="collectBtn d-flex align-items-center flex-shrink-0 me-3 rounded-pill fs-8 bg-light"
        style="--bs-bg-opacity: 0.1">
        <i class="bi bi-collection-play me-1"></i><span>收藏</span>
      </span>
    </div>
    <div class="h-100 d-flex align-items-center flex-shrink-0">
      <i
        class="bi bi-search me-2 fs-4 me-3 text-light"
        style="--bs-text-opacity: 0.8"></i>
      <i
        class="bi bi-three-dots-vertical fs-1 text-light"
        style="--bs-text-opacity: 0.8"></i>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["title", "Top", "themeColor", "opacity"],
  };
</script>
<style lang="scss">
  .listTitle {
    --list-title-h: 40px;
    height: var(--list-title-h);
  }
  .collectBtn {
    padding: 3px 9px;
  }
</style>
