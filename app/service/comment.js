'use strict';

const Service = require('egg').Service;
class CommentService extends Service {
  async find({ articleId, userId = '' }) {
    // const res = this.app.mysql.select('comment', {
    //   where: {
    //     articleId,
    //   },
    //   orders: [[ 'userId', '=10', 'desc' ], [ 'createTime', 'desc' ]],
    // });
    const res = await this.app.mysql.query(
      'SELECT * FROM  `comment` WHERE articleId = ? ORDER BY userId = ? DESC, createTime DESC',
      [ articleId, userId ]
    );
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
