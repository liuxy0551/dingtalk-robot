const { apiFunc } = require('./utils')

exports.handler = (event, context, callback) => {
  // jijin 基金, gupiao 股票
  const urlList = ['http://dingtalk-robot.liuxianyu.cn/api/jijin', 'http://dingtalk-robot.liuxianyu.cn/api/gupiao']
  const paramsList = [
    {
      senderNick: '琉易',
      senderId: '$:LWCP_v1:$QrBRmHUHxbh9UEtbK43yCrWgZV0FDF2K',
      senderStaffId: '2133686213946986',
      isTimedTask: true,
      isDev: true
    },
    {
      senderNick: '风巽',
      senderId: '$:LWCP_v1:$mf8Av6QVPyYNCnimFtvhQn2fz8Uccl9x',
      senderStaffId: '24285333671236719',
      isTimedTask: true
    },
    {
      senderNick: '三木',
      senderId: '$:LWCP_v1:$96/Gh3CsPXxiL0+g1+osFCzKHONNcfHX',
      senderStaffId: '2355425553-657112227',
      isTimedTask: true
    },
    {
      senderNick: '帽子',
      senderId: '$:LWCP_v1:$zevYPZhdmykepIUztVROzA==',
      senderStaffId: '0124426341771251',
      isTimedTask: true
    }
  ]

  for (let params of paramsList) {
    for (let url of urlList) {
        apiFunc(url, params, callback)
    }
  }
}

// 0 35 1,3,5,6 ? * MON-FRI
