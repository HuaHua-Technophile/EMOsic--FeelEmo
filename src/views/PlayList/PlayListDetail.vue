<template>
  <div></div>
</template>
<script>
  import { getPlayListDetail } from "../../api/getData.js";
  export default {
    data() {
      return {};
    },
    created() {
      //获取
      getPlayListDetail(this.$route.query.id).then((res) => {
        console.log(res);
      });
    },
  };
</script>
