// models/exercise.js
const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  position: {
    type: String,
    required: true
  },
  difficultyLevel: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  durationMinutes: {
    type: Number
  },
  player: {
    type: String
  }

});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
