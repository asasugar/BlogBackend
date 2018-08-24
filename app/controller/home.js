'use strict';
const md5 = require('md5');

const Controller = require('../core/base_controller');
class HomeController extends Controller {
  async index() {
    // const userInfo = await this.service.user.find();
    const data = {
      userName: '我是你鸡哥1',
      account: 'xxj1',
      password: 'xxj1',
      userId: md5('xxj1' + Date.parse(new Date())),
    };
    const userInfo = await this.service.user.insert(data);
    // console.log(md5('root' + Date.parse(new Date())));

    this.ctx.body = userInfo;
  }
}

module.exports = HomeController;
