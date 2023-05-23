<template>
  <div
    class="login-view w-100 h-100 pb-5 d-flex flex-column justify-content-between">
    <!-- 背景视频 -->
    <video
      ref="bgVideo"
      autoplay
      loop
      src="../assets/黑胶唱片(1920×1080-30fps).mp4"
      class="position-absolute w-100 h-100 z-n1 object-fit-cover"></video>
    <!-- 顶栏返回 -->
    <div class="flex-shrink-0 ps-3 pt-4 fs-2" style="" @click="goBack()">
      <i
        class="bi bi-chevron-down bg-black ps-2 pe-2 rounded"
        style="--bs-bg-opacity: 0.2"></i>
    </div>
    <div class="flex-grow-1 d-flex flex-column justify-content-between">
      <!-- 信息栏 -->
      <div class="mt-5 ps-4 text-light">
        <p v-if="loginMode == 1" class="fs-1 fw-bold">手机验证登录</p>
        <p v-if="loginMode == 2" class="fs-1 fw-bold">网易云扫码登录</p>
        <p v-if="loginMode == 1" class="fs-7 text-light-tertiary">
          未注册手机验证后即自动完成注册
        </p>
        <p v-if="loginMode == 2" class="fs-7 text-light-tertiary">
          依眸音乐数据互通网易云平台
        </p>
      </div>
      <!-- 底部登录部分 -->
      <div>
        <!-- 手机验证码登录框 -->
        <div v-if="loginMode == 1" class="w-75 mx-auto mb-4">
          <input
            type="text"
            autocomplete="off"
            id="loginName"
            placeholder="请输入手机号"
            class="text-center w-100 mb-3 pt-3 pb-3 ps-3 pe-3 rounded-pill border border-0 bg-body" />
          <button
            class="text-center w-100 pt-3 pb-3 bg-danger border border-0 rounded-pill"
            style="--bs-bg-opacity: 0.95">
            获取验证码
          </button>
        </div>
        <!-- 二维码登录框 -->
        <div
          v-if="loginMode == 2"
          class="QRcode"
          style=""
          :style="[
            {
              'background-image': `url(${QRcode}), linear-gradient(rgb(106 0 142), rgb(174 0 0))`,
            },
          ]">
          <img ref="QRcode" class="rounded-3 object-fit-none" />
        </div>
        <!-- 协议同意框 -->
        <div
          class="w-75 mx-auto mb-5 d-flex justify-content-between align-items-center fs-7 opacity-50 text-light">
          <input type="checkbox" class="me-2" />
          同意<a href="#" class="text-danger text-decoration-none"
            >《依眸音乐注册协议》</a
          >和<a href="#" class="text-danger text-decoration-none"
            >《隐私协议》</a
          >
        </div>
        <!-- 其他登陆方式 -->
        <div class="d-flex justify-content-center align-items-center">
          <!-- 二维码登录 -->
          <div
            class="loginMode bg-body-secondary rounded-4"
            @click="useQRcode()">
            <div>
              <i class="bi bi-qr-code fs-3"></i>
            </div>
          </div>
          <!-- 百度登录 -->
          <div
            class="loginMode bg-body-secondary rounded-4"
            @click="useQRcode()">
            <div>
              <span class="iconfont icon-baidu fs-2"></span>
            </div>
          </div>
          <!-- 微信登录 -->
          <div
            class="loginMode bg-body-secondary rounded-4"
            @click="useQRcode()">
            <div>
              <span class="iconfont icon-weixin fs-1"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations, mapState } from "vuex";
  import {
    getLoginQrKey,
    getLoginQrCreate,
    getLoginQrCheck,
  } from "@/api/getData";
  export default {
    data() {
      return {
        loginMode: 1,
        timeIdList: [],
        QRcode: null,
      };
    },
    // 计算属性
    computed: {
      ...mapState(["playIndex"]),
    },
    // 方法
    methods: {
      ...mapMutations(["miniPlayerShow"]),
      // 返回
      goBack() {
        this.$router.go(-1);
        if (this.playIndex != -1) this.miniPlayerShow();
      },
      // 点击使用二维码登录,获取二维码
      async useQRcode() {
        this.loginMode = 2;
        let key = await getLoginQrKey();
        let QRcode = await getLoginQrCreate({
          key: key.data.unikey,
          qrimg: "base64",
          time: new Date().getTime(),
        });
        // this.$refs.QRcode.src = QRcode.data.qrimg;
        this.QRcode = QRcode.data.qrimg;
        this.timeIdList.push(
          setInterval(async () => {
            let res = await getLoginQrCheck({
              key: key.data.unikey,
              time: new Date().getTime(),
            });
            if (res.code == 803) {
              // 完成登录后清除定时器
              clearInterval(this.timeIdList[0]);
              window.localStorage.setItem("token", res.cookie);
              this.$router.push("/");
            } else {
              console.log(res);
            }
          }, 1000)
        );
      },
    },
    // 销毁前生命周期
    beforeDestroy() {
      this.timeIdList.forEach((item) => {
        clearInterval(item);
      });
    },
  };
</script>
<style lang="scss">
  #loginName {
    outline: none;
    --bs-bg-opacity: 0.8;
  }
  .loginMode {
    width: 50px;
    padding-bottom: 50px;
    position: relative;
    opacity: 0.7;
    & > div {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:not(:last-child) {
      margin-right: 5vw;
    }
  }
  .QRcode {
    width: 148px;
    height: 148px;
    border-radius: 10px;
    margin: 50px auto;
    background-blend-mode: lighten;
    background-size: 110%;
    background-position: center;
  }
</style>
