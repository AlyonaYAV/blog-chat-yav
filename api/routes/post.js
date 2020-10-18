const passport = require('passport')
const controller = require('./../controllers/post')
const { Router } = require('express')
const router = Router()

// /api/post/admin/create - create Post in Admin
router.post(
  '/admin/create',
  passport.authenticate('jwt', { session: false }),
  controller.createPost 
)

// /api/post/admin/posts - get all Posts in Admin
router.get(
  '/admin/posts',
  passport.authenticate('jwt', { session: false }),
  controller.getPosts
)

// /api/post/admin/post/:id - get Post by id in Admin
router.get(
  '/admin/post/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getPostsById
)

// /api/post/admin/post/:id - update Post by id in Admin
router.put(
  '/admin/post/:id',
  passport.authenticate('jwt', { session: false }),
  controller.updatePostsById
)

// /api/post/admin/post/:id - delete Post by id in Admin
router.delete(
  '/admin/post/:id',
  passport.authenticate('jwt', { session: false }),
  controller.deletePostsById
)

/*  Pablic Routes */

// '/' - get all Posts on the site
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.getPosts
)

// '/:id' - get Post by id on the Site
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getPostsById
)

// '/:id' - add view to a Post by id on the Site
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.addViewToPostsById
)

module.exports = router
