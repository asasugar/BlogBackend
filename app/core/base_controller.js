const { Controller } = require('egg');
class BaseController extends Controller {
  success(msg, data) {
    this.ctx.body = {
      success: true,
      msg,
      data,
    };
  }

  fail(msg, data) {
    this.ctx.body = {
      success: false,
      msg,
      data,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
