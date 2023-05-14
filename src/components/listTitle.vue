<template>
  <div
    v-if="themeColor != []"
    class="position-fixed top-0 w-100 d-flex align-items justify-content-between ps-3 pe-3 bg-body"
    :style="[{ '--bs-body-bg-rgb': themeColor }, { '--bs-bg-opacity': 0 }]">
    <div><span>箭头</span><span>歌单</span></div>
    <div><span>问号</span><span>更多</span></div>
  </div>
</template>
<script>
  export default {
    props: ["themeColor", "opacity"],
    updated() {
      console.log(this.themeColor); //=>
    },
  };
</script>
