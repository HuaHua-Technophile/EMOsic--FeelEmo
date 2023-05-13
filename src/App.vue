<template>
  <div class="w-100 vh-100 overflow-hidden">
    <router-view :Theme="Theme"></router-view>
    <nav
      class="ps-3 pe-3 w-100 position-fixed bottom-0 nav justify-content-between">
      <a class="nav-link active" aria-current="page" href="#">发现</a>
      <a class="nav-link" href="#">播客</a>
      <a class="nav-link" href="#">我的</a>
      <a class="nav-link" href="#">关注</a>
      <a class="nav-link" href="#" @click="changeTheme()">云村</a>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Theme: "dark",
      };
    },
    methods: {
      //切换全局主题
      changeTheme() {
        if (this.Theme === "dark") {
          this.Theme = "light";
          document.documentElement.dataset.bsTheme = "light";
        } else {
          this.Theme = "dark";
          document.documentElement.dataset.bsTheme = "dark";
        }
      },
    },
  };
</script>
