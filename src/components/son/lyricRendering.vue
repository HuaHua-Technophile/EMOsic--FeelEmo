<template>
  <div ref="wrapper" class="lycWrapper overflow-hidden">
    <div ref="content" class="lycContent">
      <p v-for="(item, index) in lyric.lines" :key="index" class="text-center">
        {{ item.txt }}
      </p>
    </div>
  </div>
</template>
<script>
  import BScroll from "@better-scroll/core";
  import Lyric from "../../../node_modules/lyric-parser/dist/lyric.js"; //歌词处理工具
  import { getLyric } from "@/api/getData"; //异步数据获取
  import { mapGetters } from "vuex";
  export default {
    name: "lyricRendering",
    props: ["currentTime", "isPlaying"],
    data() {
      return {
        lyric: {
          lines: [],
        },
        lineNum: 0,
        bs: {},
      };
    },
    // 计算属性
    computed: {
      ...mapGetters(["playSongId"]),
    },
    // 方法
    methods: {
      async renderLrc() {
        let res = await getLyric(this.playSongId);
        this.lyric = new Lyric(res.lrc.lyric, this.handler);
        console.log("返回值", this.lyric);
        this.$nextTick(() => {
          this.bs.refresh();
        });
      },
      handler({ lineNum }) {
        // this hanlder called when lineNum change
        this.lineNum = lineNum;
      },
      initBS() {
        this.bs = new BScroll(this.$refs.wrapper, {
          // ...... 详见配置项
        });
      },
    },
    // 监听器
    watch: {
      playSongId(newV) {
        if (newV != -1) {
          this.renderLrc();
        }
      },
      currentTime(newV) {
        this.lyric.seek(newV * 1000);
        this.lyric.stop();
      },
      lineNum(newV) {
        console.log(newV);
      },
    },
    // 创建前生命周期
    created() {
      this.renderLrc();
    },
    // 挂载后生命周期
    mounted() {
      this.initBS();
    },
  };
</script>
<style lang="scss">
  .lycContent {
    min-height: 101%;
  }
</style>
