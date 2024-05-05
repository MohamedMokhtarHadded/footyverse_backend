const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({

  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  playerNumber: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  preferredFoot: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Player', playerSchema);
