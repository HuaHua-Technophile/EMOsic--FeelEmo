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
    :themeColor="themeColor"
    class="reFresh overflow-x-hidden overflow-y-scroll bg-body">
    <div>
      <list-search
        v-if="themeColor != []"
        :themeColor="LightenDarkenColor(themeColor, 30)"
        :title="'歌单'"></list-search>
      <div
        class="w-100"
        style="height: 150vh"
        :style="`--bs-body-bg-rgb:${themeColor}`"></div>
    </div>
  </re-fresh>
</template>
<script>
  import { getPlayListDetail } from "../../api/getData.js";
  import ColorThief from "colorthief"; //自动计算颜色组件
  export default {
    props: ["Theme"],
    data() {
      return {
        coverImgUrl: "",
        OccupyHeight: window.screen.height / 4,
        themeColor: [],
      };
    },
    methods: {
      // 颜色混入
      LightenDarkenColor(RGB, v) {
        return RGB.map((i) => (i + v > 255 ? 255 : i + v < 0 ? 0 : i + v));
      },
    },
    // 生命周期
    async created() {
      //获取歌单详情页数据
      await getPlayListDetail(this.$route.query.id).then((res) => {
        this.coverImgUrl = res.playlist.coverImgUrl;
        let colorThief = new ColorThief();
        let img = new Image();
        img.crossOrigin = "Anonymous"; //允许对未经过验证的图像进行跨源下载
        img.src = this.coverImgUrl;
        img.onload = () => {
          this.themeColor = colorThief.getColor(img);
        };
      });
    },
  };
</script>
<style lang="scss">
  .reFresh {
    height: calc(100vh - var(--b-nav-h));
  }
</style>
