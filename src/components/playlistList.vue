<template>
  <div class="pt-3">
    <div
      v-for="(i, index) in detailList"
      :key="index"
      @click="$router.push({ name: 'playListDetail', query: { id: i.id } })"
      class="pb-3 d-flex align-items-center">
      <!-- 歌单封面 -->
      <img :src="`${i.coverImgUrl}?param=70y70`" class="me-2 rounded" />
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
  </div>
</template>
<script>
  import heightLight from "@/tool/heightLight";
  import { mapState } from "vuex";
  export default {
    props: ["detailList"],
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
