DROP TABLE IF EXISTS `Robot`;
CREATE TABLE `Robot` (
  `robotId` varchar(100) NOT NULL COMMENT '机器人表id',
  `isDelete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除 0 未删除，1 已删除',
  `name` varchar(100) NULL COMMENT '机器人名称',
  `secret` varchar(200) NULL COMMENT '秘钥',
  `Webhook` varchar(1000) NULL COMMENT 'Webhook地址',
  `createTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`robotId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '机器人表';
