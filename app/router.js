/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  
  router.get('/', controller.home.check)
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
  
  router.get('/api/getMorningReports', controller.moneyReport.getMorningReports)
  router.get('/api/getAfternoonReports', controller.moneyReport.getAfternoonReports)
  router.get('/api/getEveningReports', controller.moneyReport.getEveningReports)

  router.get('/api/getMoneyInfos', controller.moneyInfo.getMoneyInfos)
  router.post('/api/createMoneyInfo', controller.moneyInfo.createMoneyInfo)
  router.post('/api/deleteMoneyInfo', controller.moneyInfo.deleteMoneyInfo)
  router.get('/api/getMoneyInfoBySina', controller.moneyInfo.getMoneyInfoBySina)

  router.post('/api/atRobot', controller.at.atRobot)
}
