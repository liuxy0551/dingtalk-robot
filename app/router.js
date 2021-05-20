/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  
  router.get('/api/', controller.home.check)

  router.post('/api/sendMsg', controller.send.sendMsg)
  router.post('/api/baidutj', controller.send.baidutj)
  router.post('/api/jizhangla', controller.send.jizhangla)

  router.get('/api/getRobots', controller.robot.getRobots)
  router.post('/api/createRobot', controller.robot.createRobot)
}
