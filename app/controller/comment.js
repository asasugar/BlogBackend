'use strict';

const Controller = require('../core/base_controller');
class CommentController extends Controller {
  async getCommentList() {
    const { ctx, service } = this;
    const res = await service.comment.find({
      articleId: ctx.query.articleId,
      userId: ctx.query.userId,
    });
    this.success('获取评论列表成功', res);
  }

  async addComment() {
    const { ctx, service } = this;
    const { userId, articleId, content } = ctx.request.body;
    const userInfo = await service.user.find({ userId });
    console.log(userInfo);
    if (content) {
      const res = await service.comment.insert({
        articleId,
        content,
        userId,
        userName: userInfo.userName,
        headImg: userInfo.headImg,
        createTime: new Date(),
      });
      if (res.affectedRows === 1) this.success('添加评论成功');
    } else {
      this.fail('评论内容不能为空');
    }
  }

  async deleteArticle() {
    const { ctx, service } = this;
    const { articleId } = ctx.request.body;
    if (articleId) {
      const res = await service.comment.delete(articleId);
      if (res.affectedRows === 1) this.success('删除文章成功');
    } else {
      this.fail('articleId 不能为空');
    }
  }

  async modifyPassword() {
    const { ctx, service } = this;
    const { account, oldPassword, newPassword } = ctx.request.body;
    if (account && oldPassword && newPassword) {
      const isExist = await service.comment.find({
        account,
        password: oldPassword,
      });

      if (isExist.length > 0) {
        const userInfo = await service.comment.update(
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

module.exports = CommentController;
