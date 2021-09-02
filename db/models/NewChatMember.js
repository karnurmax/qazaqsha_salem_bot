/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({
  userId: String,
  questionText: String,
  answers:[String],
  rightAnswer:String,
  expiredAt:Date,
  result:String
}, {
  collection: 'newChatMembers',
  timestamps: true,
});

module.exports = mongoose.model('NewChatMember', schema);
