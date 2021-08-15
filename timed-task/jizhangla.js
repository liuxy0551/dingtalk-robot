const { apiFunc } = require('./utils')

exports.handler = (event, context, callback) => {
  const url = 'http://dingtalk-robot.liuxianyu.cn/api/jizhangla'
  const params = {
    senderNick: '琉易',
    senderId: '$:LWCP_v1:$QrBRmHUHxbh9UEtbK43yCrWgZV0FDF2K',
    senderStaffId: '2133686213946986'
  }

  apiFunc(url, params, callback)
}

// 0 20 0 * * ?
