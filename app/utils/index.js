
const crypto = require('crypto')
const request = require('request')

/**
 * 获取签名后的 url
 * @param {string} secret 安全设置 加签的秘钥
 * @param {string} url Webhook 地址
 * @returns {string}
 */
const getSignUrl = (secret, url) => {
  const time = new Date().getTime()
  const str = `${ time }\n${ secret }`
  const base = crypto.createHmac('sha256', secret).update(str).digest('base64')
  const sign = encodeURIComponent(base)

  return `${ url }&timestamp=${ time }&sign=${ sign }`
}

// 艾特机器人时 sign
const getAtSign = (appSecret, time) => {
  const str = `${ time }\n${ appSecret }`
  const sign = crypto.createHmac('sha256', appSecret).update(str).digest('base64')

  return sign
}

/**
 * 发送消息
 * @param {string} url 
 * @param {object} msg 
 * @returns {Promise}
 */
const sendMsgToGroup = (msg, service) => {
  return new Promise(async (resolve, reject) => {
    try {
      const robots = await service.robot.getRobots()
      let promiseList = []
      for (let i of robots) {
        promiseList.push(sendOne(getSignUrl(i.secret, i.Webhook), msg, i.name))
      }
      const res = await Promise.all(promiseList)
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })

  function sendOne (url, msg, name) {
    const params = {
      json: msg,
      encoding: 'utf-8',
      headers:{
        'Content-Type': 'application/json'
      }
    }
    return new Promise((resolve, reject) => {
      request.post(url, params, (error, response, body) => {
          if (!error && response.statusCode == 200) {
            resolve({ ...body, name })
          } else {
            reject({ ...error, name })
          }
        }
      )
    })
  }
}

// 获取当前时间 2021-05-20 09:18:23
const getNow = () => {
  const date = getDate()
  let hour = new Date().getHours()
  let minute = new Date().getMinutes()
  let second = new Date().getSeconds()
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second

  return `${ date } ${ hour }:${ minute }:${ second }`
}

// 获取日期，num 为 0 时返回今天，为 -1 时返回昨天，为 1 时返回明天，如 20210520
const getDate = (num = 0) => {
  const time = new Date().getTime() + 24 * 60 * 60 * 1000 * num
  const year = new Date(time).getFullYear()
  const month = new Date(time).getMonth() + 1
  const date = new Date(time).getDate()

  return `${ year }${ month < 10 ? '0' + month : month }${ date < 10 ? '0' + date : date }`
}

// 接收秒数，返回可读时间，如传入 185，返回 00:03:05
const getTimeStr = (second) => {
  let minute = Math.floor(second / 60)
  let hour = Math.floor(minute / 60)
  minute = minute - hour * 60
  let sec = second - hour * 60 * 60 - minute * 60
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  sec = sec < 10 ? '0' + sec : sec

  return `${ hour }:${ minute }:${ sec }`
}

/**
 * 查询数据时排除被删除的行
 * @param {Object} params 
 */
 const getWhere = (params = {}) => {
  return { isDelete: 0, ...params }
}

// 获取单个 uuid
const getUuid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		let r = Math.random() * 16 | 0, // 随机数取整
			v = c == 'x' ? r : (r & 0x3 | 0x8)
		return v.toString(16)
	})
}

// 设置 ctx.body
const setCtxBody = (code = 200, data, message = '成功', extraParams) => {
	code !== 200 && console.log(code, data)
	return { code, data, message, ...extraParams }
}

module.exports = {
  getSignUrl,
  getAtSign,
  sendMsgToGroup,
  getNow,
  getDate,
  getTimeStr,
  getWhere,
  getUuid,
  setCtxBody
}
