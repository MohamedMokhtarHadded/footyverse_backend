const mongoose = require('mongoose');

const recoverySchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    activities: String,
    injury: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Injury'
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    status: {
        type: String,
        enum: ['Recovered', 'In Progress'],
        default: 'In Progress'
    }
});



module.exports = mongoose.model('Recovery', recoverySchema);