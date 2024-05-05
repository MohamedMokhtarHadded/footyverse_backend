const mongoose = require('mongoose');

const gkStatsSchema = new mongoose.Schema({

    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },


    saves: Number, 
    aerialAbility: Number,
    anticipation: Number,
    ballHandling: Number,
    tackling: Number,

});

module.exports = mongoose.model('gkStats', gkStatsSchema);