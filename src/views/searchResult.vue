<template>
  <div class="searchResult-View w-100 h-100">
    <!-- 顶部搜索框 -->
    <div
      class="find-search blur position-fixed top-0 d-flex w-100 pt-4 ps-3 pe-3 z-3">
      <!-- 返回图标 -->
      <i
        class="flex-shrink-0 bi bi-chevron-left fs-2 me-3"
        @click="$router.go(-1)"></i>
      <!-- input框是假的,点击后跳转真的搜索页面 -->
      <div
        @click="$router.push({ name: 'searchInput' })"
        class="flex-grow-1 d-flex justify-content-between align-items-center bg-secondary rounded-pill ps-3 pe-3"
        style="--bs-bg-opacity: 0.2">
        <div>
          <i class="bi bi-search me-2"></i
          ><span class="placeHolder text-secondary">{{ kw }}</span>
        </div>
      </div>
    </div>
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
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
<style lang="scss">
  .searchResult-View {
    padding-top: 70px;
  }
</style>
