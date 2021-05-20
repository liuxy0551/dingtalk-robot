var DataTypes = require("sequelize").DataTypes;
var _Robot = require("./Robot");

function initModels(sequelize) {
  var Robot = _Robot(sequelize, DataTypes);


  return {
    Robot,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
