<template>
  <!-- vue实例外创建 -->
  <div class="position-relative">
    <transition-group
      name="slideUp"
      tag="div"
      class="pb-100 position-relative overflow-hidden">
      <div
        v-for="i in 3"
        v-show="i - 1 == index"
        :key="i"
        class="w-100 position-absolute rounded-3 overflow-hidden">
        <img
          :src="item.resources[i - 1].uiElement.image.imageUrl"
          class="w-100" />
      </div>
    </transition-group>
    <!-- 右上角图标 -->
    <i
      class="bi bi-infinity position-absolute end-0 fs-2 me-2 t-shadow-3 text-light"></i>
    <span class="van-multi-ellipsis--l2">{{
      item.resources[index].uiElement.mainTitle.title
    }}</span>
  </div>
</template>
<script>
  export default {
    props: ["item"],
    data() {
      return {
        index: 0,
        timeid: null,
      };
    },
    mounted() {
      this.timeid = setInterval(() => {
        this.index++;
        this.index >= this.item.resources.length && (this.index = 0);
      }, 5000);
    },
  };
</script>
<style lang="scss" scoped>
  .slideUp-enter-active,
  .slideUp-leave-active {
    transition: all 0.8s;
  }
  .slideUp-enter {
    transform: translateY(70%) scale(0.8);
    opacity: 0.3;
  }
  .slideUp-leave-to {
    transform: translateY(-100%) scale(0.8);
    opacity: 0;
  }
  .bi.bi-infinity {
    top: -3px;
  }
</style>
