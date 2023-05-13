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
  </div>
</template>
<script>
  export default {
    props: ["Theme", "data"],
  };
</script>
<style lang="scss" scoped>
  .hr.light {
    border-bottom: 1px solid #e5e6eb;
  }
  .hr.dark {
    border-bottom: 1px solid #24242c;
  }
</style>
