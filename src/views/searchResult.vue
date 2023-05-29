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
      <van-tab ref="bsWrapper0" title="综合" class="p-3">
        <!-- 大数据推荐/综合匹配推荐模块 -->
        <div class="p-3 pb-0 mb-3 bg-body-secondary rounded-3 overflow-hidden">
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
                  <span v-html="heightLight(i.name, kw)"></span>
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
                <div>歌单:<span v-html="heightLight(i.name, kw)"></span></div>
                <!-- 歌单数据:歌曲数/播放量 -->
                <div class="fs-8 text-secondary">
                  <span class="me-2">歌曲:{{ i.trackCount | ConUnit }}</span>
                  <span>播放:{{ i.playCount | ConUnit }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 视频 -->
          <div v-if="searchMultimatch.new_mlog">
            <div
              v-for="(i, index) in searchMultimatch.new_mlog"
              :key="index"
              class="d-flex align-items-center mb-3">
              <!-- 封面 -->
              <div class="position-relative me-3">
                <img
                  :src="`${i.baseInfo.resource.mlogBaseData.coverUrl}?param=90y60`"
                  class="rounded" />
                <i
                  class="bi bi-play-fill fs-3 t-shadow-5 position-absolute top-50 start-50 translate-middle"></i>
              </div>
              <!-- 视频信息:名称,作者名称/时长/播放量/ -->
              <div>
                <!-- 视频名称 -->
                <div>
                  <span>{{ i.resourceName }}:</span>
                  <span
                    v-html="
                      heightLight(i.baseInfo.resource.mlogBaseData.text, kw)
                    "></span>
                </div>
                <!-- 视频信息 -->
                <div class="fs-8 text-secondary">
                  <span
                    v-html="
                      heightLight(i.baseInfo.resource.mlogExtVO.artistName, kw)
                    "
                    class="me-2"></span>
                  <span
                    >播放:{{
                      i.baseInfo.resource.mlogExtVO.playCount | ConUnit
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 单曲模块 -->
        <div class="pt-3 bg-body-secondary rounded-3 overflow-hidden">
          <!-- 头部 -->
          <div
            class="ps-3 pe-3 pb-3 d-flex justify-content-between border-bottom">
            <span class="fs-5">单曲</span>
            <button class="text-danger">
              <i class="bi bi-play-fill"></i>播放全部
            </button>
          </div>
          <!-- 单曲部分主体 -->
          <song-list
            :detailList="songlist.slice(0, 6)"
            :showLazyLoad="false"></song-list>
          <!-- 查看更多按钮 -->
          <div class="text-center border-top p-3">查看更多</div>
        </div>
        <!-- 歌单模块 -->
        <div class="pt-3 bg-body-secondary rounded-3 overflow-hidden">
          <!-- 头部 -->
          <div class="ps-3 pe-3 pb-3 border-bottom">
            <span class="fs-5">歌单</span>
          </div>
          <!-- 歌单部分主体 -->

          <!-- 查看更多按钮 -->
          <div class="text-center border-top p-3">查看更多</div>
        </div>
      </van-tab>
      <van-tab ref="bsWrapper1" title="歌曲" class="p-3">歌曲</van-tab>
      <van-tab ref="bsWrapper2" title="歌手" class="p-3">歌手</van-tab>
      <van-tab ref="bsWrapper3" title="专辑" class="p-3">专辑</van-tab>
      <van-tab ref="bsWrapper4" title="歌单" class="p-3">歌单</van-tab>
      <van-tab ref="bsWrapper5" title="用户" class="p-3">用户</van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import { getSearchMultimatch, cloudsearch } from "@/api/getData.js";
  import { mapState } from "vuex";
  import heightLight from "../tool/heightLight.js";
  export default {
    data() {
      return {
        active: 0, //当前激活的标签页,默认第一个"综合"
        searchMultimatch: {}, //大数据推荐"你可能感兴趣"搜索推荐列表
        songlist: [], //单曲列表
        bs: [],
      };
    },
    // 计算属性
    computed: {
      ...mapState(["kw"]),
    },
    // 方法
    methods: {
      beforeChange() {
        // console.log("准备切换");
      },
      heightLight,
    },
    // 创建后生命周期
    async created() {
      let searchMultimatch = await getSearchMultimatch(this.kw);
      console.log(searchMultimatch);
      this.searchMultimatch = searchMultimatch.result;
      let songRes = await cloudsearch({
        keywords: this.kw, //搜索关键词
        limit: 6, //请求回6首
        // offset: 0, //从第0首开始请求.默认为0
        // type: 1, 默认为单曲
      });
      console.log(songRes);
      this.songlist = songRes.result.songs;
      // this.$nextTick();
    },
    // 挂载后生命周期
    mounted() {
      console.log(this.$refs.bsWrapper);
      /* this.$refs.bsWrapper.forEach((i) => {
        console.log(i);
      }); */
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
