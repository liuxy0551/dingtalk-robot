const SequelizeAuto = require('sequelize-auto')
const { host, user, password, database, dialect, port } = require('../../../config/db.config')

const options = {
  host,
  dialect,
  directory: 'app/models',  // 指定输出 models 文件的目录
  port,
  additional: {
    timestamps: false
  }
}
const auto = new SequelizeAuto(database, user, password, options)

auto.run(err => {
  if (err) throw err
})

// npm run models
