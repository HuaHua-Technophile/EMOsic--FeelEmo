<template>
  <div ref="father" @touchend="scrollOccupy()" @touchmove="bgScale($event)">
    <!-- 背景遮罩层 -->
    <img
      v-if="OccupyBgImg"
      ref="OccupyBgImg"
      :src="OccupyBgImg"
      class="OccupyBgImg position-absolute w-100 object-fit-cover z-n1"
      :style="[
        { height: `${height}px` },
        { transform: `scale(${OccupyBgImgScale})` },
      ]" />
    <div class="position-relative z-3">
      <!-- 下拉占位元素,对占位元素做监听 -->
      <div ref="Occupy" class="Occupy" :style="{ height: `${height}px` }"></div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import throttle from "lodash/throttle.js"; //lodash的节流,按需引入
  import ColorThief from "colorthief"; //自动计算颜色组件
  export default {
    props: ["OccupyBgImg", "height"],
    data() {
      return {
        timeIdList: [],
        OccupyBgImgScale: 1,
      };
    },
    methods: {
      // 背景图跟随拖动缩放
      bgScale: throttle(function () {
        if (this.$refs.father.scrollTop < this.height) {
          this.OccupyBgImgScale =
            1 + 0.5 * (1 - this.$refs.father.scrollTop / this.height);
        }
      }, 100),
      // 隐藏占位移至顶部,恢复图片尺寸
      scrollOccupy() {
        if (this.$refs.father.scrollTop < this.height) {
          this.$refs.father.scrollTo({
            top: this.height,
            behavior: "smooth",
          });
        }
        this.timeIdList.push(
          setTimeout(() => {
            this.OccupyBgImgScale = 1;
          }, 100)
        );
      },
    },
    //监听器
    watch: {
      // 监听传入的头部背景图片地址,计算主题色
      OccupyBgImg(newval) {
        if (newval != "") {
          let colorThief = new ColorThief();
          let img = new Image();
          img.crossOrigin = "Anonymous"; //允许对未经过验证的图像进行跨源下载
          img.src = newval;
          this.timeIdList.push(
            setTimeout(() => {
              this.$refs.father.setAttribute(
                "style",
                `--bs-body-bg:rgb(${colorThief.getColor(img)});`
              );
            }, 300) //加定时器才不报错
          );
        }
      },
    },
    // 挂载后
    mounted() {
      this.OccupyHeight = this.$refs.Occupy.offsetHeight;
      //页面初始化后滚动到上方,隐藏占位元素
      this.timeIdList.push(
        setTimeout(() => {
          this.$refs.father.scroll(0, this.OccupyHeight);
        }, 100)
      );
    },
    // 销毁前,清除定时器
    beforeDestroy() {
      this.timeIdList.forEach((id) => clearTimeout(id));
    },
  };
</script>
<style lang="scss" scoped>
  .OccupyBgImg {
    transition: all 0.15s;
  }
  .Occupy {
    background: linear-gradient(90deg, pink, transparent);
  }
</style>
