<template>
  <div class="searchResult-View">
    <!-- 顶部搜索框 -->
    <div
      class="find-search blur position-fixed top-0 d-flex pt-4 ps-3 pe-3 z-3">
      <!-- 返回图标 -->
      <i
        class="flex-shrink-0 bi bi-chevron-left fs-2 me-3"
        @click="$router.go(-1)"></i>
      <!-- input框是假的,点击后跳转真的搜索页面 -->
      <div
        @click="$router.push({ name: 'searchInput' })"
        class="flex-grow-1 d-flex justify-content-between align-items-center rounded-pill ps-3 pe-3"
        :class="Theme">
        <div>
          <i class="bi bi-search me-2"></i
          ><span class="placeHolder text-secondary">{{ kw }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        kw: "",
      };
    },
    // 创建后生命周期
    created() {
      this.kw = this.$route.query.keyword;
    },
  };
</script>
