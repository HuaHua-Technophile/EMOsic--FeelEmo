<template>
  <div class="searchResult-View w-100 h-100">
    <!-- 顶部搜索框 -->
    <div
      class="find-search blur position-fixed top-0 d-flex w-100 pt-4 ps-3 pe-3 z-3">
      <!-- 返回图标 -->
      <i
        class="flex-shrink-0 bi bi-chevron-left fs-2 me-3"
        @click="$router.go(-1)"></i>
      <!-- input框是假的,点击后跳转真的搜索页面 -->
      <div
        @click="$router.push({ name: 'searchInput' })"
        class="flex-grow-1 d-flex justify-content-between align-items-center bg-body-secondary rounded-pill ps-3 pe-3">
        <div>
          <i class="bi bi-search me-2"></i
          ><span class="placeHolder text-secondary">{{ kw }}</span>
        </div>
      </div>
    </div>
    <van-tabs
      v-model="active"
      animated
      :before-change="beforeChange()"
      color="#fb3c3c"
      background="transparent"
      :swipeable="true"
      :scrollspy="false"
      title-active-color="var(--bs-body-color)"
      title-inactive-color="var(--bs-secondary-color)"
      class="w-100 h-100">
      <van-tab title="综合" class="p-3">
        <!-- 大数据推荐/综合匹配推荐模块 -->
        <div class="p-3 pb-0 bg-body-secondary rounded-3 overflow-hidden">
          <!-- 标题 -->
          <div class="fs-7 text-secondary mb-3">你可能感兴趣</div>
          <!-- 歌手 -->
          <div v-if="searchMultimatch.artist">
            <div
              v-for="(i, index) in searchMultimatch.artist"
              :key="index"
              class="d-flex align-items-center mb-3">
              <!-- 歌手头像 -->
              <img
                :src="`${i.img1v1Url}?param=55y55`"
                class="rounded-pill me-3" />
              <!-- 歌手信息 -->
              <div>
                <!-- 歌手名称 -->
                <div>
                  <span>{{ i.occupation }}:</span>
                  <span v-html="heightLight(i.name)"></span>
                  <span v-if="i.trans" class="text-secondary"
                    >(<span v-html="heightLight(i.trans)"></span>)</span
                  >
                </div>
                <!-- 歌手粉丝/歌曲数量 -->
                <div class="fs-8 text-secondary">
                  <span class="me-2">粉丝:{{ i.fansSize | ConUnit }}</span>
                  <span>歌曲:{{ i.musicSize | ConUnit }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 歌单 -->
          <div v-if="searchMultimatch.playlist">
            <div
              v-for="(i, index) in searchMultimatch.playlist"
              :key="index"
              class="d-flex align-items-center mb-3">
              <!-- 歌单封面 -->
              <img :src="`${i.coverImgUrl}?param=55y55`" class="rounded me-3" />
              <!-- 歌单信息 -->
              <div>
                <!-- 歌单名称 -->
                <div>歌单:<span v-html="heightLight(i.name)"></span></div>
                <!-- 歌单数据:歌曲数/播放量 -->
                <div class="fs-8 text-secondary">
                  <span class="me-2">歌曲:{{ i.trackCount | ConUnit }}</span>
                  <span>播放:{{ i.playCount | ConUnit }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="歌曲" class="p-3">歌曲</van-tab>
      <van-tab title="歌手" class="p-3">歌手</van-tab>
      <van-tab title="专辑" class="p-3">专辑</van-tab>
      <van-tab title="歌单" class="p-3">歌单</van-tab>
      <van-tab title="用户" class="p-3">用户</van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import { getSearchMultimatch } from "@/api/getData.js";
  export default {
    data() {
      return {
        kw: "", //搜索关键词,用于做高亮
        active: 0, //当前激活的标签页,默认第一个"综合"
        searchMultimatch: {}, //大数据推荐"你可能感兴趣"搜索推荐列表
      };
    },
    // 计算属性
    computed: {},
    // 方法
    methods: {
      beforeChange() {
        // console.log("准备切换");
      },
      // 搜索关键词高亮
      heightLight(text) {
        return text.replace(
          this.kw,
          `<span class='text-danger'>${this.kw}</span>`
        );
      },
    },
    // 创建后生命周期
    async created() {
      this.kw = this.$route.query.keyword;
      let searchMultimatch = await getSearchMultimatch(this.kw);
      console.log(searchMultimatch);
      this.searchMultimatch = searchMultimatch.result;
    },
  };
</script>
<style lang="scss">
  .searchResult-View {
    padding-top: 70px;
  }
  .van-tabs__content {
    width: 100%;
    height: calc(100% - 44px);
  }
</style>
