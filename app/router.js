'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/blog/getUser', controller.user.get);
  router.post('/blog/addUser', controller.user.add);

  router.post('createPost', '/api/posts', controller.post.create);
};
