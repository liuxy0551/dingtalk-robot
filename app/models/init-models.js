var DataTypes = require("sequelize").DataTypes;
var _AccountInfo = require("./AccountInfo");
var _MoneyInfo = require("./MoneyInfo");
var _Robot = require("./Robot");

function initModels(sequelize) {
  var AccountInfo = _AccountInfo(sequelize, DataTypes);
  var MoneyInfo = _MoneyInfo(sequelize, DataTypes);
  var Robot = _Robot(sequelize, DataTypes);


  return {
    AccountInfo,
    MoneyInfo,
    Robot,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
