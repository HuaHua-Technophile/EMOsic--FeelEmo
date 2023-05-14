<template>
  <!-- <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh()">
      下拉提示，通过 scale 实现一个缩放效果
      <template #pulling="">
        <img
          src="https://img01.yzcdn.cn/vant/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }" />
        <div></div>
      </template>
      释放提示
      <template #loosing>
        <img src="https://img01.yzcdn.cn/vant/doge.png" />
        <div></div>
      </template>
      加载提示
      <template #loading>
        <img src="https://img01.yzcdn.cn/vant/doge.png" />
        <div></div>
      </template>
      <div
        class="w-100"
        style="background: linear-gradient(pink, blue); height: 200vh"></div>
    </van-pull-refresh>
  </div> -->
  <re-fresh
    :Theme="Theme"
    :OccupyBgImg="coverImgUrl"
    :height="OccupyHeight"
    class="reFresh overflow-x-hidden overflow-y-scroll">
    <div>
      <div class="position-fixed top-0 w-100 p-3 bg-danger opacity-50"></div>
      <div class="w-100 bg-info" style="height: 150vh"></div>
    </div>
  </re-fresh>
</template>
<script>
  import { getPlayListDetail } from "../../api/getData.js";
  export default {
    props: ["Theme"],
    data() {
      return {
        coverImgUrl: "",
        OccupyHeight: window.screen.height / 4,
      };
    },
    methods: {},
    async created() {
      //获取歌单详情页数据
      await getPlayListDetail(this.$route.query.id).then((res) => {
        this.coverImgUrl = res.playlist.coverImgUrl;
      });
    },
  };
</script>
<style lang="scss" scoped>
  .reFresh {
    height: calc(100vh - 52px);
  }
</style>
