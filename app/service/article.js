'use strict';

const Service = require('egg').Service;
class ArticleService extends Service {
  async find(tagName, pageNo, pageSize) {
    pageNo = (pageNo - 1) * pageSize;
    const findArticleList = this.app.mysql.query(
      `SELECT 
        COUNT(a.articleId) as commentNum, a.*
      FROM  
        \`article\` AS a 
      LEFT JOIN \`comment\` as c ON a.articleId = c.articleId 
      WHERE 
        a.tagName LIKE ?
      GROUP BY 
        a.articleId 
      ORDER BY 
        createTime DESC
      LIMIT ?,
        ?
      `,
      [ tagName, pageNo, pageSize ]
    );
    return findArticleList;
  }
  async findTags() {
    const tags = this.app.mysql.query(
      `SELECT
        a.tagName
      FROM
        article AS a
      WHERE
	      a.tagName is not NULL
      `
    );
    return tags;
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
