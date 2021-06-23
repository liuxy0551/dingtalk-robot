const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MoneyInfo', {
    moneyInfoId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      comment: "理财信息表id"
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除 0 未删除，1 已删除"
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "基金 jijin, 股票 gupiao"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "基金或股票的名称"
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "基金或股票的代码"
    },
    senderId: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "群里@机器人时钉钉返回的 加密的发送者ID"
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "序号"
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
    tableName: 'MoneyInfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "moneyInfoId" },
        ]
      },
    ]
  });
};
