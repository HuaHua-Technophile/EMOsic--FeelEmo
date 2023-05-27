<template>
  <!-- 列表主体 -->
  <div
    class="t-shadow-3 bg-body pt-3 transition-2"
    :style="[{ '--bs-bg-opacity': listOpacity }]">
    <div
      v-for="(item, index) in detailList"
      :key="index"
      class="d-flex align-items-center text-light pb-3"
      :style="`--bg-`">
      <!-- 歌曲Item左侧信息：序列、歌名、标签、歌手、专辑 -->
      <div
        @click="playThisSong(index)"
        class="flex-grow-1 d-flex align-items-center overflow-hidden">
        <!-- 序号 -->
        <span class="songItemIndex opacity-50 text-center flex-shrink-0">{{
          index + 1
        }}</span>
        <!-- 具体信息 -->
        <div class="flex-grow-1">
          <!-- 歌曲名 -->
          <div
            class="transition-8"
            :class="[{ 'text-danger': item.id == playSongId }]">
            {{ item.name }}
            <span v-if="item.tns" class="opacity-50">{{ item.tns }}</span>
          </div>
          <!-- 作者及音频码率标签 -->
          <div class="d-flex align-items-center">
            <span
              v-if="item.fee == 1 || item.fee == 4"
              class="InfoTag text-warning border border-warning d-flex align-items-center"
              >VIP</span
            >
            <span
              v-if="item.hr"
              class="InfoTag text-danger border border-danger d-flex align-items-center"
              >Hi·Res</span
            >
            <span
              v-else-if="item.sq"
              class="InfoTag text-danger border border-danger d-flex align-items-center"
              >SQ</span
            >
            <!-- 歌手信息 -->
            <div class="fs-8 opacity-50 text-nowrap">
              <span v-for="(j, indexs) in item.ar" :key="indexs"
                ><span>{{ j.name }}</span
                ><span v-if="indexs != item.ar.length - 1">/</span></span
              >
            </div>
            <!-- 专辑信息 -->
            <div v-if="item.al" class="fs-8 opacity-50 text-nowrap">
              <span class="ms-1 me-1">-</span>{{ item.al.name }}
            </div>
          </div>
        </div>
      </div>
      <!-- 歌曲Item右侧信息：是否有mv，更多标签 -->
      <div class="flex-shrink-0 opacity-50">
        <div class="d-flex align-items-center">
          <i v-if="item.mv != 0" class="bi bi-play-btn fs-5 me-4"></i>
          <i class="bi bi-three-dots-vertical fs-4 me-3"></i>
        </div>
      </div>
    </div>
    <div v-if="loadFinish" class="text-center fs-8">没有更多啦...</div>
    <div v-else class="text-center">
      <div v-show="isPullUpLoad">加载中...</div>
      <div v-show="!isPullUpLoad">松手加载</div>
    </div>
  </div>
</template>
<script>
  import { mapMutations, mapGetters } from "vuex";
  export default {
    props: ["detailList", "loadFinish", "isPullUpLoad", "listOpacity"],
    // 计算属性
    computed: {
      ...mapGetters(["playSongId"]),
    },
    methods: {
      ...mapMutations(["setSongList", "setPlayIndex"]),
      // 歌单列表点击播放选定歌曲
      playThisSong(index) {
        this.$emit("songList");
        this.setPlayIndex(index);
      },
    },
  };
</script>
