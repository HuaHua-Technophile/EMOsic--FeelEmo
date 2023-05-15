<template>
  <div
    class="squareCardShadow position-relative"
    :style="[{ width: size }, { paddingBottom: size }]">
    <div
      class="squareCard position-absolute top-0 start-0 bottom-0 end-0 rounded-3 overflow-hidden">
      <div
        class="position-absolute top-0 w-100 d-flex justify-content-end align-items-center pe-2">
        <slot name="playCount"></slot>
      </div>
      <slot name="img"></slot>
      <div class="position-absolute">
        <slot name="playIcon"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["size"],
  };
</script>
<style lang="scss">
  .squareCard {
    > img {
      width: 100%;
      height: 100%;
    }
    > div:first-child {
      height: 20%;
      background: linear-gradient(rgba(0, 0, 0, 0.5), transparent);
    }
    > div:last-child {
      bottom: 0;
      right: 0;
    }
    > div > * {
      color: var(--bs-light) !important;
      text-shadow: 1px 1px 4px black;
    }
  }
  .squareCardShadow::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    width: 85%;
    height: 10%;
    border-radius: 999px;
    background: rgba(var(--bs-body-color-rgb), 0.07);
    transform: translate(-50%, -30%);
  }
</style>
