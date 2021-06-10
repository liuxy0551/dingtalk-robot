const Service = require('egg').Service
const db = require('../utils/db')
const { getWhere } = require('../utils')

class RobotService extends Service {
  async getRobots () {
    try {
      const robots = await db.Robot.findAll({
        where: getWhere(),
        raw: true
      })
      return robots
    } catch (err) {
      throw err
    }
  }

  async createRobot (robots) {
    try {
      const list = await db.Robot.bulkCreate(robots)
      return list
    } catch (err) {
      throw err
    }
  }
}

module.exports = RobotService
