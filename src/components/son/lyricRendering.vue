<template>
  <div ref="wrapper" class="lycWrapper overflow-hidden">
    <div ref="content" class="lycContent ps-4 pe-4">
      <p
        ref="lrc"
        v-for="(item, index) in lyric.lines"
        :key="index"
        class="lyricItem transition-8"
        :class="[{ 'text-white fs-4 fw-bold': index == lineNum }]"
        @click="$emit('lrcSetTime', item.time)">
        {{ item.txt }}
      </p>
    </div>
  </div>
</template>
<script>
  import BScroll from "@better-scroll/core";
  import Lyric from "../../../node_modules/lyric-parser/src/index.js"; //歌词处理工具
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
        scrollNow: true,
        timeIdList: [],
      };
    },
    // 计算属性
    computed: {
      ...mapGetters(["playSongId"]),
    },
    // 方法
    methods: {
      // 歌词加载
      async renderLrc() {
        let res = await getLyric(this.playSongId);
        this.lyric = new Lyric(res.lrc.lyric, this.handler);
        console.log("歌词", this.lyric);
        // 切歌后,歌词重载,重新计算Better scroll
        this.$nextTick(() => {
          this.bs.refresh();
        });
      },
      // 歌词当前激活行变更时，触发的回调函数
      handler({ lineNum }) {
        this.lineNum = lineNum;
      },
      // 初始化Better Scroll
      initBS() {
        this.bs = new BScroll(this.$refs.wrapper, {
          click: true, //允许点击事件
        });
        // 但触摸结束后,设置3.5秒的冷却期,冷却期内无法通过时间监听器自动滚动歌词.方便用户查看歌词
        this.bs.scroller.actionsHandler.hooks.on("end", () => {
          this.scrollNow = false;
          this.timeIdList.push(
            setTimeout(() => {
              this.scrollNow = true;
            }, 3500)
          );
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
        if (this.lyric.lines.length > 0) {
          this.lyric.seek(newV * 1000);
          this.lyric.stop();
        }
      },
      lineNum(newV) {
        if (this.scrollNow)
          this.bs.scrollToElement(this.$refs.lrc[newV - 1], 800);
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
    //销毁前生命周期，清除定时器
    beforeDestroy() {
      this.timeIdList.forEach((item) => {
        clearTimeout(item);
      });
    },
  };
</script>
<style lang="scss">
  .lycContent {
    min-height: 101%;
  }
  .lyricItem {
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
</style>
