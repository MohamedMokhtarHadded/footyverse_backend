const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  trainingType: {
    type: String,
    enum: ['tactical', 'physical', 'goalkeeper', 'technical'],
    required: true
  },
  playerCount: {
    type: Number,
    default: 0
  }
});

statsSchema.statics.updatePlayerTrainingCount = async function(trainingType) {
  const Stats = this;
  const query = { trainingType };
  const update = { $inc: { playerCount: 1 } };
  const options = { upsert: true, new: true };
  return await Stats.findOneAndUpdate(query, update, options);
};

<<<<<<< HEAD
module.exports = mongoose.model('Stats', statsSchema);z
=======
module.exports = mongoose.model('Stats', statsSchema);
>>>>>>> origin/MohamedMokhtarHadded-injury
