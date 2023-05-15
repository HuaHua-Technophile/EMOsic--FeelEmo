<template>
  <div class="w-100 vh-100 noScrollBar">
    <transition name="view">
      <router-view :Theme="Theme" @changeTheme="changeTheme"></router-view>
    </transition>
    <nav
      v-if="navBar"
      class="pt-1 w-100 bg-body position-fixed nav justify-content-around"
      style="bottom: -1px; z-index: 99">
      <router-link class="nav-link" to="/find">
        <span class="iconfont icon-netease-cloud-music-line"></span>
        <span>发现</span>
      </router-link>
      <router-link class="nav-link" to="/podcast">
        <i class="bi bi-broadcast"></i><span>播客</span>
      </router-link>
      <router-link class="nav-link" to="/mine">
        <i class="bi bi-music-note-beamed"></i><span>我的</span>
      </router-link>
      <router-link class="nav-link" to="/follow">
        <span class="iconfont icon-guanzhu"></span><span>关注</span>
      </router-link>
      <router-link class="nav-link" to="/cloudVillage">
        <span class="iconfont icon-taolunqu"></span><span>云村</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        Theme: "dark",
        navBar: true,
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
<style lang="scss" scoped>
  .nav-link {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--bs-secondary-color);
    > *:nth-child(1) {
      width: 30px;
      height: 30px;
      transition: all 0.5s;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > *:nth-child(2) {
      transition: all 0.5s;
      font-size: 12px;
    }
    &.router-link-active {
      > *:nth-child(1) {
        background: var(--bs-red);
        border-radius: 999999px;
        color: var(--bs-light);
        font-size: 23px;
      }
      > *:nth-child(2) {
        color: var(--bs-red);
      }
    }
  }
  .view-enter-active,
  .view-leave-active {
    transition: all 0.5s;
  }
  .view-enter,
  .view-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
</style>
