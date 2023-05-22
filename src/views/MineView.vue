<template>
  <div
    class="mine-view w-100 ps-3 pe-3 position-relative"
    :class="miniPlayerStatus ? 'h-miniPlayer' : 'h-navBar'">
    <!-- 顶栏 -->
    <div
      class="mine-search w-100 position-fixed top-0 start-0 d-flex justify-content-between pt-4 ps-3 pe-3 z-3">
      <!-- 左侧展开 -->
      <font-awesome-icon :icon="['fas', 'bars']" size="xl" />
      <!-- 右侧放大镜 -->
      <i class="bi bi-search fs-3"></i>
    </div>
    <!-- 个人信息栏 -->
    <div
      class="mine-info rounded-3 bg-body-secondary pt-5 pb-3 position-relative">
      <!-- 头像框 -->
      <div
        class="mine-avatar position-absolute top-0 start-50 translate-middle bg-dark-subtle rounded-pill overfliw-hidden d-flex justify-content-center align-items-center">
        <!-- 已登录头像 -->
        <img v-if="isLogged" class="w-100 h-100" src="" />
        <!-- 未登录时的头像 -->
        <div v-else class="">EMO</div>
      </div>
      <!-- 已登录后的状态 -->
      <div v-if="isLogged"></div>
      <!-- 未登录时的状态 -->
      <div v-else class="text-center" @click="toLoginRegistration()">
        立即登录,畅享EMO时光~
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations, mapState } from "vuex";
  export default {
    props: ["Theme"],
    // 计算属性
    computed: {
      ...mapState(["miniPlayerStatus", "isLogged"]),
    },
    // 方法
    methods: {
      ...mapMutations(["navBarHidden", "miniPlayerHidden"]),
      toLoginRegistration() {
        this.$router.push({
          name: "login",
        });
        this.navBarHidden();
        this.miniPlayerHidden();
      },
    },
  };
</script>
<style lang="scss">
  .mine-info {
    margin-top: 100px;
  }
  .mine-avatar {
    width: 75px;
    height: 75px;
  }
</style>
