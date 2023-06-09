<template>
  <div class="playListHeader w-100 ps-3 pe-3 pb-3 blur text-light t-shadow-6">
    <!-- 歌单封面图片\歌单名称\作者\作者头像\歌单标签 -->
    <div class="d-flex mb-3">
      <!--歌单封面图片 -->
      <square-card :size="'25vw'" class="me-3 flex-shrink-0">
        <template #img>
          <img
            v-if="(album && album.picUrl) || (playlist && playlist.coverImgUrl)"
            :src="`${
              album ? album.picUrl : playlist.coverImgUrl
            }?param=105y105`" />
        </template>
      </square-card>
      <!-- 歌单名称\作者\作者头像\歌单标签 -->
      <div class="flex-grow-1 overflow-hidden">
        <!-- 歌单名称 -->
        <div class="mb-2 van-ellipsis">
          {{ album ? album.name : playlist.name }}
        </div>
        <!-- 作者\作者头像\关注 -->
        <div
          v-if="(album && album.artist) || (playlist && playlist.creator)"
          class="d-flex align-items-center mb-2">
          <div @click="toUserHome()">
            <img
              :src="`${
                album ? album.artist.img1v1Url : playlist.creator.avatarUrl
              }?param=26y26`"
              class="rounded-pill me-1" />
            <span
              class="me-1 flex-grow-1 overflow-hidden"
              style="--bs-text-opacity: 0.5">
              {{ album ? album.artist.name : playlist.creator.nickname }}
            </span>
          </div>
          <!-- 已关注\关注按钮 -->
          <div
            @click="changeCreatorFollowed()"
            class="rounded-pill bg-light fs-9 ps-1 pe-1 flex-shrink-0"
            style="--bs-bg-opacity: 0.1">
            <i v-show="creatorFollowed" class="bi bi-chevron-right"></i>
            <span v-show="!creatorFollowed" class="bi bi-plus">关注</span>
          </div>
        </div>
        <!-- 歌单标签 -->
        <div v-if="playlist">
          <span
            v-for="(i, j) in playlist.tags"
            :key="j"
            class="playListTag rounded bg-light fs-9 me-2"
            >{{ i }}</span
          >
        </div>
      </div>
    </div>
    <!-- 歌单简介,点击进入歌单详情 -->
    <div class="d-flex align-items-center mb-3">
      <span
        class="d-inline-block van-ellipsis position-relative fs-7"
        style="--bs-text-opacity: 0.5"
        >{{ album ? album.description : playlist.description }}</span
      ><i class="bi bi-chevron-right ms-2"></i>
    </div>
    <!-- 歌单数据:转发,评论,收藏 -->
    <div class="playListData d-flex justify-content-between align-items-center">
      <div
        @click="shareThisList()"
        class="d-flex align-items-center justify-content-center bg-light rounded-pill">
        <font-awesome-icon icon="fa-solid fa-share" />
        <span v-if="(album && album.info) || playlist" class="ms-1 fw-bold">{{
          album ? album.info.shareCount : playlist.shareCount | ConUnit
        }}</span>
      </div>
      <div
        class="d-flex align-items-center justify-content-center bg-light rounded-pill">
        <i class="bi bi-chat-dots-fill"></i>
        <span v-if="(album && album.info) || playlist" class="ms-1 fw-bold">{{
          album ? album.info.commentCount : playlist.commentCount | ConUnit
        }}</span>
      </div>
      <div
        class="d-flex align-items-center justify-content-center rounded-pill transition-5"
        :class="subscribed ? 'bg-light' : 'bg-danger'"
        :style="[{ '--bs-bg-opacity': subscribed ? 0.1 : 1 }]"
        @click="$emit('changeSubscribe')">
        <span v-show="subscribed" class="iconfont icon-shoucang1"></span>
        <span v-show="!subscribed" class="iconfont icon-shoucang"></span>
        <span v-if="(album && album.info) || playlist" class="ms-1 fw-bold">{{
          subscribed && playlist
            ? playlist.subscribedCount + 1
            : subscribed && album
            ? album.info.likedCount + 1
            : playlist
            ? playlist.subscribedCount
            : album.info.likedCount | ConUnit
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from "vuex";
  import { Follow } from "../../api/getData.js";
  export default {
    props: ["playlist", "album", "subscribed"],
    data() {
      return {
        creatorFollowed: null, //歌单创建者的关注状态
      };
    },
    // 方法
    methods: {
      ...mapMutations(["setShareInfo", "shareShow"]),
      // 点击分享歌单
      shareThisList() {
        if (this.album)
          this.setShareInfo(
            `https://music.163.com/#/album?id=${this.album.id}`
          );
        else
          this.setShareInfo(
            `https://y.music.163.com/m/playlist?id=${this.playlist.id}`
          );
        this.shareShow();
      },
      // 点击跳转歌单创建者主页
      toUserHome() {
        this.$router.push({
          name: "userHome",
          query: {
            id: this.album
              ? this.album.artist.id
              : this.playlist.creator.userId,
          },
        });
      },
      // 点击修改歌单创建者的关注状态
      changeCreatorFollowed() {
        this.creatorFollowed = !this.creatorFollowed;
      },
    },
    // 销毁前生命周期
    beforeDestroy() {
      if (this.album) {
        if (this.creatorFollowed != this.album.artist.followed) {
          let t = this.creatorFollowed ? 1 : 2;
          Follow(this.album.artist.id, t);
        }
      } else {
        if (this.creatorFollowed != this.playlist.creator.followed) {
          let t = this.creatorFollowed ? 1 : 2;
          Follow(this.playlist.creator.userId, t);
        }
      }
    },
  };
</script>
<style lang="scss">
  .playListHeader {
    padding-top: 50px;
    width: calc(100% - 0.5px) !important;
  }
  .playListTag {
    padding: 2px 6px 3px;
    --bs-bg-opacity: 0.1;
  }
  .playListData {
    > div {
      width: 30%;
      padding: 8px 0;
    }
    > div:not(:last-child) {
      --bs-bg-opacity: 0.1;
    }
  }
  .van-share-sheet__title,
  .van-share-sheet__name {
    color: inherit !important;
  }
</style>
