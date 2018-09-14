'use strict';

const Service = require('egg').Service;
class CommentService extends Service {
  async find() {
    const res = this.app.mysql.select('comment', {
      orders: [[ 'createTime', 'desc' ]],
    });
    return res;
  }
  async insert(data) {
    const res = this.app.mysql.insert('comment', data);
    return res;
  }
  async update(data, options) {
    const res = this.app.mysql.update('comment', data, options);
    return res;
  }
  async delete(articleId) {
    const res = this.app.mysql.delete('comment', { articleId });
    return res;
  }
}
module.exports = CommentService;
