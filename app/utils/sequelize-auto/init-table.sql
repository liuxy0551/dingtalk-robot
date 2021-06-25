DROP TABLE IF EXISTS `Robot`;
CREATE TABLE `Robot` (
  `robotId` varchar(100) NOT NULL COMMENT '机器人表id',
  `isDelete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除 0 未删除，1 已删除',
  `name` varchar(100) NULL COMMENT '机器人名称',
  `secret` varchar(200) NULL COMMENT '秘钥',
  `Webhook` varchar(1000) NULL COMMENT 'Webhook地址',
  `type` varchar(10) NULL COMMENT '管理员使用 admin, 用户 user',
  `createTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`robotId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '机器人表';


DROP TABLE IF EXISTS `MoneyInfo`;
CREATE TABLE `MoneyInfo` (
  `moneyInfoId` varchar(100) NOT NULL COMMENT '理财信息表id',
  `isDelete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除 0 未删除，1 已删除',
  `type` varchar(10) NULL COMMENT '基金 jijin, 股票 gupiao',
  `name` varchar(100) NULL COMMENT '基金或股票的名称',
  `code` varchar(100) NULL COMMENT '基金或股票的代码',
  `senderId` varchar(200) NULL COMMENT '群里@机器人时钉钉返回的 加密的发送者ID',
  `sort` int(11) NULL COMMENT '序号',
  `createTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`moneyInfoId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '理财信息表';


DROP TABLE IF EXISTS `AccountInfo`;
CREATE TABLE `AccountInfo` (
  `accountInfoId` varchar(100) NOT NULL COMMENT '账户信息表id',
  `isDelete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除 0 未删除，1 已删除',
  `jizhanglaUserId` varchar(200) NULL COMMENT '记账啦 userId',
  `baidutjUsername` varchar(200) NULL COMMENT '百度统计用户名',
  `baidutjPassword` varchar(200) NULL COMMENT '百度统计密码',
  `baidutjToken` varchar(200) NULL COMMENT '百度统计 token',
  `baidutjSiteId` varchar(200) NULL COMMENT '百度统计 siteId',
  `senderId` varchar(200) NULL COMMENT '群里@机器人时钉钉返回的 加密的发送者ID',
  `createTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`accountInfoId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '账户信息表';
