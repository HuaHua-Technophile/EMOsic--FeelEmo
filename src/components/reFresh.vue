<template>
  <div
    ref="father"
    @touchend="scrollOccupy()"
    @scroll="bgScale()"
    class="reFresh noScrollBar w-100 overflow-x-hidden overflow-y-scroll"
    style="max-width: 100vw"
    :style="`--bs-body-bg-rgb:${themeColor}`">
    <!-- 背景遮罩层 -->
    <div
      v-if="OccupyBgImg"
      class="w-100 overflow-hidden position-absolute z-1"
      :style="[{ height: `${height - 1}px` }]">
      <img
        ref="OccupyBgImg"
        :src="`${OccupyBgImg}?param=x415y336`"
        class="w-100" />
    </div>
    <div class="position-relative z-3 w-100">
      <!-- 下拉占位元素,对占位元素做监听 -->
      <div ref="Occupy" :style="{ height: `${height}px` }"></div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import throttle from "lodash/throttle.js"; //lodash的节流,按需引入
  export default {
    props: ["OccupyBgImg", "height", "themeColor"],
    data() {
      return {
        timeIdList: [],
      };
    },
    methods: {
      // 背景图跟随拖动缩放
      bgScale: throttle(function () {
        if (this.$refs.father.scrollTop < this.height) {
          this.$refs.OccupyBgImg.style.transform = `scale(${
            1 + 0.5 * (1 - this.$refs.father.scrollTop / this.height)
          })`;
        }
      }, 30),
      // 隐藏占位移至顶部,并且恢复图片尺寸
      scrollOccupy() {
        if (this.$refs.father.scrollTop < this.height) {
          this.$refs.father.scrollTo({
            top: this.height + 1,
            behavior: "smooth",
          });
        }
        this.timeIdList.push(
          setTimeout(() => {
            if (this.$refs.OccupyBgImg)
              this.$refs.OccupyBgImg.style.transform = `scale(1)`;
          }, 100)
        );
      },
    },
    mounted() {
      this.timeIdList.push(
        setTimeout(() => {
          this.$refs.father.scrollTo({
            top: this.height + 1,
            behavior: "smooth",
          });
        }, 400)
      );
    },
    // 销毁前,清除定时器
    beforeDestroy() {
      this.timeIdList.forEach((id) => clearTimeout(id));
    },
  };
</script>
<style lang="scss">
  .reFresh {
    height: calc(100vh - var(--b-nav-h));
    > img {
      transition: all 0.2s;
    }
    > div > div:last-child {
      min-height: calc(100vh - var(--b-nav-h));
    }
  }
</style>
