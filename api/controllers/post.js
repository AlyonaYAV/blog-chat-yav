const Post = require('./../models/post')

// Create new Post - in Admin
module.exports.createPost = async (request, response) => {
  const post = new Post({
    title: request.body.title,
    text: request.body.text,
    // Get the file path of an uploaded image by Multer
    imageUrl: `${request.file.fileName}`
  })
  try {
    await post.save()
    // Data saved in DB
    response.status(201).json(post)
  } catch (e) {
    response.status(500).json(e)
  }
}

// Get all Posts in Admin and Public
module.exports.getPosts = async (request, response) => {
  try {
    const posts = await Post.find()
    // Sort post in reverse order
    posts.sort({ date: -1 })
  } catch (e) {
    response.status(500).json(e)
  }
}

// Get all Post by ID in Admin and Public
module.exports.getPostsById = async (request, response) => {
  try {
    const post = await Post.findById(request, params.id)
    // bindings between models
    post.populate('comments').exec((error, post) => {
      response.status(200).json(post)
    })
  } catch (e) {
    response.statuse(500).json(e)
  }
}

// Update Post by id in Admin
module.exports.updatePostsById = async (request, response) => {
  const $set = {
    title: request.body.title,
    text: request.body.text
  }
  try {
    const post = await Post.findOneAndUpdate({
      _id: request.params.id
    }, { $set }, { 'new': true })
    response.status(200).json(post) 
  } catch (e) {
    response.statuse(500).json(e)
  }
}

// Delete Post in ID in Admin
module.exports.deletePostsById = async (request, response) => {
  try {
    await Post.deleteOne({ _id: request.params.id })
    response.status(200).json({ message: 'Post removed' })
  } catch (e) {
    response.statuse(500).json(e)
  }
}

module.exports.addViewToPostsById = async (request, response) => {
  const $set = {
    views: ++request.body.views
  }
  try {
    await Post.findOneAndUpdate({ _id: request.params.id }, { $set })
    // 204 - Success, without content creation
    response.status(204).json({ message: 'Views incremented' })
  } catch (e) {
    response.statuse(500).json(e)
  }
}
