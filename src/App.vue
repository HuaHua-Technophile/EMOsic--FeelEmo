<template>
  <div class="w-100 vh-100 noScrollBar">
    <transition name="view">
      <router-view :miniListStatus="miniListStatus"></router-view>
    </transition>
    <!-- 播放核心 -->
    <audio
      ref="playCore"
      :src="songUrl"
      :loop="songLoop == 1"
      @timeupdate="setSchedule($event)"></audio>
    <!-- 底栏(迷你播放器\5大金刚键) -->
    <div class="position-fixed w-100" style="bottom: -1px; z-index: 6">
      <!-- 底部迷你播放器(左右横滑切歌) -->
      <transition name="sideUp">
        <div
          v-show="miniPlayerStatus"
          class="align-items-center position-relative bg-body-secondary ms-3 me-3 pt-1 pb-1 pe-3 rounded-pill"
          style="display: flex; padding-left: 70px; margin-top: -1px">
          <!-- 播放器左侧专辑封面,缓存3张.实现快速切换专辑封面 -->
          <div
            class="position-absolute start-0 bottom-0"
            style="width: 60px; height: 50px">
            <img
              src="./assets/黑胶唱片.png"
              class="float-end"
              style="width: 50px" />
            <transition-group name="sideUp">
              <img
                v-for="(item, index) in miniPLayer"
                :key="index"
                :src="`${item.al.picUrl}?param=100y100`"
                class="h-100 position-absolute rounded"
                :class="[{ 'z-3': index == 1 }]"
                style="width: 50px" />
            </transition-group>
          </div>
          <!-- 播放器中间,左右横滑切歌 -->
          <div class="flex-grow-1 overflow-hidden">
            <!-- 切歌轮播图 -->
            <swiper-container
              ref="miniPlayer"
              :loop="miniLoop"
              space-between="15"
              @click="
                bigPlayerShow = true;
                miniPlayerHidden();
              ">
              <swiper-slide
                v-for="(item, index) in miniPLayer"
                :key="index"
                class="w-100 d-flex align-items-center overflow-hidden text-nowrap">
                <!-- 歌曲名 --><span>{{ item.name }}</span>
                <!-- 歌手 -->
                <div class="opacity-50">
                  <span class="ms-1 me-1">-</span>
                  <span v-for="(j, indexs) in item.ar" :key="indexs"
                    ><span>{{ j.name }}</span
                    ><span v-if="indexs != item.ar.length - 1">/</span></span
                  >
                </div>
              </swiper-slide>
            </swiper-container>
          </div>
          <!-- 播放器右侧环形进度条、歌单列表展开-->
          <div class="ms-3 flex-sherk-0 d-flex align-items-center">
            <!-- 环形进度条和播放暂停按钮 -->
            <div
              class="miniPlayerBtn position-relative rounded-pill"
              @click="Play_Pause()">
              <!-- 正在播放显示暂停按钮,未在播放时显示三角形播放按钮 -->
              <div
                class="position-absolute z-1 top-50 start-50 translate-middle fs-3 text-white">
                <i v-show="isPlaying" class="bi bi-pause"></i>
                <i
                  v-show="!isPlaying"
                  class="bi bi-play-fill"
                  style="margin-left: 2px"></i>
              </div>
              <!-- 环形进度条 -->
              <van-circle
                v-model="currentRate"
                :rate="100"
                :stroke-width="130"
                :size="27"
                :layer-color="'white'"
                :color="'red'"
                class="position-absolute start-50 translate-middle" />
            </div>
            <!-- 迷你播放列表 -->
            <i
              @click="
                miniListStatus = true;
                miniListLoad();
              "
              class="bi bi-music-note-list fs-4 ms-3"></i>
          </div>
        </div>
      </transition>
    </div>
    <!-- 迷你播放列表,在任意页面通用 -->
    <transition name="sideUp">
      <div
        ref="miniListBg"
        v-show="miniListStatus"
        @click="miniListHidden($event)"
        class="miniList w-100 vh-100 position-fixed top-0">
        <!-- 列表主体 -->
        <div
          class="position-absolute start-50 translate-middle-x bg-body rounded-5 overflow-hidden">
          <!-- 头部,加毛玻璃效果 -->
          <div class="miniListHeader position-relative z-3 pt-3 ps-3 pe-3 blur">
            <!-- 当前播放大字(列表歌曲数) -->
            <div class="mb-2">
              <span class="fs-5">当前播放</span>
              <span class="fs-7 opacity-50">({{ songList.length }})</span>
            </div>
            <!-- 头部左侧:循环控制,头部右侧:下载\收藏\清除播放列表 -->
            <div
              class="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <!-- 循环控制\全部下载\歌单收藏\清除播放列表 -->
              <div @click="setSongLoop()">
                <div v-show="songLoop == 0">
                  <i class="iconfont icon-24gl-repeat2 me-2"></i
                  ><span>列表循环</span>
                </div>
                <div v-show="songLoop == 1">
                  <i class="iconfont icon-24gl-repeatOnce2 me-2"></i
                  ><span>单曲循环</span>
                </div>
                <div v-show="songLoop == 2">
                  <i class="iconfont icon-24gl-shuffle me-2"></i
                  ><span>随机播放</span>
                </div>
              </div>
              <!-- 右侧 下载全部,收藏全部,清除歌单 -->
              <div class="d-flex fs-5">
                <i class="bi bi-collection-play me-3"></i>
                <i class="bi bi-trash" @click="clearSongList()"></i>
              </div>
            </div>
          </div>
          <!-- 歌曲item主体,懒加载-->
          <div ref="miniListWrapper" class="miniListWrapper ps-3 pe-3 bg-body">
            <div class="miniListContent">
              <div
                v-for="(item, index) in miniList"
                :key="index"
                class="d-flex justify-content-between mb-3">
                <!-- item左侧 -->
                <div
                  @click="setPlayIndex(index)"
                  class="d-flex align-items-end flex-grow-1 overflow-hidden transition-5"
                  :class="{ 'text-danger': index == playIndex }">
                  <span
                    v-if="item.fee == 1 || item.fee == 4"
                    class="InfoTag text-danger border border-danger d-flex align-items-center">
                    VIP
                  </span>
                  <!-- 歌曲名称 -->
                  <span
                    class="text-nowrap transition-5"
                    :class="[{ 'text-danger': item.id == playSongId }]"
                    >{{ item.name }}</span
                  >
                  <!-- 歌手信息 -->
                  <div class="ms-1 fs-8 opacity-50 text-nowrap">
                    ·
                    <span v-for="(j, indexs) in item.ar" :key="indexs"
                      ><span>{{ j.name }}</span
                      ><span v-if="indexs != item.ar.length - 1">/</span></span
                    >
                  </div>
                </div>
                <!-- item右侧close按钮,将当前歌曲从播放列表移除 -->
                <div
                  class="ms-2 flex-shrink-0"
                  @click="deleteThisSong(item.id, index)">
                  <i class="bi bi-x-lg"></i>
                </div>
              </div>
              <div v-if="miniListFinished" class="text-center fs-8">
                没有更多啦...
              </div>
              <div v-else class="text-center">
                <div v-show="miniListLoading">加载中...</div>
                <div v-show="!miniListLoading">松手加载</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- Big播放器,在任意页面通用 -->
    <transition name="sideUp">
      <big-player
        v-show="bigPlayerShow"
        :songUrl="songUrl"
        :currentTime="currentTime"
        :duration="duration"
        :bigBG="thisSongImg"
        :songName="thisSongName"
        :songAr="thisSongAr"
        :isPlaying="isPlaying"
        :List="miniPLayer"
        :Loop="miniLoop"
        @bigPlayerHidden="bigPlayerHidden"
        @miniListShow="miniListShow"
        @Play_Pause="Play_Pause"
        @setCurrentTime="setCurrentTime"
        @setCurrentRate="setCurrentRate"
        @miniListLoad="miniListLoad"></big-player>
    </transition>
    <!-- vant2分享面板 -->
    <van-share-sheet
      v-model="shareStatus"
      title="依眸,分享你的忧伤"
      cancel-text=""
      :options="options"
      @select="shareEMO"
      class="bg-body text-light" />
    <!-- vant2遮罩层 -->
    <van-overlay
      :show="overlayStatus"
      @click="overlayStatus = false"
      ref="overlay"
      class="justify-content-center align-items-center">
      <transition name="bounceOut">
        <vue-qr
          v-if="overlayStatus"
          :size="250"
          :margin="10"
          :auto-color="true"
          :dot-scale="1"
          :text="shareInfo"
          colorDark="#1a1a23"
          colorLight="#e8e8e8"
          whiteMargin="false"
          class="rounded-4" />
      </transition>
    </van-overlay>
  </div>
</template>
<script>
  import ClipboardJS from "../node_modules/clipboard/dist/clipboard.js";
  import { Toast } from "vant"; //导入vant的悬浮提示框
  import BScroll from "@better-scroll/core"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up"; //导入Better scroll上拉加载插件
  BScroll.use(Pullup); //注册插件
  import { mapState, mapGetters, mapMutations } from "vuex";
  import { getSongUrl, getSongDetail } from "./api/getData.js";
  import throttle from "lodash/throttle"; //lodash节流
  import VueQr from "vue-qr";
  export default {
    data() {
      return {
        songUrl: "", //播放文件地址,方便传入大播放器进行点击下载
        currentRate: 0, //播放核心的当前进度
        currentTime: 0, //播放核心的当前时间
        duration: 0, //播放核心的总时长
        isPlaying: false, //播放核心的当前播放状态
        miniPLayer: [], //迷你播放器的3个歌曲信息存放数组
        miniLoop: false, //迷你播放器的轮播图是否loop
        miniList: [], //迷你播放列表的已加载信息
        miniListStatus: false, //迷你播放列表的显示/隐藏状态
        miniListBS: null, //迷你播放列表的Better scroll实例化对象
        miniListLoading: false, //迷你播放列表加载中,用于辅助提示文本
        miniListFinished: false, //迷你播放列表是否加载完毕
        bigPlayerShow: false, //大播放器显示/隐藏状态
        thisSongImg: "", //当前歌曲专辑图
        thisSongName: "", //当前歌曲名称
        thisSongAr: [], //当前播放歌曲的歌手列表
        options: [
          //{name:"微信",icon:"wechat"},{name:"微博",icon:"weibo"},{name:"分享海报",icon:"poster"},
          { name: "复制链接", icon: "link" },
          { name: "二维码", icon: "qrcode" },
        ], //分享面板配置选项
        cli666: null, //全局剪切板对象
        overlayStatus: false, //全局遮罩层显示/隐藏状态
      };
    },
    // 计算属性
    computed: {
      ...mapState([
        "miniPlayerStatus",
        "songList",
        "songListBackup",
        "playIndex",
        "songLoop",
        "shareInfo",
      ]),
      ...mapGetters(["playSongId"]),
      // 分享面板的显示与隐藏
      shareStatus: {
        get() {
          return this.$store.state.shareStatus;
        },
        set() {
          this.shareHidden();
        },
      },
    },
    //方法
    methods: {
      ...mapMutations([
        "setSongList",
        "songListReduce",
        "setPlayIndex",
        "nextSong",
        "preSong",
        "setSongLoop",
        "miniPlayerHidden",
        "miniPlayerShow",
        "shareHidden",
      ]),
      // 分享面板
      async shareEMO(option) {
        if (option.name == "复制链接") {
          this.cli = new ClipboardJS(".van-share-sheet__option", {
            text: () => this.shareInfo,
          });
          Toast(`复制成功`);
        }
        if (option.name == "二维码") {
          this.overlayStatus = true;
          Toast(`创建二维码成功`);
        }
        this.shareHidden();
      },
      //如果点击的事件对象不是列表本体,而是背景阴影时,隐藏迷你播放列表
      miniListHidden(e) {
        if (e.target == this.$refs.miniListBg) this.miniListStatus = false;
      },
      //点击播放按钮暂停/继续歌曲
      Play_Pause() {
        // 查询本地属性,而不是查询DOM,减少DOM树查询开销
        if (this.isPlaying) {
          this.$refs.playCore.pause();
          this.isPlaying = false;
        } else {
          this.$refs.playCore.play();
          this.isPlaying = true;
        }
      },
      // time update事件,修改本地属性播放进度
      setSchedule: throttle(function (e) {
        this.currentTime = e.target.currentTime;
        this.currentRate = (this.currentTime / this.duration) * 100;
      }, 1000),
      // 传入当前index,加载1~3首歌曲详情,用于渲染底部迷你播放器,同时传值给大播放器
      async miniPlayerChange() {
        // 如果歌曲列表只有1~3首,不需要动态加载
        if (this.songList.length <= 3) {
          this.miniLoop = true;
          let param = this.songList;
          await getSongDetail(param).then((res) => {
            this.miniPLayer = res.songs;
          });
          this.$nextTick(() => {
            this.$refs.miniPlayer.swiper.slideToLoop(this.playIndex, 0, false);
          });
        } else {
          this.miniLoop = false;
          let param = null;
          if (this.playIndex === 0) {
            param = [
              this.songList[this.songList.length - 1],
              this.playSongId,
              this.songList[1],
            ];
          } else if (this.playIndex === this.songList.length - 1) {
            param = [
              this.songList[this.playIndex - 1],
              this.playSongId,
              this.songList[0],
            ];
          } else {
            param = [
              this.songList[this.playIndex - 1],
              this.playSongId,
              this.songList[this.playIndex + 1],
            ];
          }
          await getSongDetail(param).then((res) => {
            this.miniPLayer = res.songs;
            this.$nextTick(() => {
              this.$refs.miniPlayer.swiper.slideToLoop(1, 0, false);
            });
          });
        }
        // 在外部获取到歌曲的封面,因此不用在大播放器中引入api,再次发起查询请求.大播放器只需要专注于歌词功能
        this.miniPLayer.map((item) => {
          if (item.id == this.playSongId) {
            this.thisSongImg = item.al.picUrl;
            this.thisSongName = item.name;
            this.thisSongAr = item.ar;
          }
        });
      },
      //传入整个播放列表,包含所有的歌曲id.用于渲染迷你的歌曲列表.
      async miniListLoad() {
        if (this.songList.length == this.miniList.length) {
          this.miniListFinished = true;
          this.miniListBS.closePullUp();
        } else {
          this.miniListLoading = true;
          let param = this.songList.slice(
            this.miniList.length, //当前长度
            this.miniList.length + 20 //再懒加载20首
          );
          let res = await getSongDetail(param);
          if (res.songs) this.miniList.push(...res.songs);
          this.miniListBS.finishPullUp();
          this.miniListLoading = false;
        }
        this.miniListBS.refresh();
      },
      //点击迷你播放列表中的删除按钮，删除本地歌单中的对应歌曲
      deleteThisSong(id, index) {
        this.songListReduce(id);
        this.miniList.splice(index, 1);
      },
      // 点击迷你播放列表的清除歌单按钮
      clearSongList() {
        this.miniListStatus = false;
        this.setSongList([]);
        this.miniList = [];
      },
      //接收大播放器传出的方法,用于隐藏大播放器
      bigPlayerHidden() {
        this.bigPlayerShow = false;
      },
      // 接收大播放器传出的方法,用以显示迷你播放列表
      miniListShow() {
        this.miniListStatus = true;
      },
      // 接收大播放器传出的时间值,修改当前播放进度
      setCurrentTime(time) {
        this.$refs.playCore.currentTime = time;
      },
      // 接收大播放器传出的百分比值,修改当前播放进度
      setCurrentRate(rate) {
        this.$refs.playCore.currentTime = (this.duration * rate) / 1000;
      },
    },
    // 监听器
    watch: {
      async playSongId(newV) {
        // 如果歌曲id设定为-1,则取消播放,本地播放状态设为暂停
        if (newV == -1) {
          this.$refs.playCore.src = "";
          this.bigPlayerShow = false;
          this.isPlaying = false;
          this.miniPlayerHidden(); //隐藏迷你播放器
        } else {
          let res = await getSongUrl(newV);
          this.songUrl = res.data[0].url;
          this.miniPlayerChange();
          this.miniPlayerShow(); //展示迷你播放器
          // durationchange是时长改变时触发.
          this.$nextTick(() => {
            this.$refs.playCore.oncanplay = () => {
              this.$refs.playCore.play();
              this.duration = this.$refs.playCore.duration;
            };
          });
        }
      },
      // 当歌单变化，就修改为未加载完成
      songList() {
        this.miniListFinished = false;
      },
      // 当循环变为随机循环,或从随机播放切换出来，则清空小列表，使其重新加载
      songLoop(newV, oldV) {
        if (newV === 2 || oldV === 2) {
          this.miniList = [];
          this.miniListLoad();
        }
      },
    },
    // 模板
    components: {
      VueQr,
    },
    // 挂载后生命周期
    mounted() {
      //dom音频添加监听事件,用于反向修改vue中存储的播放状态
      this.$refs.playCore.onplay = () => {
        this.isPlaying = true;
      };
      this.$refs.playCore.onpause = () => {
        this.isPlaying = false;
      };
      //dom音频添加监听事件,播放完毕后,播放下一首
      this.$refs.playCore.onended = () => {
        this.nextSong();
      };
      // 迷你播放器前滑，加载列表上一首
      this.$refs.miniPlayer.addEventListener("slideprevtransitionend", () => {
        this.preSong();
      });
      // 迷你播放器后滑，播放下一首
      this.$refs.miniPlayer.addEventListener("slidenexttransitionend", () => {
        this.nextSong();
      });
      // 初始化Better Scroll
      this.miniListBS = new BScroll(this.$refs.miniListWrapper, {
        click: true, //允许点击事件
        pullUpLoad: true,
      });
      // 上滑触底后执行懒加载
      this.miniListBS.on("pullingUp", this.miniListLoad);
    },
    // 销毁前生命周期
    destroyed() {
      if (this.cli666) this.cli666.destroy(); //销毁剪切板对象
    },
  };
</script>
<style lang="scss">
  .miniList {
    z-index: 7;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.5) 30%);
    > div {
      bottom: 1rem;
      width: calc(100% - 2rem);
    }
  }
  .miniListHeader {
    width: calc(100% - 0.5px);
  }
  .miniListWrapper {
    height: 50vh !important;
  }
  .miniPlayerBtn {
    box-shadow: 0 1px 5px black;
    height: 26px;
    width: 26px;
    > .van-circle {
      top: 48%;
      > svg > path {
        opacity: 0.5;
      }
    }
  }
  .van-overlay {
    z-index: 7 !important;
    display: flex;
  }
</style>
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
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > *:nth-child(2) {
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
</style>
