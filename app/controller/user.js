'use strict';
const md5 = require('md5');

const Controller = require('../core/base_controller');
class HomeController extends Controller {
  async get() {
    const { ctx, service } = this;
    const userId = ctx.query.userId;
    const userInfo = await service.user.find({ userId });
    if (userInfo) this.success({ msg: '获取用户信息成功' }, userInfo);
    else this.fail({ msg: '未查询到用户信息' });
  }
  async add() {
    const { ctx, service } = this;
    // 添加前先判断账号是否存在
    const { account, password } = ctx.request.body;
    const isFindUser = await service.user.find({ account });

    if (isFindUser) {
      this.fail({ msg: '用户已存在' });
    } else if (account && password) {
      await service.user.insert(ctx.request.body);
      this.success({ msg: '新增用户成功' });
    } else {
      this.fail({ msg: '参数错误' });
    }
  }
}

module.exports = HomeController;
