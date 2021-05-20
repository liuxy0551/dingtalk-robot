const Controller = require('egg').Controller
const { getUuid, setCtxBody } = require('../utils')

class RobotController extends Controller {
  // 获取钉钉群列表
  async getRobots () {
    try {
      const res = await this.ctx.service.robot.getRobots()
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
  
  // 新增钉钉群机器人
  async createRobot () {
    try {
      let { robots } = this.ctx.request.body
      robots = robots.map(i => { return { ...i, robotId: getUuid() } })
      const res = await this.ctx.service.robot.createRobot(robots)
      this.ctx.body = setCtxBody(200, res)
    } catch (err) {
      this.ctx.body = setCtxBody(500, err, '系统错误')
    }
  }
  
}

module.exports = RobotController
