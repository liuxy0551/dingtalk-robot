const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AccountInfo', {
    accountInfoId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      comment: "账户信息表id"
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除 0 未删除，1 已删除"
    },
    jizhanglaUserId: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "记账啦 userId"
    },
    baidutjUsername: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "百度统计用户名"
    },
    baidutjPassword: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "百度统计密码"
    },
    baidutjToken: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "百度统计 token"
    },
    baidutjSiteId: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "百度统计 siteId"
    },
    senderId: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "群里@机器人时钉钉返回的 加密的发送者ID"
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
    tableName: 'AccountInfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "accountInfoId" },
        ]
      },
    ]
  });
};
