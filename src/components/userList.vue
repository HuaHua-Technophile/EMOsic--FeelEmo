<template>
  <div class="pt-3">
    <div
      v-for="(i, index) in detailList"
      :key="index"
      @click="$router.push({ name: 'userHome', query: { id: i.userId } })"
      class="mb-3 d-flex align-items-center">
      <div class="position-relative">
        <img :src="`${i.avatarUrl}?param=55y55`" class="rounded-pill me-2" />
        <div
          class="position-absolute end-0 bottom-0 translate-middle"
          style="width: 15px; height: 15px">
          <img
            v-if="i.avatarDetail"
            :src="`${i.avatarDetail.identityIconUrl}?param=15y15`"
            class="w-100 h-100" />
        </div>
      </div>
      <!-- 用户信息 -->
      <div class="flex-grow-1">
        <!-- 名称 -->
        <div>
          <span v-html="heightLight(i.nickname, kw)"></span>
          <i
            v-if="i.gender == 1"
            class="ms-2 bi bi-gender-male"
            style="color: #d63384"></i>
          <i
            v-if="i.gender == 2"
            class="ms-2 bi bi-gender-female"
            style="color: #0d6efd"></i>
        </div>
        <!-- 个性签名 -->
        <div class="fs-8 opacity-50">{{ i.signature }}</div>
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
  </div>
</template>
<script>
  import { Toast } from "vant";
  import heightLight from "../tool/heightLight.js";
  import { mapState } from "vuex";
  import { Follow } from "../api/getData.js";
  export default {
    props: ["detailList"],
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
          Follow(item.id, this.followedList[index] ? 1 : 2);
        }
      });
    },
  };
</script>
