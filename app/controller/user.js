'use strict';

const Controller = require('../core/base_controller');
class UserController extends Controller {
  async get() {
    const { ctx, service } = this;
    const userId = ctx.query.userId;
    const userInfo = await service.user.find({ userId });
    delete userInfo.password;
    if (userInfo) this.success('获取用户信息成功', userInfo);
    else this.fail('未查询到用户信息');
  }

  async login() {
    const { ctx, service } = this;
    const { account, password } = ctx.request.body;

    if (account && password) {
      const userInfo = await service.user.find({ account, password });

      if (userInfo.length > 0) this.success('登录成功', userInfo[0]);
      else this.fail('账号或者密码错误');
    } else {
      this.fail('账号或者密码不能为空');
    }
  }

  async reg() {
    const { ctx, service } = this;
    const { userName, account, password, remark, headImg } = ctx.request.body;
    if (account && password) {
      // 查询账号是否存在
      const isExist = await service.user.find({ account });
      if (!isExist) {
        const userInfo = await service.user.insert({
          userName,
          account,
          password,
          remark,
          headImg,
        });
        if (userInfo.affectedRows === 1) this.success('注册成功');
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

      if (isExist.length > 0) {
        const userInfo = await service.user.update(
          {
            account,
            password: newPassword,
          },
          {
            where: {
              userId: isExist[0].userId,
            },
          }
        );
        if (userInfo.affectedRows === 1) this.success('修改成功');
      } else this.fail('账号或原密码不正确');
    } else {
      this.fail('账号或者密码不能为空');
    }
  }
}

module.exports = UserController;
