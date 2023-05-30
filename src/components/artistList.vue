<template>
  <div class="pt-3">
    <!-- 歌手item -->
    <div
      v-for="(i, index) in detailList"
      :key="index"
      class="mb-3 d-flex align-items-center">
      <img :src="`${i.picUrl}?param=55y55`" class="rounded-pill me-3" />
      <!-- 歌手信息 -->
      <div class="flex-grow-1">
        <!-- 名称 -->
        <div>
          <span v-html="heightLight(i.name, kw)"></span>
          <span v-if="i.alias.length > 0" class="opacity-50"
            >(<span v-html="heightLight(i.alias[0], kw)"></span>)</span
          >
        </div>
        <!-- 数据 -->
        <div class="opacity-50 fs-8">
          {{ i.albumSize }}张专辑,{{ i.mvSize }}个视频
        </div>
      </div>
      <!-- 关注按钮,响应式数据失效 -->
      <div @click="followThis(index)">
        <div v-if="followedList[index]" class="fs-9">
          <i class="bi bi-check"></i>已关注
        </div>
        <div
          v-if="!followedList[index]"
          class="border border-danger rounded-pill text-danger fs-9 ps-1 pe-1">
          <i class="bi bi-plus"></i>关注
        </div>
      </div>
    </div>
    <!-- 懒加载提示 -->
    <div v-if="!hiddenLazyLoad">
      <div v-if="loadFinish" class="text-center fs-8">没有更多啦...</div>
      <div v-else class="text-center">
        <div v-show="isPullUpLoad">加载中...</div>
        <div v-show="!isPullUpLoad">松手加载</div>
      </div>
    </div>
  </div>
</template>
<script>
  import heightLight from "../tool/heightLight.js";
  import { mapState } from "vuex";
  import { setArtistSub } from "../api/getData.js";
  import { Toast } from "vant";
  export default {
    props: ["detailList", "loadFinish", "isPullUpLoad", "hiddenLazyLoad"],
    data() {
      return {
        followedList: [], //关注列表
      };
    },
    // 计算属性
    computed: {
      ...mapState(["kw"]),
    },
    // 方法
    methods: {
      heightLight,
      // 点击关注
      followThis(index) {
        // 取反没有反应,只能用这种方法
        this.followedList[index]
          ? (this.followedList[index] = false)
          : (this.followedList[index] = true);
        Toast("已关注");
      },
    },
    // 监听器
    watch: {
      detailList: {
        deep: true,
        handler(newV) {
          this.followedList = newV.map((i) => i.followed);
        },
      },
    },
    // 销毁前生命周期
    beforeDestroy() {
      this.detailList.forEach((item, index) => {
        if (item.followed != this.followedList[index]) {
          setArtistSub(item.id, this.followedList[index] ? 1 : 2);
        }
      });
    },
  };
</script>
