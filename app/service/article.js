'use strict';

const Service = require('egg').Service;
class ArticleService extends Service {
  async find() {
    const findArticleList = this.app.mysql.query(
      'SELECT COUNT(a.articleId) as commentNum,a.* FROM  article AS a LEFT JOIN `comment` as c ON a.articleId=c.articleId GROUP BY a.articleId ORDER BY createTime DESC'
    );
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
