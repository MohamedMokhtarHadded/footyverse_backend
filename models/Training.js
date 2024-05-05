// models/training.js
const mongoose = require('mongoose');
const { string } = require('yup');
const Schema = mongoose.Schema;

const TrainingSchema = new mongoose.Schema({
  player: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],

  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  trainingType: {
    type: String,
    required: true
  },
  stats: [{
    type: Schema.Types.ObjectId,
    ref: 'Stats'
  }],
  exercises: [{
    type: Schema.Types.ObjectId,
    ref: 'Exercise'
  }],
  notes: {
    type: String
  },
});

const Training = mongoose.model('Training', TrainingSchema);

module.exports = Training;