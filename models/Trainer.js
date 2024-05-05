const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  expertise: {
    type: String,
    required: true
  },
  soccerExperience: {
    type: String,
    required: true
  }
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;