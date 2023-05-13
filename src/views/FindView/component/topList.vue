<template>
  <div class="cardHr pt-2 pb-3" :class="Theme">
    <!-- title信息栏 -->
    <card-title :data="data.uiElement" :Theme="Theme"></card-title>
  </div>
</template>
<script>
  export default {
    props: ["Theme", "data"],
  };
</script>
<style lang="scss" scoped></style>
