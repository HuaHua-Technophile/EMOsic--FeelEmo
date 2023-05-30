<template>
  <div class="pt-3">
    <!-- 列表item -->
    <div
      v-for="(i, index) in detailList"
      :key="index"
      @click="$router.push({ name: 'playListDetail', query: { id: i.id } })"
      class="pb-3 d-flex align-items-center">
      <!-- 歌单封面 -->
      <img
        :src="`${i.coverImgUrl}?param=70y70`"
        class="me-3 rounded"
        style="width: 70px; height: 70px" />
      <!-- 歌曲信息 -->
      <div class="flex-shrink-1 overflow-hidden">
        <div v-html="heightLight(i.name, kw)" class="van-ellipsis"></div>
        <div class="fs-8 opacity-50">
          {{ i.trackCount }}首, by
          <span v-html="heightLight(i.creator.nickname, kw)"></span>, 播放{{
            i.playCount | ConUnit
          }}次
        </div>
      </div>
    </div>
    <!-- 懒加载提示 -->
    <div v-if="!hiddenLazyLoad">
      <div v-if="loadFinish" class="text-center fs-8">没有更多啦...</div>
      <div v-else class="text-center">
        <div v-show="isPullUpLoad">加载中...</div>
        <div v-show="!isPullUpLoad">松手加载</div>
      </div>
    </div>
  </div>
</template>
<script>
  import heightLight from "@/tool/heightLight";
  import { mapState } from "vuex";
  export default {
    props: ["detailList", "loadFinish", "isPullUpLoad", "hiddenLazyLoad"],
    // 计算属性
    computed: {
      ...mapState(["kw"]),
    },
    // 方法
    methods: {
      heightLight,
    },
  };
</script>
