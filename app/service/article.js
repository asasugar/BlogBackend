'use strict';

const Service = require('egg').Service;
class ArticleService extends Service {
  async find() {
    const findArticleList = this.app.mysql.select('article');
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
  async delete(Id) {
    const deleteArticle = this.app.mysql.delete('article', { Id });
    return deleteArticle;
  }
}
module.exports = ArticleService;
