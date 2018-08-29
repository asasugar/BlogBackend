'use strict';
const md5 = require('md5');

const Controller = require('../core/base_controller');
class HomeController extends Controller {
  async get() {
    const { ctx, service } = this;
    const userId = ctx.query.userId;
    const userInfo = await service.user.find({ userId });
    if (userInfo) this.success('获取用户信息成功', userInfo);
    else this.fail('未查询到用户信息');
  }

  async login() {
    const { ctx, service } = this;
    const { account, password } = ctx.request.body;

    if (account && password) {
      const userInfo = await service.user.find({ account, password });
      console.log(userInfo);

      if (userInfo) this.success('登录成功', userInfo);
      else this.fail('账号或者密码错误');
    } else {
      this.fail('账号或者密码不能为空');
    }
  }

  async reg() {
    const { ctx, service } = this;
    const { account, password } = ctx.request.body;
    if (account && password) {
      // 查询账号是否存在
      const isExist = await service.user.find({ account });
      if (!isExist) {
        const userInfo = await service.user.insert({ account, password });
        if (userInfo) this.success('注册成功', userInfo);
      } else this.fail('用户已存在');
    } else {
      this.fail('账号或者密码不能为空');
    }
  }

  async modifyPassword() {
    const { ctx, service } = this;
    const { account, oldPassword, newPassword } = ctx.request.body;
    if (account && oldPassword && newPassword) {
      const isExist = await service.user.find({
        account,
        password: oldPassword,
      });
      if (isExist) {
        const userInfo = await service.user.update({
          account,
          password: newPassword,
        });
        if (userInfo) this.success('修改成功', userInfo);
      } else this.fail('账号或原密码不正确');
    } else {
      this.fail('账号或者密码不能为空');
    }
  }
}

module.exports = HomeController;
