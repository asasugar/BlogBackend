const { Controller } = require('egg');
class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      success: true,
      data,
    };
  }

  fail(data) {
    this.ctx.body = {
      success: false,
      data,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
