const { apiFunc } = require('./utils')

exports.handler = (event, context, callback) => {
  // jijin 基金, gupiao 股票, baidutj 百度统计, jizhangla 记账啦, zhihuhot 知乎热榜, juejinhot 掘金热榜
  const urlList = ['http://dingtalk-robot.liuxianyu.cn/api/jizhangla']
  const params = {
    senderNick: '琉易',
    senderId: '$:LWCP_v1:$QrBRmHUHxbh9U3245346356trWgZV0FDF2K',
    senderStaffId: '21336862123452345946986'
  }

  for (let url of urlList) {
    apiFunc(url, params, callback)
  }
}
