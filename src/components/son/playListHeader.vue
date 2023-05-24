<template>
  <div class="playListHeader w-100 ps-3 pe-3 pb-3 blur text-light t-shadow-6">
    <!-- 歌单封面图片\歌单名称\作者\作者头像\歌单标签 -->
    <div class="d-flex mb-3">
      <!--歌单封面图片 -->
      <square-card :size="'25vw'" class="me-3 flex-shrink-0">
        <template #img>
          <img
            v-if="data.coverImgUrl"
            :src="`${data.coverImgUrl}?param=x105y105`" />
        </template>
        <template #playCount>
          <i class="bi bi-play-fill fs-7"></i
          ><span class="fs-8">{{ data.playCount | ConUnit }}</span>
        </template>
      </square-card>
      <!-- 歌单名称\作者\作者头像\歌单标签 -->
      <div class="flex-grow-1 overflow-hidden">
        <!-- 歌单名称 -->
        <div class="d-flex align-items-center mb-2">
          <span class="flex-grow-1 van-ellipsis">{{ data.name }}</span>
          <div
            class="flex-shrink-0 bg-light rounded-pill d-flex align-items-center justify-content-center"
            style="width: 20px; height: 20px; --bs-bg-opacity: 0.1"></div>
        </div>
        <!-- 作者\作者头像\关注 -->
        <div v-if="data.creator" class="d-flex align-items-center mb-2">
          <img
            :src="`${data.creator.avatarUrl}?param=x26y26`"
            class="rounded-pill me-1" />
          <span
            class="me-1 flex-grow-1 overflow-hidden"
            style="--bs-text-opacity: 0.5">
            {{ data.creator.nickname }}
          </span>
          <!-- 已关注\关注按钮 -->
          <span
            v-if="data.creator.followed"
            class="rounded-pill bg-light fs-9 ps-1 pe-1 flex-shrink-0"
            style="--bs-bg-opacity: 0.1">
            <i class="bi bi-chevron-right"></i>
          </span>
          <span
            v-else
            class="rounded-pill bg-light fs-9 flex-shrink-0"
            style="--bs-bg-opacity: 0.1; padding: 2px 6px"
            >+关注</span
          >
        </div>
        <!-- 歌单标签 -->
        <div>
          <span
            v-for="(i, j) in data.tags"
            :key="j"
            class="playListTag rounded bg-light fs-9 me-1"
            >{{ i }}></span
          >
        </div>
      </div>
    </div>
    <!-- 歌单简介 -->
    <div class="d-flex align-items-center mb-3">
      <span
        class="d-inline-block van-ellipsis position-relative fs-7"
        style="--bs-text-opacity: 0.5"
        >{{ data.description }}</span
      ><span class="ms-2">></span>
    </div>
    <!-- 歌单数据:转发,评论,收藏 -->
    <div class="playListData d-flex justify-content-between align-items-center">
      <div
        @click="shareThisList()"
        class="d-flex align-items-center justify-content-center bg-light rounded-pill">
        <font-awesome-icon icon="fa-solid fa-share" />
        <span class="ms-1 fw-bold">{{ data.shareCount | ConUnit }}</span>
      </div>
      <div
        class="d-flex align-items-center justify-content-center bg-light rounded-pill">
        <i class="bi bi-chat-dots-fill"></i>
        <span class="ms-1 fw-bold">{{ data.commentCount | ConUnit }}</span>
      </div>
      <div
        class="d-flex align-items-center justify-content-center bg-danger rounded-pill">
        <i class="bi bi-collection-play me-1"></i>
        <span class="ms-1 fw-bold">{{ data.subscribedCount | ConUnit }}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from "vuex";
  export default {
    props: ["data"],
    // 方法
    methods: {
      ...mapMutations(["setShareInfo", "shareShow"]),
      shareThisList() {
        this.setShareInfo(
          `https://y.music.163.com/m/playlist?id=${this.data.id}`
        );
        this.shareShow();
      },
    },
  };
</script>
<style lang="scss">
  .playListHeader {
    padding-top: 50px;
    width: calc(100% - 0.5px) !important;
  }
  .playListTag {
    padding: 1px 5px 2px;
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
</style>
