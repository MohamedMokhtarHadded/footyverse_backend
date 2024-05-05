const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  player: {
    type: String,
    required: true
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;