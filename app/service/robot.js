const Service = require('egg').Service
const db = require('../utils/db')
const { getWhere } = require('../utils')

class RobotService extends Service {
  getRobots () {
    return new Promise(async (resolve, reject) => {
      try {
        const robots = await db.Robot.findAll({
          where: getWhere(),
          raw: true
        })
        resolve(robots)
      } catch (err) {
        reject(err)
      }
    })
  }

  createRobot (robots) {
    return new Promise(async (resolve, reject) => {
      try {
        const list = await db.Robot.bulkCreate(robots)
        resolve(list)
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = RobotService
