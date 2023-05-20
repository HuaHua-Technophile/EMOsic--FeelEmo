<template>
  <div></div>
</template>
<script>
  import Lyric from "../../../node_modules/lyric-parser/dist/lyric.js"; //歌词处理工具
  import { getLyric } from "@/api/getData"; //异步数据获取
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        lyric: {
          lines: [],
        },
      };
    },
    // 计算属性
    computed: {
      ...mapGetters(["playSongId"]),
    },
    // 方法
    methods: {
      async renderLrc() {
        let handler = function (obj) {
          console.log(obj);
          // this hanlder called when lineNum change
        };
        let res = await getLyric(this.playSongId);
        this.lyric = new Lyric(res.lrc.lyric, handler);
      },
    },
    // 监听器
    watch: {
      playSongId(val) {
        if (val != -1) {
          this.renderLrc();
        }
      },
    },
  };
</script>
