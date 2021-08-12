const fs = require('fs')
const crypto = require('crypto')
const request = require('request')
const db = require('./db')

/**
 * 获取签名后的 url
 * @param {string} secret 安全设置 加签的秘钥
 * @param {string} Webhook Webhook 地址
 * @returns {string}
 */
const getSignUrl = (Webhook, secret) => {
  let signStr = ''
  if (secret) {
    const time = new Date().getTime()
    const str = `${ time }\n${ secret }`
    const base = crypto.createHmac('sha256', secret).update(str).digest('base64')
    const sign = encodeURIComponent(base)
    signStr = `&timestamp=${ time }&sign=${ sign }`
  }

  return `${ Webhook }${ signStr }`
}

// 艾特机器人时 sign
const getAtSign = (appSecret, time) => {
  const str = `${ time }\n${ appSecret }`
  const sign = crypto.createHmac('sha256', appSecret).update(str).digest('base64')

  return sign
}

/**
 * 发送消息
 * 企业内部机器人，只用 Webhook 发送消息，此时不从数据库查询机器人列表
 */
const sendMsgToGroup = async (isDev = false, msg, service, robots, senderStaffId = '') => {
  if (msg === null) return
  try {
    let robotList = []
    if (robots && robots.length) {
      robotList = robots
    } else { // 没有专属群则发送到大群（钉小弟全员群）
      const list = await service.robot.getRobots(isDev ? 'isDev' : senderStaffId)
      robotList = list.length ? list : await service.robot.getRobots()
    }

    let promiseList = []
    for (let i of robotList) {
      promiseList.push(sendOne(getSignUrl(i.Webhook, i.secret), msg, i.name))
    }
    const res = await Promise.all(promiseList)
    return res
  } catch (err) {
    throw err
  }

  function sendOne (url, msg, name) {
    const params = {
      json: msg,
      encoding: 'utf-8',
      headers: {
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
// 函数计算运行时使用 UTC 时间，比北京时间减少了8小时
const getNow = (hours = 8) => {
  const date = getDate(0, '-')
  let hour = new Date().getHours() + hours
  let minute = new Date().getMinutes()
  let second = new Date().getSeconds()
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second

  return `${ date } ${ hour }:${ minute }:${ second }`
}

// 获取日期，num 为 0 时返回今天，为 -1 时返回昨天，为 1 时返回明天，如 20210520
const getDate = (num = 0, tag = '') => {
  const time = new Date().getTime() + 24 * 60 * 60 * 1000 * num
  const year = new Date(time).getFullYear()
  const month = new Date(time).getMonth() + 1
  const date = new Date(time).getDate()

  return `${ year }${ tag }${ month < 10 ? '0' + month : month }${ tag }${ date < 10 ? '0' + date : date }`
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

/**
 * 查询数据时排序，默认 按 sort 升序(ASC 升序，DESC 降序)
 * @param {Array} arr 
 */
const getOrder = (arr = [['sort', 'ASC']]) => {
  return arr
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

// 红涨绿跌 #ff0000 #007500
const getColorNum = (suffix, num, flag) => {
  let tempFlag = Number(flag ? flag : num)
  if (tempFlag > 0) {
    return `<font color=#ff0000>${ num }${ suffix }</font>`
  } else if (tempFlag < 0) {
    return `<font color=#007500>${ num }${ suffix }</font>`
  } else {
    return `${ num }${ suffix }`
  }
}

// 获取 package.json 中的版本号
const getVersion = () => {
  const packageJson = fs.readFileSync(`${process.cwd()}/package.json`)
  return JSON.parse(packageJson).version
}

// 获取用户的多个账号信息
const getAccountInfo = async ({ senderId }, config, type) => {
  const accountInfo = await db.AccountInfo.findOne({
    where: getWhere({ senderId }),
    raw: true
  })

  return new Promise((resolve, reject) => {
    if (accountInfo) {
      const { jizhanglaUserId, baidutjUsername, baidutjPassword, baidutjToken, baidutjSiteId } = accountInfo
    
      let result = {}
      switch (type) {
        case 'jizhangla':
          result = { ...config, userId: jizhanglaUserId }
          break
        case 'baidutj':
          const header = {
            username: baidutjUsername,
            password: baidutjPassword,
            token: baidutjToken
          }
          let { body } = config
          body = { ...body, siteId: baidutjSiteId }
    
          result = { ...config, header, body }
          break
        default:
          break
      }
      resolve(result)
    } else {
      reject(404)
    }
  })
}

const getDefaultText = `您可以这样问：\n - 我的理财 \n - 基金 \n - 股票 \n - 财经早报 \n - 知乎热榜 \n - 掘金前端热榜 \n\n当前版本: v${ getVersion() }`

// 财经报告的图片链接
const reportPicUrl = 'http://media.liuxianyu.cn/money-report-logo.png'

module.exports = {
  getSignUrl,
  getAtSign,
  sendMsgToGroup,
  getNow,
  getDate,
  getTimeStr,
  getWhere,
  getOrder,
  getUuid,
  setCtxBody,
  getColorNum,
  getVersion,
  getAccountInfo,
  getDefaultText,
  reportPicUrl
}
