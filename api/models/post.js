const { model, Schema} = require('mongoose')

const postSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: {
    type: Date,
    // Date will be created with the Post
    default: Date.now
  },
  views: { type: Number, default: 0 },
  imageUrl: String,
  comments: [
    { type: Schema.Types.ObjectId, ref: 'Comment' }
  ] 
  
})

module.exports = model('Post', postSchema)
