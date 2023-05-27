<template>
  <div class="d-flex justify-content-between align-items-center ps-3 pe-3">
    <!-- 标题左侧 -->
    <div v-if="data" class="fs-5 fw-bold">
      <!-- 左侧循环logo -->
      <i
        v-if="data.subTitle && data.subTitle.canShowTitleLogo"
        class="loop bi bi-arrow-clockwise fs-2 position-relative"></i>
      <!-- 分块名称 -->
      <span v-if="data.subTitle" class="me-1">{{ data.subTitle.title }}</span>
      <!-- 在新歌新碟中,二级标题 -->
      <span v-if="data.mainTitle" class="fs-5 fw-bold">
        {{ data.mainTitle.title }}
      </span>
      <!-- 播放按钮和右箭头二选一 -->
      <button
        v-if="data.button && data.button.text === '播放'"
        @click="$emit('playThisResource')"
        class="btn btn-sm rounded-pill d-inline-flex align-items-center bg-body-secondary">
        <i class="bi bi-play-fill fs-6"></i>{{ data.button.text }}
      </button>
      <!-- 播放按钮和右侧icon二选一 -->
      <i v-else class="fs-7 bi bi-chevron-right"></i>
    </div>
    <!-- 在排行榜中的二级标签,或一级的右侧更多标签 -->
    <div>
      <span v-if="data && data.mainTitle" class="fs-8 text-body-secondary">{{
        data.mainTitle.titleDesc
      }}</span>
      <i v-else class="fs-5 bi bi-three-dots-vertical text-body-tertiary"></i>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["data"],
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
</style>
