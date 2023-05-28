<template>
  <div class="cardHr" :class="Theme">
    <!-- title信息栏 -->
    <swiper-card-title
      :data="data.uiElement"
      @playThisResource="playThisResource"></swiper-card-title>
    <!-- 横板轮播图 -->
    <swiper-container slides-per-view="auto" class="ps-3 pt-3">
      <swiper-slide v-for="(i, index) in data.creatives" :key="index">
        <div
          v-for="(j, indexs) in i.resources"
          :key="indexs"
          @click="clickThis(j)"
          class="d-flex align-items-center"
          :class="{ 'mb-3': indexs != 2 }">
          <img
            :src="`${j.uiElement.image.imageUrl}?param=74y74`"
            class="img rounded-3 me-3" />
          <div>
            <div class="mainTitle fw-bold">
              <span class="van-multi-ellipsis--l2">{{
                j.uiElement.mainTitle.title
              }}</span>
            </div>
            <div v-if="j.uiElement.subTitle">
              <span class="subTitle fs-8 text-danger rounded-3 me-1">
                {{ j.uiElement.subTitle.title }} </span
              ><span
                v-if="j.resourceExtInfo"
                class="fs-7 text-body-secondary"
                >{{ j.resourceExtInfo.artists[0].name }}</span
              >
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
<script>
  import { mapMutations, mapState } from "vuex";
  export default {
    props: ["data"],
    data() {
      return {
        songList: [],
      };
    },
    // 计算属性
    computed: {
      ...mapState(["Theme"]),
    },
    // 方法
    methods: {
      ...mapMutations(["setSongList", "setPlayIndex", "setPlaySongId"]),
      // 点击播放整个歌单
      playThisResource() {
        this.setSongList(this.data.resourceIdList);
        this.setPlayIndex(0);
      },
      // 未登陆时展示"为您定制精选歌曲""新歌新碟",已登录后展示"为您推荐",点击item播放某个歌曲,或跳转某个歌单/专辑
      clickThis(obj) {
        // 如果点击的item是歌曲,则播放歌曲
        if (obj.resourceType == "song") {
          // 如果有现成的歌单列表,说明点击的是"为您精选歌曲",直接传入即可,否则的话需要遍历
          this.setSongList(
            this.data.resourceIdList ? this.data.resourceIdList : this.songList
          );
          this.setPlaySongId(obj.resourceId);
        }
        // 如果点击的item是专辑,则跳转专辑
        if (obj.resourceType == "album") {
          this.$router.push({
            name: "album",
            query: { id: obj.resourceId },
          });
        }
        // 如果点击的item是数字专辑,则打开数字专辑url
        if (obj.resourceType == "digitalAlbum") {
          // window.location.href = obj.action;
          window.location.href = `https://y.music.163.com/digitalbum/detail/${obj.resourceId}?referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one&nm_style=sbt`;
        }
      },
    },
    // 创建时生命周期
    created() {
      // 如果在list轮播图中,拿到的数据不包含'resourceIdList',则表明是"新歌新碟"部分,需要自行遍历24个item中哪些是歌曲
      if (!this.data.resourceIdList) {
        this.data.creatives.forEach((i) => {
          i.resources.forEach((j) => {
            if (j.resourceType == "song") this.songList.push(j.resourceId);
          });
        });
      }
    },
  };
</script>
<style lang="scss" scoped>
  swiper-slide {
    width: 85vw;
    margin-right: 5vw;
  }
  .img {
    width: 21%;
  }
  .mainTitle {
    font-size: 17px;
  }
  .subTitle {
    padding: 1px 5px 2px 5px;
    background: rgba(var(--bs-danger-rgb), 0.1);
  }
</style>
