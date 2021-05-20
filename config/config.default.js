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

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 百度统计
  config.baidutj = {
    apiUrl: 'https://api.baidu.com/json/tongji/v1/ReportService/getData',
    header: {
      username: 'username',
      password: 'password',
      token: 'token'
    },
    body: {
      siteId: 'siteId',
      metrics: 'pv_count,visitor_count,ip_count,avg_visit_time',
      method: 'overview/getTimeTrendRpt'
    }
  }

  // 记账啦
  config.jizhangla = {
    apiUrl: 'https://api.jizhangla.liuxianyu.cn/v1/bill/getTotalAmountByUserId',
    userId: 'userId'
  }

  return {
    ...config,
    ...userConfig
  };
};
