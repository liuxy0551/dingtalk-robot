/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.security = {
    csrf: {
      enable: false
    }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586592205046_9870';

  // add your middleware config here
  config.middleware = [];

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view')
    ].join(','),

    mapping: {
      '.nj': 'nunjucks'
    },

    defaultViewEngine: 'nunjucks',
    defaultExtension: '.nj',
  };

  config.cluster = {
    listen: {
      path: '',
      port: 9003,
      hostname: '0.0.0.0'
    }
  };

  config.static = {
    prefix: '/web',
    dir: path.join(appInfo.baseDir, 'app/public/web/dist'),
    maxAge: 24 * 60 * 60,
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 记账啦
  config.jizhangla = {
    getTotalAmountByUserId: 'https://api.jizhangla.liuxianyu.cn/v1/bill/getTotalAmountByUserId',
    createBillByDingTalkRobot: 'https://api.jizhangla.liuxianyu.cn/v1/bill/createBillByDingTalkRobot'
  }

  // 百度统计
  config.baidutj = {
    apiUrl: 'https://api.baidu.com/json/tongji/v1/ReportService/getData',
    body: {
      metrics: 'pv_count,visitor_count,ip_count,avg_visit_time',
      method: 'overview/getTimeTrendRpt'
    }
  }

  // 财联社财经报告
  config.report = {
    morning: 'https://www.cls.cn/subject/1151',
    afternoon: 'https://www.cls.cn/subject/1140',
    evening: 'https://www.cls.cn/subject/1139'
  }

  return {
    ...config,
    ...userConfig
  };
};
