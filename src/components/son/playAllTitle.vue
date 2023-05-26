<template>
  <div
    class="playAllTitle position-sticky z-1 d-flex justify-content-between align-items-center ps-3 pe-3">
    <!-- 左侧播放 -->
    <div @click="$emit('playAll')" class="d-flex align-items-center">
      <div class="playAllBtnIcon position-relative rounded-pill bg-danger me-2">
        <i
          class="bi bi-play-fill position-absolute top-50 start-50 translate-middle"></i>
      </div>
      <span class="fs-5 me-2">播放</span
      ><span class="fs-7 opacity-50">({{ listLength }})</span>
    </div>
    <!-- 右侧全选 -->
    <i class="bi bi-list-check fs-2"></i>
  </div>
</template>
<script>
  export default {
    props: ["listLength"],
    methods: {
      // 返回
      goBack() {
        this.$router.go(-1);
      },
    },
  };
</script>
<style>
  .playAllBtnIcon {
    width: 21px;
    height: 21px;
  }
  .playAllTitle {
    top: 40px;
  }
</style>
