// 获取日期，num 为 0 时返回今天，为 -1 时返回昨天，为 1 时返回明天，如 20210520
const getDate = (num = 0) => {
  const time = new Date().getTime() + 24 * 60 * 60 * 1000 * num
  const year = new Date(time).getFullYear()
  const month = new Date(time).getMonth() + 1
  const date = new Date(time).getDate()

  return `${ year }-${ month < 10 ? '0' + month : month }-${ date < 10 ? '0' + date : date }`
}

// 获取当前时间 2021-05-20 09:18:23
// 函数计算运行时使用 UTC 时间，比北京时间减少了8小时
const getNow = (hours = 8) => {
  const date = getDate()
  let hour = new Date().getHours() + hours
  let minute = new Date().getMinutes()
  let second = new Date().getSeconds()
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second

  return `${ date } ${ hour }:${ minute }:${ second }`
}

module.exports = {
  getNow
}
