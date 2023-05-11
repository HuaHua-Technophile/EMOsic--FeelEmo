<template>
  <div class="w-100 h-100">
    <router-view></router-view>
    <nav
      class="ps-3 pe-3 w-100 position-fixed bottom-0 nav justify-content-between">
      <a class="nav-link active" aria-current="page" href="#">发现</a>
      <a class="nav-link" href="#">播客</a>
      <a class="nav-link" href="#">我的</a>
      <a class="nav-link" href="#">关注</a>
      <a class="nav-link" href="#" @click="changeGlobalTheme()">云村</a>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        globalTheme: "dark",
      };
    },
    methods: {
      changeGlobalTheme() {
        if (this.globalTheme === "dark") {
          this.globalTheme = "light";
          document.documentElement.dataset.bsTheme = "light";
        } else {
          this.globalTheme = "dark";
          document.documentElement.dataset.bsTheme = "dark";
        }
      },
    },
  };
</script>

<style lang="sass"></style>
