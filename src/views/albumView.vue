<template>
  <div
    ref="albumWrapper"
    class="albumWrapper w-100 h-100 bg-body"
    :style="`--bs-body-bg-rgb:${LightenDarkenColor(themeColor, -35)}`">
    <!-- 滚动核心 -->
    <div
      class="albumContent position-relative z-2 blur"
      :class="[{ 'h-miniPlayer': miniPlayerStatus }]">
      <!-- 头部信息栏，展示歌单信息、专辑信息 -->
      <play-list-header
        :playlist="playList"
        :subscribed="subscribed"
        @changeSubscribe="changeSubscribe"></play-list-header>
      <!-- 列表头部。适用于歌单列表,专辑列表，推荐雷达列表，声音列表 -->
      <play-all-title
        @playAll="playAll"
        :listLength="playList.trackCount"
        class="text-light t-shadow-3"></play-all-title>
      <song-list
        :detailList="detailList"
        :loadFinish="loadFinish"
        :isPullUpLoad="isPullUpLoad"
        :listOpacity="listOpacity"
        @songList="songList"></song-list>
    </div>
    <!-- 顶部搜索框，fixed定位。适用于官方雷达歌单、推荐歌单、专辑页 -->
    <list-search
      v-if="themeColor != []"
      :themeColor="LightenDarkenColor(themeColor, 30)"
      :title="titleText"
      :opacity="opacity"
      :collectStatus="collectStatus"
      :subscribed="subscribed"
      @changeSubscribe="changeSubscribe"
      class="t-shadow-3"></list-search>
    <!-- 背景图 -->
    <div class="w-100 h-100 position-absolute top-0 z-1">
      <img :src="`${coverImgUrl}?param=450y1050`" class="w-100" />
    </div>
  </div>
</template>
<script>
  export default {};
</script>
<style lang="scss">
  .albumContent {
    width: calc(100% - 0.5px);
  }
</style>
