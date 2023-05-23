<template>
  <div
    class="mine-view w-100 h-100 ps-3 pe-3 position-relative"
    :class="[{ 'h-miniPlayer': miniPlayerStatus }]">
    <!-- 顶栏 -->
    <div
      class="mine-search w-100 position-fixed top-0 start-0 d-flex justify-content-between pt-4 ps-3 pe-3 z-3">
      <!-- 左侧返回 --><i class="bi bi-chevron-left fs-2" @click="goBack()"></i>
      <!-- 右侧放大镜进入搜索 -->
      <i class="bi bi-search fs-3"></i>
    </div>
    <!-- 个人信息栏 -->
    <div
      class="mine-info rounded-3 bg-body-secondary pt-5 pb-3 position-relative">
      <!-- 头像框 -->
      <div
        class="mine-avatar position-absolute top-0 start-50 translate-middle bg-dark-subtle rounded-pill overfliw-hidden d-flex justify-content-center align-items-center">
        <!-- 已登录头像 -->
        <img
          v-if="isLogged"
          class="w-100 h-100 rounded-pill"
          :src="`${userInfo.profile.avatarUrl}?param=x100y100`" />
        <!-- 未登录时的头像 -->
        <div v-else class="">EMO</div>
      </div>
      <!-- 已登录后的状态 -->
      <div
        v-if="isLogged"
        class="d-flex justify-content-center align-items-center">
        <div class="fs-5 me-2">{{ userInfo.profile.nickname }}</div>
        <img class="VipDynamicIcon" :src="`${redVipDynamicIconUrl}`" />
      </div>
      <!-- 未登录时的状态 -->
      <div v-else class="text-center" @click="toLoginRegistration()">
        立即登录,畅享EMO时光~
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getUserAccount,
    getVipInfo,
    // getUserFolloweds,
  } from "@/api/getData.js";
  import { mapGetters, mapMutations, mapState } from "vuex";
  export default {
    props: ["Theme"],
    data() {
      return {
        userProfile: null,
        redVipDynamicIconUrl: null,
      };
    },
    // 计算属性
    computed: {
      ...mapState(["miniPlayerStatus", "isLogged", "userInfo"]),
      ...mapGetters(["isLogged"]),
    },
    // 方法
    methods: {
      ...mapMutations(["miniPlayerHidden", "setUserInfo"]),
      // 未登录状态下点击跳转登陆页面
      toLoginRegistration() {
        this.$router.push({
          name: "login",
        });
        this.miniPlayerHidden();
      },
      // 返回
      goBack() {
        this.$router.go(-1);
      },
    },
    // 创建后生命周期
    async created() {
      let UserAccount = await getUserAccount();
      this.setUserInfo(UserAccount);
      let VipInfo = await getVipInfo();
      this.redVipDynamicIconUrl = VipInfo.data.redVipDynamicIconUrl;
      /* let userFans = await getUserFolloweds(this.userInfo.profile.userId);
      console.log(userFans); */
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
  .VipDynamicIcon {
    height: 20px;
    border-radius: 999px;
  }
</style>
