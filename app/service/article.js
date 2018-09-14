'use strict';

const Service = require('egg').Service;
class ArticleService extends Service {
  async find() {
    const findArticleList = this.app.mysql.select('article', {
      orders: [[ 'createTime', 'desc' ]],
    });
    return findArticleList;
  }
  async insert(data) {
    const addArticle = this.app.mysql.insert('article', data);
    return addArticle;
  }
  async update(data, options) {
    const updateArticle = this.app.mysql.update('article', data, options);
    return updateArticle;
  }
  async delete(articleId) {
    const deleteArticle = this.app.mysql.delete('article', { articleId });
    return deleteArticle;
  }
}
module.exports = ArticleService;
