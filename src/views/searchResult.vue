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
      color="#fb3c3c"
      background="transparent"
      :swipeable="true"
      :scrollspy="false"
      title-active-color="var(--bs-body-color)"
      title-inactive-color="var(--bs-secondary-color)"
      class="w-100 h-100">
      <van-tab title="综合" class="综合">
        <div class="p-3" :class="[{ 'h-miniPlayer': miniPlayerStatus }]">
          <!-- 大数据推荐/综合匹配推荐模块 -->
          <div
            class="p-3 pb-0 mb-3 bg-body-secondary rounded-3 overflow-hidden">
            <!-- 标题 -->
            <div class="fs-7 text-secondary mb-3">你可能感兴趣</div>
            <!-- 歌手 -->
            <div v-if="searchMultimatch.artist">
              <div
                v-for="(i, index) in searchMultimatch.artist"
                :key="index"
                @click="
                  $router.push({ name: 'artistHome', query: { id: i.id } })
                "
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
                    <span v-html="heightLight(i.name + '', kw)"></span>
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
                @click="
                  $router.push({ name: 'playListDetail', query: { id: i.id } })
                "
                class="d-flex align-items-center mb-3">
                <!-- 歌单封面 -->
                <img
                  :src="`${i.coverImgUrl}?param=55y55`"
                  class="rounded me-3" />
                <!-- 歌单信息 -->
                <div>
                  <!-- 歌单名称 -->
                  <div>
                    歌单:<span v-html="heightLight(i.name + '', kw)"></span>
                  </div>
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
                <div
                  class="position-relative me-3"
                  style="width: 90px; height: 60px">
                  <img
                    :src="`${i.baseInfo.resource.mlogBaseData.coverUrl}?param=90y60`"
                    class="rounded w-100 h-100" />
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
                      v-if="i.baseInfo.resource.userProfile"
                      v-html="
                        heightLight(
                          i.baseInfo.resource.userProfile.nickname + '',
                          kw
                        )
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
          <div class="pt-3 mb-3 bg-body-secondary rounded-3 overflow-hidden">
            <!-- 头部 -->
            <div
              class="ps-3 pe-3 pb-3 d-flex justify-content-between border-bottom">
              <span class="fs-5">单曲</span>
              <button
                class="btn btn-outline-danger rounded-pill fs-9 ps-2 pe-2 pt-0 pb-0"
                @click="
                  songListChange();
                  setPlayIndex(0);
                ">
                <i class="bi bi-play-fill"></i>播放全部
              </button>
            </div>
            <!-- 单曲部分主体 -->
            <song-list
              :detailList="songList.slice(0, 6)"
              :hiddenLazyLoad="true"
              @songList="songListChange()"></song-list>
            <!-- 查看更多按钮 -->
            <div class="text-center border-top fs-7 p-2" @click="active = 1">
              <span class="opacity-50">收听全部{{ songCount }}首依眸单曲</span>
            </div>
          </div>
          <!-- 歌单模块 -->
          <div
            class="pt-3 ps-3 pe-3 mb-3 bg-body-secondary rounded-3 overflow-hidden">
            <!-- 头部 -->
            <div class="pb-3 border-bottom fs-5">歌单</div>
            <!-- 歌单部分主体 -->
            <playlist-list
              :detailList="playlistList.slice(0, 6)"
              :hiddenLazyLoad="true"></playlist-list>
            <!-- 查看更多按钮 -->
            <div class="text-center border-top fs-7 p-2" @click="active = 2">
              <span class="opacity-50"
                >查看全部{{ playlistCount }}个依眸歌单</span
              >
            </div>
          </div>
          <!-- 歌手模块 -->
          <div
            class="p-3 pb-0 mb-3 bg-body-secondary rounded-3 overflow-hidden">
            <div class="pb-3 border-bottom fs-5">艺人</div>
            <!-- 歌手部分主体 -->
            <artist-list
              :detailList="artistList"
              :hiddenLazyLoad="true"></artist-list>
            <div class="text-center border-top fs-7 p-2" @click="active = 3">
              <span class="opacity-50"
                >查看全部{{ artistCount }}位依眸入驻艺人</span
              >
            </div>
          </div>
          <!-- 专辑模块 -->
          <div
            class="p-3 pb-0 mb-3 bg-body-secondary rounded-3 overflow-hidden">
            <div class="pb-3 border-bottom fs-5">专辑</div>
            <!-- 专辑部分主体 -->
            <album-list
              :detailList="albumList.slice(0, 6)"
              :hiddenLazyLoad="true"></album-list>
            <div class="text-center border-top fs-7 p-2" @click="active = 4">
              <span class="opacity-50">查看全部{{ albumCount }}个依眸专辑</span>
            </div>
          </div>
          <!-- 用户模块 -->
          <div class="p-3 pb-0 bg-body-secondary rounded-3 overflow-hidden">
            <div class="pb-3 border-bottom fs-5">用户</div>
            <!-- 用户部分主体 -->
            <user-list :detailList="userList"></user-list>
            <div class="text-center border-top fs-7 p-2" @click="active = 5">
              <span class="opacity-50">共{{ userCount }}用户曾在此EMO</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="单曲">
        <div :class="[{ 'h-miniPlayer': miniPlayerStatus }]">
          <play-all-title
            :listLength="songList.length"
            @playAll="playAll"
            class="top-0"></play-all-title>
          <song-list
            :detailList="songList"
            :loadFinish="songLoadFinish"
            :isPullUpLoad="songIsPullUpLoad"
            @songList="songListChange()"></song-list>
        </div>
      </van-tab>
      <van-tab title="歌单">
        <div :class="[{ 'h-miniPlayer': miniPlayerStatus }]" class="ps-3 pe-3">
          <playlist-list
            :detailList="playlistList"
            :loadFinish="playlistLoadFinish"
            :isPullUpLoad="playlistIsPullUpLoad"></playlist-list>
        </div>
      </van-tab>
      <van-tab title="歌手">
        <div :class="[{ 'h-miniPlayer': miniPlayerStatus }]" class="ps-3 pe-3">
          <artist-list
            :detailList="artistList"
            :loadFinish="artistLoadFinish"
            :isPullUpLoad="artistIsPullUpLoad"></artist-list>
        </div>
      </van-tab>
      <van-tab title="专辑">
        <div :class="[{ 'h-miniPlayer': miniPlayerStatus }]" class="ps-3 pe-3">
          <album-list
            :detailList="albumList"
            :loadFinish="albumLoadFinish"
            :isPullUpLoad="albumIsPullUpLoad"></album-list>
        </div>
      </van-tab>
      <van-tab title="用户">
        <div :class="[{ 'h-miniPlayer': miniPlayerStatus }]" class="ps-3 pe-3">
          <user-list
            :detailList="userList"
            :loadFinish="userLoadFinish"
            :isPullUpLoad="userIsPullUpLoad"></user-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import { getSearchMultimatch, cloudsearch } from "@/api/getData.js";
  import { mapMutations, mapState } from "vuex";
  import heightLight from "../tool/heightLight.js";
  import BScroll from "@better-scroll/core"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up"; //导入Better scroll上拉加载插件
  import playAllTitle from "@/components/son/playAllTitle.vue";
  BScroll.use(Pullup); //注册插件
  export default {
    data() {
      return {
        active: 0, //当前激活的标签页,默认第一个"综合"
        searchMultimatch: {}, //大数据推荐"你可能感兴趣"搜索推荐列表
        songList: [], //单曲列表
        songCount: 0, //单曲数量
        songIsPullUpLoad: false, //单曲是否上拉加载中
        songLoadFinish: false, //单曲是否加载完成
        playlistList: [], //歌单列表
        playlistCount: 0, //歌单数量
        playlistIsPullUpLoad: false, //歌单是否上拉加载中
        playlistLoadFinish: false, //歌单是否加载完成
        artistList: [], //艺人(歌手)列表
        artistCount: 0, //艺人(歌手)数量
        artistIsPullUpLoad: false, //艺人(歌手)是否上拉加载中
        artistLoadFinish: false, //艺人(歌手)是否加载完成
        albumList: [], //专辑列表
        albumCount: 0, //专辑数量
        albumIsPullUpLoad: false, //专辑是否上拉加载中
        albumLoadFinish: false, //专辑是否加载完成
        userList: [], //用户列表
        userCount: 0, //用户数量
        userIsPullUpLoad: false, //专辑是否上拉加载中
        userLoadFinish: false, //专辑是否加载完成
        bs: new Array(6), //better-scroll 实例化对象
        bsDOM: [], //Better scroll的挂载dom对象
        timeIdList: [], //定时器Id列表
      };
    },
    // 计算属性
    computed: {
      ...mapState(["kw", "miniPlayerStatus"]),
    },
    // 方法
    methods: {
      ...mapMutations(["setSongList", "setPlayIndex"]),
      // 关键词高亮
      heightLight,
      // 单曲部分传出的方法,用于修改本地播放列表
      songListChange() {
        this.setSongList(this.songList.map((i) => i.id));
      },
      // 第二页点击播放全部已加载
      playAll() {
        this.songListChange();
        this.setPlayIndex(0);
      },
      // 加载歌曲
      async songListLoad() {
        // 如果加载完毕
        if (this.songList.length == this.songCount) {
          this.songLoadFinish = true;
          this.bs[1].closePullUp();
        }
        // 如果没加载完
        else {
          this.songIsPullUpLoad = true;
          let res = await cloudsearch({
            keywords: this.kw, //搜索关键词
            limit: 15, //请求回15个
            offset: this.songList.length, //从第n个开始请求.默认为0
            // type: 1, //默认歌曲
          });
          this.songList.push(...res.result.songs);
          this.bs[1].finishPullUp();
          this.songIsPullUpLoad = false;
        }
        this.$nextTick(() => {
          this.bs[1].refresh();
        });
      },
      // 加载歌单
      async playlistListLoad() {
        // 如果加载完毕
        if (this.playlistList.length == this.playlistCount) {
          this.playlistLoadFinish = true;
          this.bs[2].closePullUp();
        }
        // 如果没加载完
        else {
          this.playlistIsPullUpLoad = true;
          let res = await cloudsearch({
            keywords: this.kw, //搜索关键词
            limit: 15, //请求回15个
            offset: this.playlistList.length, //从第n个开始请求.默认为0
            type: 1000, //歌单
          });
          this.playlistList.push(...res.result.playlists);
          this.bs[2].finishPullUp();
          this.playlistIsPullUpLoad = false;
        }
        this.$nextTick(() => {
          this.bs[2].refresh();
        });
      },
      // 加载歌手
      async artistListLoad() {
        // 如果加载完毕
        if (this.artistList.length == this.artistCount) {
          this.artistLoadFinish = true;
          this.bs[3].closePullUp();
        }
        // 如果没加载完
        else {
          this.artistIsPullUpLoad = true;
          let res = await cloudsearch({
            keywords: this.kw, //搜索关键词
            limit: 15, //请求回15个
            offset: this.artistList.length, //从第n个开始请求.默认为0
            type: 100, //歌手
          });
          this.artistList.push(...res.result.artists);
          this.bs[3].finishPullUp();
          this.artistIsPullUpLoad = false;
        }
        this.$nextTick(() => {
          this.bs[3].refresh();
        });
      },
      // 加载专辑
      async albumListLoad() {
        // 如果加载完毕
        if (this.albumList.length == this.albumCount) {
          this.albumLoadFinish = true;
          this.bs[4].closePullUp();
        }
        // 如果没加载完
        else {
          this.albumIsPullUpLoad = true;
          let res = await cloudsearch({
            keywords: this.kw, //搜索关键词
            limit: 15, //请求回15个
            offset: this.albumList.length, //从第n个开始请求.默认为0
            type: 10, //专辑
          });
          this.albumList.push(...res.result.albums);
          this.bs[4].finishPullUp();
          this.albumIsPullUpLoad = false;
        }
        this.$nextTick(() => {
          this.bs[4].refresh();
        });
      },
      // 加载用户
      async userListLoad() {
        // 如果加载完毕
        if (this.userList.length == this.userCount) {
          this.userLoadFinish = true;
          this.bs[5].closePullUp();
        }
        // 如果没加载完
        else {
          this.userIsPullUpLoad = true;
          let res = await cloudsearch({
            keywords: this.kw, //搜索关键词
            limit: 15, //请求回15个
            offset: this.userList.length, //从第n个开始请求.默认为0
            type: 1002, //用户
          });
          this.userList.push(...res.result.userprofiles);
          this.bs[5].finishPullUp();
          this.userIsPullUpLoad = false;
        }
        this.$nextTick(() => {
          this.bs[5].refresh();
        });
      },
    },
    // 监听器
    watch: {
      active(newV) {
        let list = [
            [],
            this.songList,
            this.playlistList,
            this.artistList,
            this.albumList,
            this.userList,
          ],
          /* countList = [
            0,
            this.songCount,
            this.playlistCount,
            this.artistCount,
            this.albumCount,
            this.userCount,
          ], */
          fnList = [
            {},
            this.songListLoad,
            this.playlistListLoad,
            this.artistListLoad,
            this.albumListLoad,
            this.userListLoad,
          ];
        if (newV > 0 && list[newV].length < 15) {
          // 如果不是第一页,且已加载数量小于15,说明是第一次进入该标签页,需要进行Better scroll实例化操作
          this.bs[newV] = new BScroll(this.bsDOM[newV], {
            click: true, //允许点击事件
            pullUpLoad: true,
          });
          fnList[newV]();
          this.bs[newV].on("pullingUp", fnList[newV]); // 上滑触底后执行懒加载
        }
      },
    },
    // 创建后生命周期
    async created() {
      let searchMultimatch = await getSearchMultimatch(this.kw);
      this.searchMultimatch = searchMultimatch.result;
      let songRes = await cloudsearch({
        keywords: this.kw, //搜索关键词
        limit: 6, //请求回6首
        // offset: 0, //从第0首开始请求.默认为0
        // type: 1, 默认为单曲
      });
      if (songRes.result) {
        this.songList = songRes.result.songs;
        this.songCount = songRes.result.songCount;
      } //接口经常抽风
      let playlistList = await cloudsearch({
        keywords: this.kw, //搜索关键词
        limit: 6, //请求回6个
        // offset: 0, //从第0个开始请求.默认为0
        type: 1000, //歌单
      });
      this.playlistList = playlistList.result.playlists;
      this.playlistCount = playlistList.result.playlistCount;
      let artistList = await cloudsearch({
        keywords: this.kw, //搜索关键词
        limit: 6, //请求回6个
        // offset: 0, //从第0个开始请求.默认为0
        type: 100, //艺人(歌手)
      });
      this.artistList = artistList.result.artists;
      this.artistCount = artistList.result.artistCount;
      let albumList = await cloudsearch({
        keywords: this.kw, //搜索关键词
        limit: 6, //请求回6个
        // offset: 0, //从第0个开始请求.默认为0
        type: 10, //专辑
      });
      this.albumList = albumList.result.albums;
      this.albumCount = albumList.result.albumCount;
      let userList = await cloudsearch({
        keywords: this.kw, //搜索关键词
        limit: 6, //请求回6个
        // offset: 0, //从第0个开始请求.默认为0
        type: 1002, //用户
      });
      this.userList = userList.result.userprofiles;
      this.userCount = userList.result.userprofileCount;
      // 数据全部拿到之后，初始化综合页的Better scroll
      this.$nextTick(() => {
        this.timeIdList.push(
          setTimeout(() => {
            this.bs[0] = new BScroll(this.bsDOM[0], {
              click: true,
            });
            this.bs[0].refresh();
          }, 500)
        );
      });
    },
    // 挂载后生命周期
    mounted() {
      this.bsDOM = document.querySelectorAll(".van-tab__pane-wrapper");
      // 由于vant2选项卡组件中，数据未加载完，就不渲染dom对象，因此挂载后第一时间仍无法获取this.$refs.bsWrapper0，需要使用next tick
    },
    // 销毁前生命周期
    beforeDestroy() {
      this.bs.forEach((i) => {
        i.destroy();
      });
      this.timeIdList.forEach((i) => clearTimeout(i));
    },
    // 组件
    components: {
      playAllTitle,
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
