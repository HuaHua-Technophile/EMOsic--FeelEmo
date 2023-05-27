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
// 获取歌单所有歌曲
export function getPlayListTrackAll(id, limit = 15, offset = 0) {
  return request({
    url: `/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`,
    method: "get",
  });
}
// standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 鲸云臻音, jymaster => 鲸云母带
export function getSongUrl(id, level) {
  let quality = null;
  level == 7
    ? (quality = "jymaster")
    : level == 6
    ? (quality = "jyeffect")
    : level == 5
    ? (quality = "hires")
    : level == 4
    ? (quality = "lossless")
    : level == 3
    ? (quality = "exhigh")
    : level == 2
    ? (quality = "higher")
    : (quality = "standard");
  return request({
    url: `/song/url/v1?id=${id}&level=${quality}`,
    method: "get",
  });
}
// 获取歌曲详情
export function getSongDetail(id) {
  return request({
    url: `/song/detail?ids=${id}`,
    method: "get",
  });
}
//获取歌词
export function getLyric(id) {
  return request({
    url: `/lyric?id=${id}`,
    method: "get",
  });
}
//获取二维码key
export function getLoginQrKey() {
  return request({
    url: "/login/qr/key",
    method: "post",
  });
}
//根据二维码key生成二维码图片
export function getLoginQrCreate(data) {
  return request({
    url: "/login/qr/create",
    method: "post",
    data,
  });
}
// 二维码检测扫码状态接口
export function getLoginQrCheck(data) {
  return request({
    url: "/login/qr/check",
    method: "post",
    data,
  });
}
// 获取登陆状态
export function getLoginStatus() {
  return request({
    url: "/login/status",
    method: "get",
  });
}
// 获取用户详情
export function getUserDetail(uid) {
  return request({
    url: `/user/detail?uid=${uid}`,
    method: "get",
  });
}
// 获取已登录后自己的VIP信息
export function getVipInfo() {
  return request({
    url: "/vip/info",
    method: "get",
  });
}
// 获取某用户喜欢的音乐
export function getLikelist(uid) {
  return request({
    url: `/likelist?uid=${uid}`,
    method: "get",
  });
}
//关注用户
export function Follow(id, t) {
  return request({
    url: `/follow?id=${id}&t=${t}`,
    method: "get",
  });
}
//获取用户歌单
export function getUserPlaylist(uid) {
  return request({
    url: `/user/playlist?uid=${uid}`,
    method: "get",
  });
}
// 修改歌单的订阅状态
export function setPlaylistSubscribe(t, id) {
  return request({
    url: `/playlist/subscribe?t=${t}&id=${id}`,
    method: "get",
  });
}
// 获取热搜榜
export function getSearchHotDetail() {
  return request({
    url: "/search/hot/detail",
    method: "get",
  });
}
// 移动端搜索建议
export function getSearchSuggest(keywords) {
  return request({
    url: `/search/suggest?keywords=${keywords}&type=mobile`,
    method: "get",
  });
}
