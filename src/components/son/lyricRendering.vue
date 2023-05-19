<template>
  <div></div>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        Lrc: null,
      };
    },
    // 计算属性
    computed: {
      ...mapGetters(["playSongId"]),
    },
    // 创建后生命周期
    created() {
      this.Lrc = this.playSongId;
    },
  };
</script>
