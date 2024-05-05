const mongoose = require('mongoose');

const playersStatsSchema = new mongoose.Schema({

    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },

    attacking: Number,
    tecnical: Number,
    creativity: Number,
    defending: Number,
    tackling: Number,
});

module.exports = mongoose.model('playersStats', playersStatsSchema);

