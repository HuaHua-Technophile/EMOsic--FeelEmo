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
//获取搜索推荐
export function getSearchMultimatch(keywords) {
  return request({
    url: `/search/multimatch?keywords=${keywords}`,
    method: "get",
  });
}
// 用户登陆后,喜欢/不喜欢某首歌曲.返回code为200即成功
export function like(id, like) {
  return request({
    url: `/like?id=${id}&like=${like}`,
    method: "get",
  });
}
// 获取专辑
export function getAlbum(id) {
  return request({
    url: `/album?id=${id}`,
    method: "get",
  });
}
// 设置专辑的收藏状态
export function setAlbumSub(t, id) {
  return request({
    url: `/album/sub?t=${t}&id=${id}`,
    method: "get",
  });
}
//搜索,limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
//type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
export function cloudsearch({ keywords, limit = 15, offset = 0, type = 1 }) {
  console.log(
    `/cloudsearch?keywords=${keywords}&limit=${limit}&offset=${offset}&type=${type}`
  );
  return request({
    url: `/cloudsearch?keywords=${keywords}&limit=${limit}&offset=${offset}&type=${type}`,
    method: "get",
  });
}
//收藏歌手
export function setArtistSub(id, t) {
  return request({
    url: `/artist/sub?id=${id}&t=${t}`,
    method: "get",
  });
}
