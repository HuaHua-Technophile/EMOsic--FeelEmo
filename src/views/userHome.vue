<template>
  <div ref="userHome" class="userHomeView w-100 h-100 position-relative">
    <!-- 滚动内容 -->
    <div
      class="mine-content overflow-hidden position-relative z-1"
      :class="[{ 'h-miniPlayer': miniPlayerStatus }]"
      style="min-height: 101vh">
      <!-- 个人信息栏/头像 -->
      <div
        class="mine-info pt-5 pb-3 mb-4 ms-3 me-3 rounded-3 position-relative">
        <!-- 头像框 -->
        <div
          class="mine-avatar position-absolute top-0 start-50 translate-middle bg-dark-subtle rounded-pill overfliw-hidden d-flex justify-content-center align-items-center">
          <!-- 已登录头像 -->
          <img
            v-if="user"
            class="w-100 h-100 rounded-pill"
            :src="`${user.profile.avatarUrl}?param=100y100`" />
          <!-- 未登录时的头像 -->
          <div v-else class="">EMO</div>
        </div>
        <!-- 已登录后的用户名栏 -->
        <div
          v-if="user"
          class="d-flex justify-content-center align-items-center mb-1">
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
        <div v-else class="text-center mb-2" @click="toLoginRegistration()">
          立即登录,畅享EMO时光~
        </div>
        <!-- 已登录后的关注/粉丝/等级 -->
        <div v-if="user" class="text-center fs-7 followInfo mb-2">
          <span>{{ user.profile.follows }}关注</span>
          <span>{{ user.profile.followeds }}粉丝</span>
          <span>Lv.{{ user.level }}</span>
        </div>
        <!-- 已登录后的用户标签 -->
        <div v-if="user" class="userTag text-center fs-8 mb-2" style="">
          <span>IP属地: {{ ip }}</span>
          <!-- 性别\年龄\星座 -->
          <span>
            <i v-if="user.profile.gender == 1" class="bi bi-gender-male"></i>
            <i v-else class="bi bi-gender-female"></i>
            <span class="ms-1">{{ birthdayYear }}</span>
            <span class="ms-1">{{ constellation }}</span>
          </span>
        </div>
        <!-- 关注/取消关注按钮 -->
        <div
          v-if="!isMe"
          class="followBtn d-flex justify-content-center mb-2"
          @click="changeFollow()">
          <span v-if="followStatus">取消关注</span>
          <span v-else><i class="bi bi-plus-lg"></i>关注</span>
        </div>
      </div>
      <!-- 基本信息栏 -->
      <div
        v-if="user"
        class="Basic-Information-Bar ms-3 me-3 mb-4 p-3 bg-body-secondary rounded-3">
        <div class="fw-bold fs-5 mb-2">基本信息</div>
        <!-- 个人标签 -->
        <div v-if="user.identify" class="d-flex align-items-center mb-2">
          <img :src="user.identify.imageUrl" class="identityIconUrl me-2" />
          {{ user.identify.imageDesc }}
        </div>
        <!-- 注册时长 -->
        <div>
          <span class="opacity-50">依眸时长 : </span>{{ createdTime }}年
        </div>
        <!-- 累计听歌 -->
        <div>
          <span class="opacity-50">累计EMO : </span>{{ user.listenSongs }}首
        </div>
        <!-- 性别 -->
        <div>
          <span class="opacity-50">性别 : </span>
          <span v-if="user.profile.gender == 1">男</span>
          <span v-else>女</span>
        </div>
        <!-- 年龄/星座 -->
        <div>
          <span class="opacity-50">年龄 : </span>
          {{ birthdayYear }} {{ constellation }}
        </div>
        <!-- 个人简介 -->
        <div>
          <span class="opacity-50">个人简介 : </span
          >{{ user.profile.signature }}
        </div>
        <!-- 绑定的社交帐号 -->
        <div class="d-flex align-items-center bindIcon">
          <span class="opacity-50">社交账号 : </span>
          <div
            v-for="(i, index) in bindings"
            :key="index"
            class="d-flex align-items-center justify-content-center rounded-pill bg-danger">
            <span
              class="iconfont icon-xinlangweibo"
              @click="gotoBind(i.url)"></span>
          </div>
        </div>
      </div>
      <!-- 个人喜欢的歌单 -->
      <div
        v-if="user && emoMusic"
        @click="toPlayListDetail(emoMusic.id)"
        class="ms-3 me-3 mb-4 p-3 bg-body-secondary rounded d-flex align-items-center">
        <square-card size="70px">
          <template #img>
            <img :src="`${emoMusic.coverImgUrl}?param=80y80`" />
          </template>
        </square-card>
        <!-- 歌单名称\播放次数\共有几首歌 -->
        <div class="ms-3">
          <div>
            让<span v-if="isMe">我</span><span v-else>Ta</span>
            Emo的音乐
          </div>
          <div class="fs-8 opacity-50">
            <span class="me-2">{{ emoMusic.trackCount }}首</span>
            {{ emoMusic.playCount | ConUnit }}次播放
          </div>
        </div>
      </div>
      <!-- 未登陆时,提示登录欣赏更多歌曲 -->
      <!-- <div
        v-if="!user"
        class="ms-3 me-3 mb-4 p-3 rounded-3 bg-body-secondary d-flex align-items-center">
        <div
          class="rounded bg-dark-subtle d-flex align-items-center justify-content-center me-3"
          style="width: 80px; height: 80px">
          EMO
        </div>
        登陆后查看您的依眸歌单
      </div> -->
      <!-- 用户收藏的歌单 -->
      <div
        v-if="collectionList.length > 0"
        class="ms-3 me-3 mb-4 pt-3 ps-3 pe-3 overflow-hidden bg-body-secondary rounded-3">
        <p class="opacity-50 fs-7">收藏歌单({{ collectionList.length }}个)</p>
        <div
          v-for="(i, index) in collectionList"
          :key="index"
          @click="toPlayListDetail(i.id)"
          class="d-flex align-items-center mb-3">
          <square-card size="70px">
            <template #img>
              <img :src="`${i.coverImgUrl}?param=80y80`" />
            </template>
          </square-card>
          <!-- 歌单名称\播放次数\共有几首歌 -->
          <div class="ms-3">
            <div>{{ i.name }}</div>
            <div class="fs-8 opacity-50">
              {{ i.trackCount }}首 , by{{ i.creator.nickname }}
            </div>
          </div>
        </div>
      </div>
      <!-- 用户创建的歌单 -->
      <div
        v-if="createList.length > 0"
        class="ms-3 me-3 ps-3 pe-3 pt-3 bg-body-secondary rounded-3 d-flex flex-wrap justify-content-between">
        <p class="w-100">
          创建的歌单<span class="opacity-50 ms-2"
            >({{ createList.length }}个, 让{{
              createListCollection | ConUnit
            }}人Emo )</span
          >
        </p>
        <div
          v-for="(i, index) in createList"
          :key="index"
          @click="toPlayListDetail(i.id)"
          class="createListCard mb-2">
          <square-card size="100%">
            <template #playCount>
              <i class="bi bi-play-fill"></i
              ><span>{{ i.playCount | ConUnit }}</span>
            </template>
            <template #img>
              <img :src="`${i.coverImgUrl}?param=150y150`" />
            </template>
          </square-card>
          <div class="van-multi-ellipsis--l2 fs-7">{{ i.name }}</div>
        </div>
      </div>
      <!-- 设置部分 -->
      <div v-if="isMe" class="ms-3 me-3">
        <div
          class="setting p-3 mb-4 rounded-3 overflow-hidden bg-body-secondary">
          <div class="form-check form-switch text-start">
            <label class="form-check-label" for="Theme"
              >&nbsp;&nbsp;深色模式</label
            >
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="Theme"
              v-model="themeStatus" />
          </div>
          <div><i class="bi bi-info-square fs-3 me-4"></i>关于依眸音乐</div>
          <div>
            <i class="bi bi-shield-lock fs-3 me-3"></i>《依眸音乐隐私协议》
          </div>
          <div @click="checkUpdate()">
            <i class="bi bi-arrow-repeat fs-3 me-4"></i>检查更新
          </div>
        </div>
        <div
          v-if="user"
          @click="logOut()"
          class="p-2 rounded-pill bg-danger text-center">
          退出登录
        </div>
      </div>
    </div>
    <!-- 顶栏,绝对定位在顶部 -->
    <div
      class="w-100 position-absolute top-0 start-0 d-flex justify-content-between pt-4 ps-3 pe-3 z-3">
      <!-- 左侧返回 -->
      <i class="bi bi-chevron-left fs-2" @click="$router.go(-1)"></i>
      <!-- 右侧放大镜进入搜索 -->
      <i
        class="bi bi-search fs-3"
        @click="$router.push({ name: 'searchInput' })"></i>
    </div>
    <!-- 个人背景 -->
    <div class="position-absolute top-0 z-n1 w-100 overflow-hidden">
      <img
        v-if="user"
        :src="`${user.profile.backgroundUrl}?param=300y300`"
        class="w-100" />
    </div>
    <!-- 未登录情况下的设置页背景 -->
    <video
      v-if="!user"
      ref="bgVideo"
      autoplay
      loop
      src="../assets/下载.mp4"
      class="position-absolute top-0 w-100 h-100 z-n1 object-fit-cover"></video>
    <!-- 退出登录确认框 -->
    <logout-confirm></logout-confirm>
  </div>
</template>
<script>
  import {
    getLoginStatus,
    getUserDetail,
    Follow,
    getUserPlaylist,
  } from "@/api/getData.js";
  import BScroll from "@better-scroll/core"; //Better scroll引入
  import { mapMutations, mapState } from "vuex";
  import { getVipInfo } from "../api/getData";
  import cityList from "../assets/cities.json";
  import { Toast, Dialog } from "vant";
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
        followStatus: null, //关注状态
        createdTime: null, //用户创建时间
        bindings: null, //绑定的社交帐号
        emoMusic: null, //用户喜欢的音乐
        collectionList: [], // 用户收藏的他人歌单
        createList: [], //用户创建的歌单
        createListCollection: 0, //用户创建歌单被收藏次数
      };
    },
    // 计算属性
    computed: {
      ...mapState(["miniPlayerStatus", "Theme"]),
      //深色模式切换按钮的状态
      themeStatus: {
        get: function () {
          if (this.Theme == "dark") {
            return true;
          } else return false;
        },
        set: function () {
          this.changeTheme();
        },
      },
    },
    // 方法
    methods: {
      ...mapMutations(["miniPlayerHidden", "changeTheme"]),
      // 未登录状态下点击跳转登陆页面
      toLoginRegistration() {
        this.$router.push({
          name: "login",
        });
        this.miniPlayerHidden();
      },
      // 星座判断
      getConstellation(month, day) {
        switch (month) {
          case 1:
            if (day > 19) {
              return "水瓶座";
            } else return "摩羯座";
          case 2:
            if (day > 18) {
              return "双鱼座";
            } else return "水瓶座";
          case 3:
            if (day > 20) {
              return "白羊座";
            } else return "双鱼座";
          case 4:
            if (day > 19) {
              return "金牛座";
            } else return "白羊座";
          case 5:
            if (day > 20) {
              return "双子座";
            } else return "金牛座";
          case 6:
            if (day > 21) {
              return "巨蟹座";
            } else return "双子座";
          case 7:
            if (day > 22) {
              return "狮子座";
            } else return "巨蟹座";
          case 8:
            if (day > 22) {
              return "处女座";
            } else return "狮子座";
          case 9:
            if (day > 22) {
              return "天秤座";
            } else return "处女座";
          case 10:
            if (day > 23) {
              return "天蝎座";
            } else return "天秤座";
          case 11:
            if (day > 20) {
              return "射手座";
            } else return "天蝎座";
          case 12:
            if (day > 21) {
              return "摩羯座";
            } else return "射手座";
        }
      },
      // 修改关注状态
      changeFollow() {
        this.followStatus = !this.followStatus;
      },
      // 点击前往绑定账号的主页，如：微博主页
      gotoBind(url) {
        window.location.href = url;
      },
      // 点击跳转歌单详情
      toPlayListDetail(id) {
        this.$router.push({ name: "playListDetail", query: { id } });
      },
      // 点击检查更新
      checkUpdate() {
        Toast("当前已是最新版");
      },
      // 点击
      logOut() {
        Dialog.confirm({
          title: "退出登录",
          message:
            "由于API接口防止高频请求报错而使用的2分钟数据缓存机制,退出登录将在2分钟后生效",
        })
          .then(() => {
            // on confirm
            Toast(`退出成功
2分钟后生效`);
            localStorage.setItem("token", "");
          })
          .catch(() => {
            // on cancel
            Toast("取消退出");
          });
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
        console.log(res);
        if (res.data.profile) {
          this.userId = res.data.account.id;
          this.user = await getUserDetail(this.userId);
        }
      }
      if (this.user) {
        let VipInfo = await getVipInfo();
        if (VipInfo.data)
          this.VIPdynamicIconUrl = VipInfo.data.associator.dynamicIconUrl;
        cityList.forEach((i) => {
          if (i.code == (this.user.profile.city + "").slice(0, 4))
            this.ip = i.name;
        });
        this.birthday = new Date(this.user.profile.birthday); //用户年龄

        this.birthdayYear =
          (this.birthday.getFullYear() + "").slice(2, 3) + "0后"; //用户年龄段
        this.constellation = this.getConstellation(
          this.birthday.getMonth() + 1,
          this.birthday.getDate()
        ); //星座

        this.followStatus = this.user.profile.followed; //关注状态初始化
        this.createdTime = (this.user.createDays / 365).toFixed(1); //用户创建时间
        this.bindings = this.user.bindings.filter((i) => i.url); // 用户绑定社交帐号初始化
        let userPlaylist = await getUserPlaylist(this.userId); //获取用户所有歌单,包括喜欢\收藏的他人歌单\创建的歌单
        if (
          userPlaylist.playlist != [] ||
          userPlaylist.playlist[0].name.search("喜欢的音乐") != -1
        ) {
          this.emoMusic = userPlaylist.playlist.shift();
        } //用户"喜欢"的歌单初始化
        this.collectionList = userPlaylist.playlist.filter(
          (i) => i.userId != this.userId
        ); // 用户收藏他人的歌单
        this.createList = userPlaylist.playlist.filter(
          (i) => i.userId === this.userId
        ); //用户自己创建歌单
        this.createList.forEach((i) => {
          this.createListCollection += i.subscribedCount;
        }); //用户自己创建歌单被收藏次数
      }
      this.$nextTick(() => {
        this.bs.refresh(); // 最后重新计算Better scroll
      });
    },
    // 挂载后生命周期
    mounted() {
      this.bs = new BScroll(this.$refs.userHome, {
        click: true,
      });
    },
    // 销毁前生命周期
    beforeDestroy() {
      if (this.user && this.followStatus != this.user.profile.followed) {
        let t = this.followStatus ? 1 : 2;
        Follow(this.userId, t);
      }
      this.bs.destroy();
    },
    // 组件
    components: {
      logoutConfirm: Dialog.Component,
    },
  };
</script>
<style lang="scss">
  .mine-info {
    margin-top: calc(100vw - 15px);
    background: linear-gradient(var(--bs-secondary-bg) 15px, transparent);
  }
  .mine-avatar {
    width: 75px;
    height: 75px;
  }
  .VipDynamicIcon {
    height: 20px;
    border-radius: 999px;
  }
  .identityIconUrl {
    width: 21px;
  }
  .followInfo {
    & > span {
      opacity: 0.5;
    }
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
        background: rgb(var(--bs-tertiary-color-rgb));
      }
    }
  }
  .userTag {
    & > span {
      padding: 3px 4px;
      border-radius: 5px;
      background: rgba(127, 127, 127, 0.2);
    }
    & > span:not(:last-child) {
      margin-right: 7px;
    }
  }
  .followBtn {
    > span {
      background: var(--bs-red);
      border-radius: 5px;
      padding: 0 5px;
    }
  }
  .Basic-Information-Bar {
    > div:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  .bindIcon {
    > div {
      width: 30px;
      height: 30px;
    }
    > *:not(:last-child) {
      margin-right: 15px;
    }
  }
  .createListCard {
    width: 30%;
  }
  .form-check-input:focus {
    border-color: rgba(var(--bs-danger-rgb), 0.3);
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.3);
  }
  .form-check-input:checked {
    background-color: var(--bs-red);
    border-color: var(--bs-red);
  }
  .setting {
    & > div:not(:last-child) {
      margin-bottom: 18px;
      position: relative;
      &::before {
        content: "";
        display: block;
        position: absolute;
        bottom: -9px;
        left: -50%;
        width: 200%;
        height: 1px;
        background: var(--bs-tertiary-bg);
      }
    }
    & > div:not(:first-child) {
      display: flex;
      align-items: center;
    }
  }
  // vant2弹窗
  .van-dialog {
    background: var(--bs-secondary-bg) !important;
  }
  .van-button--default {
    &:first-child {
      color: var(--bs-body-color);
    }
    background: var(--bs-secondary-bg) !important;
  }
</style>
