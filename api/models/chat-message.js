/* eslint-disable */
const { Schema, model } = require('mongoose')

const chatMessageSchema = new Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  divider: { type: Boolean, default: false },
  inset: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  room: { type: Schema.Types.ObjectId, ref: 'Chat-room' }
  /* // Relationship with 'chat-rooms' - many-to-many
  rooms: [
    { type: Schema.Types.ObjectId, ref: 'Chat-room' }
  ]*/
})

module.exports = model('Chat-message', chatMessageSchema)
