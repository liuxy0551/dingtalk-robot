var DataTypes = require("sequelize").DataTypes;
var _MoneyInfo = require("./MoneyInfo");
var _Robot = require("./Robot");

function initModels(sequelize) {
  var MoneyInfo = _MoneyInfo(sequelize, DataTypes);
  var Robot = _Robot(sequelize, DataTypes);


  return {
    MoneyInfo,
    Robot,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
