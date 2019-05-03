export default function (num) {
  // 時間戳為10位需*1000，時間戳為13位的話不需乘1000
  let date = new Date(num * 1000)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  let dateString = Y + M + D
  return dateString
}
