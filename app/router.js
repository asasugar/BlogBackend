'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('createPost', '/api/posts', controller.post.create);
  // 用户
  router.get('/blog/getUser', controller.user.get);
  router.post('/blog/login', controller.user.login);
  router.post('/blog/reg', controller.user.reg);
  router.post('/blog/modifyPassword', controller.user.modifyPassword);
  // 文章
  router.get('/blog/getArticleList', controller.article.getArticleList);
  router.post('/blog/addArticle', controller.article.addArticle);
  router.post('/blog/deleteArticle', controller.article.deleteArticle);
  // 评论
  router.get('/blog/getCommentList', controller.comment.getCommentList);
};
