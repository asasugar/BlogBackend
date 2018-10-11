'use strict';

const Service = require('egg').Service;
class CommentService extends Service {
  async find({ articleId, userId = '' }) {
    const res = await this.app.mysql.query(
      'SELECT c.*,u.userName,u.headImg FROM `comment` as c LEFT JOIN `user` as u ON c.userId=u.userId WHERE c.articleId=? ORDER BY c.userId=? DESC,c.createTime DESC',
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
