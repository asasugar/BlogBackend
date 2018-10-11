'use strict';

const Controller = require('../core/base_controller');
class ArticleController extends Controller {
  async getArticleList() {
    const { service } = this;
    const articleList = await service.article.find();
    this.success('获取文章列表成功', articleList);
  }

  async addArticle() {
    const { ctx, service } = this;
    const { title, content, coverImg } = ctx.request.body;
    if (title && content) {
      const res = await service.article.insert({
        title,
        content,
        coverImg,
        createTime: new Date(),
      });
      if (res.affectedRows === 1) this.success('添加文章成功');
    } else {
      this.fail('标题或者内容不能为空');
    }
  }

  async deleteArticle() {
    const { ctx, service } = this;
    const { articleId } = ctx.request.body;
    if (articleId) {
      const res = await service.article.delete(articleId);
      if (res.affectedRows === 1) this.success('删除文章成功');
    } else {
      this.fail('articleId 不能为空');
    }
  }

  async modifyPassword() {
    const { ctx, service } = this;
    const { account, oldPassword, newPassword } = ctx.request.body;
    if (account && oldPassword && newPassword) {
      const isExist = await service.article.find({
        account,
        password: oldPassword,
      });

      if (isExist.length > 0) {
        const userInfo = await service.article.update(
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

module.exports = ArticleController;
