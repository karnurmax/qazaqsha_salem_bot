const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  telegram_id: { type: Number, required: true },
  name: { type: String },
  balance: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  last10questions: [Object],
  questionsResults: [Object],
});

//возможно в будущем нужно будет сделать список пройденных тестов с результатами
