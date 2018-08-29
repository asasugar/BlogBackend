'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/blog/getUser', controller.user.get);
  router.post('/blog/login', controller.user.login);
  router.post('/blog/reg', controller.user.reg);
  router.post('/blog/modifyPassword', controller.user.modifyPassword);

  router.post('createPost', '/api/posts', controller.post.create);
};
