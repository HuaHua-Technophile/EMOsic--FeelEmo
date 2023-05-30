<template>
  <div class="pt-3">
    <!-- 专辑item -->
    <div
      v-for="(i, index) in detailList"
      :key="index"
      @click="$router.push({ name: 'album', query: { id: i.id } })"
      class="pb-3 d-flex align-items-center">
      <!-- 专辑封面 -->
      <img :src="`${i.picUrl}?param=70y70`" class="me-3 rounded" />
      <!-- 专辑信息 -->
      <div class="flex-shrink-1 overflow-hidden">
        <div v-html="heightLight(i.name, kw)" class="van-ellipsis"></div>
        <div class="fs-8 opacity-50">
          <span
            v-for="(j, indexs) in i.artists"
            :key="indexs"
            v-html="
              heightLight(
                indexs < i.artists.length - 1 ? j.name + ' / ' : j.name,
                kw
              )
            "></span>
          <span class="ms-2">{{
            new Date(i.publishTime).toLocaleDateString()
          }}</span>
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
  import heightLight from "@/tool/heightLight";
  import { mapState } from "vuex";
  export default {
    props: ["detailList", "loadFinish", "isPullUpLoad", "hiddenLazyLoad"],
    // 计算属性
    computed: {
      ...mapState(["kw"]),
    },
    // 方法
    methods: {
      heightLight,
    },
  };
</script>
