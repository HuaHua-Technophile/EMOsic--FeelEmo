import request from "./http.js";
// 获取轮播图数据
export function getSearchHot() {
  return request({
    url: "/search/hot",
    method: "get",
  });
}
