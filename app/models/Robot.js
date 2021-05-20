const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Robot', {
    robotId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      comment: "机器人表id"
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除 0 未删除，1 已删除"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "机器人名称"
    },
    secret: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "秘钥"
    },
    Webhook: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      comment: "Webhook地址"
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新时间"
    }
  }, {
    sequelize,
    tableName: 'Robot',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "robotId" },
        ]
      },
    ]
  });
};
