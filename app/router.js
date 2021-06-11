/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  
  router.get('/api/', controller.home.check)

  router.post('/api/sendMsg', controller.send.sendMsg)
  router.post('/api/baidutj', controller.send.baidutj)
  router.post('/api/jizhangla', controller.send.jizhangla)
  router.post('/api/zhihuhot', controller.send.zhihuhot)
  router.post('/api/juejinhot', controller.send.juejinhot)
  router.post('/api/jijin', controller.send.jijin)
  router.post('/api/gupiao', controller.send.gupiao)

  router.get('/api/getRobots', controller.robot.getRobots)
  router.post('/api/createRobot', controller.robot.createRobot)

  router.post('/api/atRobot', controller.at.atRobot)
}
