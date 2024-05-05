const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({

  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },

   
  
  // General stats
  weakness : String,
  strength : String,
  matchesPlayed: Number,
  fouls: Number,
  penaltiesCommitted: Number,
  minutes: Number,


  // Goalkeeper stats
  keepSaves: Number,
  peenalitiesSaved: Number,
  yellowCards: Number,
  redCards: Number,

  // Defender player stats
  interceptions: Number,
  tackles: Number,
  possessionWon: Number,
  ballsRecovered: Number,

  
  // Midfielder player stats
  goals: Number,
  assists: Number,
  shotsOnTarget: Number,
  passesCompleted: Number,

});

module.exports = mongoose.model('Stats', statsSchema);