<template>
  <div class="d-flex justify-content-between align-items-center ps-3 pe-3">
    <div class="fs-5 fw-bold">
      <i
        v-if="!data.subTitle.canShowTitleLogo"
        class="loop bi bi-arrow-clockwise fs-2 position-relative"></i
      ><span class="me-1">{{ data.subTitle.title }}</span
      ><button
        v-if="data.button.text === '播放'"
        class="btn btn-sm rounded-pill d-inline-flex align-items-center"
        :class="Theme">
        <i class="bi bi-play-fill fs-6"></i>{{ data.button.text }}</button
      ><font-awesome-icon
        v-if="data.button.text === '更多'"
        icon="fa-solid fa-angle-right"
        size="sm" />
    </div>
    <div class="fs-3">
      <i class="bi bi-three-dots-vertical text-body-tertiary"></i>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["Theme", "data"],
  };
</script>
<style lang="scss" scoped>
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
</style>
