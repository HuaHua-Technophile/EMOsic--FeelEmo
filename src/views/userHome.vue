<template>
  <div
    ref="mineView"
    class="mine-view w-100 h-100 position-relative"
    :class="[{ 'h-miniPlayer': miniPlayerStatus }]">
    <!-- 顶栏,绝对定位在顶部 -->
    <div
      class="w-100 position-absolute top-0 start-0 d-flex justify-content-between pt-4 ps-3 pe-3 z-3">
      <!-- 左侧返回 -->
      <i class="bi bi-chevron-left fs-2" @click="goBack()"></i>
      <!-- 右侧放大镜进入搜索 -->
      <i class="bi bi-search fs-3"></i>
    </div>
    <!-- 个人背景 -->
    <div class="position-absolute z-n1 w-100 overflow-hidden">
      <img
        v-if="user"
        :src="`${user.profile.backgroundUrl}?param=x300y300`"
        class="w-100" />
    </div>
    <!-- 滚动内容 -->
    <div class="mine-content position-relative z-1" style="min-height: 130vh">
      <!-- 个人信息栏 -->
      <div
        class="mine-info pt-5 pb-3 mb-3 ms-3 me-3 rounded-3 position-relative">
        <!-- 头像框 -->
        <div
          class="mine-avatar position-absolute top-0 start-50 translate-middle bg-dark-subtle rounded-pill overfliw-hidden d-flex justify-content-center align-items-center">
          <!-- 已登录头像 -->
          <img
            v-if="user"
            class="w-100 h-100 rounded-pill"
            :src="`${user.profile.avatarUrl}?param=x100y100`" />
          <!-- 未登录时的头像 -->
          <div v-else class="">EMO</div>
        </div>
        <!-- 已登录后的用户名栏 -->
        <div
          v-if="user"
          class="d-flex justify-content-center align-items-center">
          <div class="fs-5 me-2">{{ user.profile.nickname }}</div>
          <!-- VIP标签 -->
          <img
            v-if="VIPdynamicIconUrl"
            class="VipDynamicIcon"
            :src="`${VIPdynamicIconUrl}`" />
          <!-- 歌单达人标签 -->
          <img
            v-if="user.profile.avatarDetail"
            :src="user.profile.avatarDetail.identityIconUrl"
            class="identityIconUrl" />
        </div>
        <!-- 未登录时的用户名栏 -->
        <div v-else class="text-center" @click="toLoginRegistration()">
          立即登录,畅享EMO时光~
        </div>
        <!-- 已登录后的关注/粉丝 -->
        <div v-if="user" class="text-center fs-7 followInfo">
          <span class="opacity-50">{{ user.profile.follows }}关注</span>
          <span class="opacity-50">{{ user.profile.followeds }}粉丝</span>
        </div>
        <!-- 已登录后的用户标签 -->
        <div v-if="user" class="userTag text-center fs-8" style="">
          <span>IP属地:{{ ip }}</span>
          <!-- 性别\年龄\星座 -->
          <span>
            <i v-if="user.profile.gender == 1" class="bi bi-gender-male"></i>
            <i v-else class="bi bi-gender-female"></i>
            <span>{{ birthdayYear }}</span>
            <span>{{ constellation }}</span>
          </span>
        </div>
      </div>
      <!-- 个人歌单栏 -->
      <div class="p-3 bg-body-secondary rounded">
        <div v-if="user" class="d-flex align-items-center">
          <square-card size="50px">
            <template #img></template>
          </square-card>
          我喜欢的音乐
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getLoginStatus, getUserDetail } from "@/api/getData.js";
  import BScroll from "@better-scroll/core"; //Better scroll引入
  import { mapMutations, mapState } from "vuex";
  import { getVipInfo } from "../api/getData";
  import cityList from "../assets/cities.json";
  export default {
    data() {
      return {
        userId: null, //用户id
        user: null, //用户信息
        VIPdynamicIconUrl: null, //VIP标签的图片地址
        isMe: true, //是否进入了我的主页，以此展示登录、设置等。
        bs: null, //Better scroll实例化对象
        ip: null, //IP地址
        birthday: null, //用户生日
        birthdayYear: null, //用户出生年份
        constellation: null, //用户星座
      };
    },
    // 计算属性
    computed: {
      ...mapState(["miniPlayerStatus"]),
    },
    // 方法
    methods: {
      ...mapMutations(["miniPlayerHidden"]),
      // 未登录状态下点击跳转登陆页面
      toLoginRegistration() {
        this.$router.push({
          name: "login",
        });
        this.miniPlayerHidden();
      },
      // 左上角返回
      goBack() {
        this.$router.go(-1);
      },
      // 星座判断
      getConstellation(month, day) {
        switch (month) {
          case "01":
            if (day > 19) {
              return "水瓶座";
            } else return "摩羯座";
          case "02":
            if (day > 18) {
              return "双鱼座";
            } else return "水瓶座";
          case "03":
            if (day > 20) {
              return "白羊座";
            } else return "双鱼座";
          case "04":
            if (day > 19) {
              return "金牛座";
            } else return "白羊座";
          case "05":
            if (day > 20) {
              return "双子座";
            } else return "金牛座";
          case "06":
            if (day > 21) {
              return "巨蟹座";
            } else return "双子座";
          case "07":
            if (day > 22) {
              return "狮子座";
            } else return "巨蟹座";
          case "08":
            if (day > 22) {
              return "处女座";
            } else return "狮子座";
          case "09":
            if (day > 22) {
              return "天秤座";
            } else return "处女座";
          case "10":
            if (day > 23) {
              return "天蝎座";
            } else return "天秤座";
          case "11":
            if (day > 20) {
              return "射手座";
            } else return "天蝎座";
          case "12":
            if (day > 21) {
              return "摩羯座";
            } else return "射手座";
        }
      },
    },
    // 创建后生命周期
    async created() {
      // 若没有传参，则进入个人主页。若传参，则进入他人主页，对应两套不同的渲染逻辑
      if (this.$route.query.id) {
        this.isMe = false;
        this.user = await getUserDetail(this.$route.query.id);
        this.userId = this.user.userPoint.userId;
      } else {
        let res = await getLoginStatus();
        this.userId = res.data.account.id;
        this.user = await getUserDetail(this.userId);
      }
      console.log(this.user);
      let VipInfo = await getVipInfo();
      this.VIPdynamicIconUrl = VipInfo.data.associator.dynamicIconUrl;
      cityList.forEach((i) => {
        if (i.code == (this.user.profile.city + "").slice(0, 4))
          this.ip = i.name;
      });
      this.birthday = new Date(this.user.profile.birthday);
      this.birthdayYear =
        (this.birthday.getFullYear() + "").slice(2, 3) + "0后";
      this.constellation = this.getConstellation(
        this.birthday.getMonth() + 1,
        this.birthday.getDate()
      );
    },
    // 挂载后生命周期
    mounted() {
      this.bs = new BScroll(this.$refs.mineView, {
        click: true,
        specifiedIndexAsContent: 2, // 使用第3个元素作为滚动内容
      });
    },
  };
</script>
<style lang="scss">
  .mine-info {
    margin-top: -15px;
    background: linear-gradient(var(--bs-secondary-bg) 15px, transparent);
  }
  .mine-avatar {
    width: 75px;
    height: 75px;
  }
  .mine-content {
    padding-top: 100vw;
  }
  .VipDynamicIcon {
    height: 20px;
    border-radius: 999px;
  }
  .identityIconUrl {
    width: 21px;
  }
  .followInfo {
    & > span:not(:last-child) {
      margin-right: 18px;
      position: relative;
      &::after {
        content: "";
        display: block;
        height: 90%;
        width: 1px;
        position: absolute;
        right: -10px;
        top: 5%;
        background: var(--bs-secondary-bg);
      }
    }
  }
  .userTag {
    & > span {
      padding: 3px 4px;
      border-radius: 5px;
      background: rgba(127, 127, 127, 0.2);
    }
  }
</style>
