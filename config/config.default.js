'use strict';
const mysqlConfig = require('./config.mysql');
module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1533865873560_4293';

  // add your config here
  config.middleware = [];

  // 数据库配置
  config.mysql = mysqlConfig;

  return config;
};
