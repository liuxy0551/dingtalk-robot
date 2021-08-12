const http = require('http')
const { getNow } = require('./utils')

exports.handler = (event, context, callback) => {
    http.get('http://dingtalk-robot.liuxianyu.cn/api/getMorningReport', (data) => {
        let str = ''
        data.on('data', (chunk) => {
            str+=chunk;//监听数据响应，拼接数据片段
        })
        data.on('end', () => {
            console.log(getNow(), str.toString())
            callback()
        })
    })
}
