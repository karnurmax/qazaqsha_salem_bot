const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  question_id: { type: Number },
  text: { type: String },
  variants: [Object],
  difficulty: { type: Number },
  percentiles: [Object],
});

//возможно в будущем нужно будет сделать список пройденных тестов с результатами
