<template>
  <div class="pt-3">
    <div
      v-for="(i, index) in detailList"
      :key="index"
      @click="$router.push({ name: 'album', query: { id: i.id } })"
      class="pb-3 d-flex align-items-center">
      <!-- 专辑封面 -->
      <img :src="`${i.picUrl}?param=70y70`" class="me-2 rounded" />
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
  </div>
</template>
<script>
  import heightLight from "@/tool/heightLight";
  import { mapState } from "vuex";
  export default {
    props: ["detailList"],
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
