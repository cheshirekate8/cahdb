const mongoose = require('mongoose');

const WhiteCardSchema = new mongoose.Schema({
  text: { type: String, required: true },
  pack: { type: Number, required: true }
});

const BlackCardSchema = new mongoose.Schema({
  text: { type: String, required: true },
  pack: { type: Number, required: true },
  pick: { type: Number, required: true }
});

const PackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  white: [WhiteCardSchema],
  black: [BlackCardSchema],
  official: { type: Boolean, required: true }
});

module.exports = mongoose.model('Pack', PackSchema);