export default function (data) {
  let m = parseInt(data / 60); //分钟
  let s = parseInt(data % 60); //秒
  return `${`${m}`.padStart(2, "0")}:${`${s}`.padStart(2, "0")}`;
}
