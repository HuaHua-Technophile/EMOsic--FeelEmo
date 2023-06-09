<template>
  <div ref="searchInputView" class="searchInput-view w-100 h-100">
    <!-- 滚动部分 -->
    <div
      style="padding-top: 75px"
      :class="[{ 'h-miniPlayer': miniPlayerStatus }]">
      <!-- 搜索建议 -->
      <div class="ms-3 me-3">
        <div
          v-for="(i, index) in suggestList"
          :key="index"
          class="mt-3 pb-3"
          @click="searchThis(i)"
          :class="{ 'border-bottom': index < suggestList.length - 1 }">
          <i class="bi bi-search me-3"></i>
          <span v-html="heightLight(i, seachWord)"></span>
        </div>
      </div>
      <!-- 搜索历史 -->
      <div v-if="searchHistory.length > 0" class="ms-3 me-3">
        <div class="d-flex justify-content-between ps-1 pe-1 mb-3">
          <span class="fs-7">搜索历史</span>
          <i class="bi bi-trash" @click="searchHistory = []"></i>
        </div>
        <transition-group tag="div" name="bounceOut" class="d-flex flex-wrap">
          <span
            v-for="(i, index) in searchHistory"
            :key="index"
            @click="searchThis(i)"
            class="searchHistory me-2 mb-3 rounded-pill bg-body-secondary"
            >{{ i }}</span
          >
        </transition-group>
      </div>
      <!-- 热搜榜 -->
      <div class="searchHot ms-3 me-3 ps-3 pe-3 rounded-3 bg-body-secondary">
        <div class="fs-5 pt-2 pb-2 mb-2 border-bottom">热搜榜</div>
        <div
          v-for="(i, index) in searchHot"
          :key="index"
          @click="searchThis(i.searchWord)"
          class="d-flex align-items-center mb-3">
          <span
            class="d-flex justify-content-center me-3"
            style="width: 20px"
            :class="{ 'text-danger fw-bold': index < 3 }"
            >{{ index + 1 }}</span
          >
          <span class="flex-grow-1">{{
            i.content ? i.content : i.searchWord
          }}</span>
          <img v-if="i.iconUrl" :src="`${i.iconUrl}`" style="height: 15px" />
        </div>
      </div>
    </div>
    <!-- 顶部搜索框 -->
    <div
      class="position-fixed align-items-center top-0 w-100 pt-4 ps-3 pe-3 z-3 blur d-flex">
      <!-- 返回图标 -->
      <i
        class="flex-shrink-0 bi bi-chevron-left fs-2 me-3"
        @click="$router.go(-1)"></i>
      <!-- 真正的input框 -->
      <div class="flex-grow-1 d-flex align-items-center position-relative">
        <i class="bi bi-search position-absolute" style="left: 18px"></i>
        <input
          v-model="seachWord"
          @keyup.enter="search()"
          @input="searchSuggest()"
          type="text"
          class="searchInput bg-body-secondary border-0 outline-0 w-100 m-0 rounded-pill"
          style="--bs-bg-opacity: 0.6"
          placeholder="搜索属于你的依眸" />
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from "@better-scroll/core";
  import { mapMutations, mapState } from "vuex";
  import { getSearchHotDetail, getSearchSuggest } from "@/api/getData.js";
  import debounce from "lodash/debounce.js"; //lodash防抖
  import heightLight from "../tool/heightLight.js";
  export default {
    data() {
      return {
        bs: null, //Better scroll实例化对象
        searchHistory: [], //搜索历史
        searchHot: [], //热搜榜
        seachWord: "", //搜索关键词
        suggestList: [], //搜索建议列表
      };
    },
    // 计算属性
    computed: {
      ...mapState(["Theme", "miniPlayerStatus"]),
    },
    // 方法
    methods: {
      ...mapMutations(["setKw"]),
      // 搜索
      search() {
        if (this.seachWord != "") {
          this.searchHistory.splice(19, 1);
          this.searchHistory.unshift(this.seachWord);
          this.setKw(this.seachWord);
          this.$router.push({
            name: "searchResult",
          });
        }
      },
      // 点击热搜榜或搜索历史后,进行搜索
      searchThis(text) {
        this.seachWord = text;
        this.searchHistory = this.searchHistory.filter((i) => i != text);
        this.search();
      },
      // 输入框搜索建议
      searchSuggest: debounce(async function () {
        if (this.seachWord != "") {
          let SearchSuggest = await getSearchSuggest(this.seachWord);
          if (SearchSuggest.result.allMatch) {
            this.suggestList = SearchSuggest.result.allMatch.map(
              (i) => i.keyword
            );
          } else this.suggestList = [`${this.seachWord}`];
        } else this.suggestList = [];
        this.$nextTick(() => {
          this.bs.refresh();
        });
      }, 500),
      heightLight,
    },
    // 创建时生命周期
    async created() {
      let SearchHotDetail = await getSearchHotDetail();
      this.searchHot = SearchHotDetail.data;
      this.searchHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      // 数据全部更新后重新计算Better scroll,必须加延迟,否则会因为路由切换动画而出错
      this.$nextTick(() => {
        setTimeout(() => {
          this.bs.refresh();
        }, 1000);
      });
    },
    // 挂载后生命周期
    mounted() {
      this.bs = new BScroll(this.$refs.searchInputView, {
        click: true,
      });
    },
    // 销毁前生命周期
    beforeDestroy() {
      localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
      this.bs.destroy();
    },
  };
</script>
<style lang="scss">
  .searchInput {
    height: 37.4px;
    padding: 0 0 0 50px;
  }
  .searchHistory {
    padding: 5px 10px;
  }
</style>
