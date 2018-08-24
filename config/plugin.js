'use strict';

// had enabled by egg
// exports.static = true;
// 这里关闭security的原因是不用每次动态的添加token，开发阶段很麻烦
exports.security = {
  enable: false,
};
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
