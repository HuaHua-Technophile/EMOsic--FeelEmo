<template>
  <div class="d-flex justify-content-between align-items-center ps-3 pe-3">
    <!-- 标题左侧 -->
    <div v-if="data" class="fs-5 fw-bold">
      <!-- logo -->
      <i
        v-if="data.subTitle.canShowTitleLogo"
        class="loop bi bi-arrow-clockwise fs-2 position-relative"></i
      ><span class="me-1">{{ data.subTitle.title }}</span>
      <!-- 播放按钮和右侧icon二选一 -->
      <button
        v-if="data.button.text === '播放'"
        @click="$emit('playThisResource')"
        class="btn btn-sm rounded-pill d-inline-flex align-items-center"
        :class="Theme">
        <i class="bi bi-play-fill fs-6"></i>{{ data.button.text }}
      </button>
      <!-- 播放按钮和右侧icon二选一 -->
      <font-awesome-icon v-else icon="fa-solid fa-angle-right" size="sm" />
    </div>
    <!-- 在新歌新碟中,用得到的标签 -->
    <div v-if="data.mainTitle" class="fs-5 fw-bold me-1">
      {{ data.mainTitle.title }}
    </div>
    <!-- 在新歌新碟中,用得到的标签,或右侧更多标签 -->
    <div>
      <span v-if="data.mainTitle" class="fs-8 text-body-secondary">{{
        data.mainTitle.titleDesc
      }}</span>
      <i v-else class="fs-5 bi bi-three-dots-vertical text-body-tertiary"></i>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  export default {
    props: ["data"],
    computed: {
      ...mapState(["Theme"]),
    },
    watch: {
      data: {
        handler(newV) {
          console.log(newV);
        },
        deep: true,
      },
    },
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
