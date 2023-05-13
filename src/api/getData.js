import request from "./http.js";
// 获取搜索框热搜推广词
export function getSearchHot() {
  return request({
    url: "/search/hot",
    method: "get",
  });
}
//获取发现页数据,包含:轮播图 , 推荐歌单
export function getFind() {
  return request({
    url: "/homepage/block/page",
    method: "get",
  });
}
//获取发现页圆形图标入口列表
export function getBall() {
  return request({
    url: "/homepage/dragon/ball",
    method: "get",
  });
}
//获取歌单列表详情页
export function getPlayListDetail(id) {
  return request({
    url: `/playlist/detail?id=${id}`,
    method: "get",
  });
}
