<template>
  <div class="login-view w-100 h-100">
    <!-- 背景视频 -->
    <video
      ref="bgVideo"
      autoplay
      loop
      src="../assets/黑胶唱片(1920×1080-30fps).mp4"
      class="position-absolute w-100 h-100 z-n1"></video>
    <!-- 因为背景视频无法覆盖背景大小,因此需添加蒙版 -->
    <div
      class="login-shade w-100 h-100 pb-5 d-flex flex-column justify-content-between">
      <!-- 顶栏返回 -->
      <div class="flex-shrink-0 ps-3 pt-4 fs-2" style="" @click="goBack()">
        <i
          class="bi bi-chevron-down bg-black ps-2 pe-2 rounded"
          style="--bs-bg-opacity: 0.2"></i>
      </div>
      <div class="flex-grow-1 d-flex flex-column justify-content-between">
        <!-- 信息栏 -->
        <div class="mt-5 ps-4">
          <p class="fs-1 fw-bold">手机验证登录</p>
          <p class="fs-7 text-body-tertiary">未注册手机验证后即自动完成注册</p>
        </div>
        <!-- 底部登录部分 -->
        <div>
          <!-- 登录框 -->
          <div class="w-75 mx-auto mb-4">
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
          <!-- 协议同意框 -->
          <div
            class="w-75 mx-auto mb-5 d-flex justify-content-between align-items-center fs-7 opacity-50">
            <input type="radio" class="me-2" />
            同意<a href="#" class="text-danger text-decoration-none"
              >《依眸音乐注册协议》</a
            >和<a href="#" class="text-danger text-decoration-none"
              >《隐私协议》</a
            >
          </div>
          <!-- 其他登陆方式 -->
          <div class="d-flex justify-content-center align-items-center">
            <!-- 二维码登录 -->
            <div class="QRcodeLogin bg-body-secondary rounded-pill">
              <i class="bi bi-qr-code"></i>
            </div>
            <!-- 百度登录 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations, mapState } from "vuex";
  export default {
    // 计算属性
    computed: {
      ...mapState(["playIndex"]),
    },
    // 方法
    methods: {
      ...mapMutations(["miniPlayerShow", "navBarShow"]),
      goBack() {
        this.$router.go(-1);
        this.navBarShow();
        if (this.playIndex != -1) this.miniPlayerShow();
      },
    },
    // 挂载后生命周期
    mounted() {
      // this.$refs.bgVideo.play()
    },
  };
</script>
<style>
  .login-shade {
    background: linear-gradient(
      var(--bs-body-bg) 10%,
      transparent 25%,
      transparent 75%,
      var(--bs-body-bg) 90%
    );
  }
  #loginName {
    outline: none;
    --bs-bg-opacity: 0.8;
  }
  input[type="radio"] {
    border: none;
    outline: none;
  }
  .QRcodeLogin {
    padding: 5px 10px;
  }
</style>
