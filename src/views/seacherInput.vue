<template>
  <div class="find-view w-100 h-100 noScrollBar">
    <!-- 顶部搜索框 -->
    <div class="find-search blur position-fixed top-0 d-flex pt-4 z-3">
      <div
        class="d-flex justify-content-center align-items-center"
        @click="goBack()">
        <font-awesome-icon :icon="['fas', 'bars']" size="xl" />
      </div>
      <!-- input框是假的,点击后跳转真的搜索页面 -->
      <div
        class="col-9 d-flex justify-content-between align-items-center rounded-pill ps-3 pe-3"
        :class="Theme">
        <div>
          <i class="bi bi-search me-2"></i
          ><span class="placeHolder text-secondary"
            >大家在搜:{{ searchHot.first }}</span
          >
        </div>
        <div>
          <i class="bi bi-qr-code-scan"></i>
        </div>
      </div>
      <div class="text-center">
        <i class="bi bi-mic fs-4"></i>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      // 返回
      goBack() {
        this.$router.go(-1);
        if (this.playIndex != -1) this.miniPlayerShow();
      },
    },
  };
</script>
