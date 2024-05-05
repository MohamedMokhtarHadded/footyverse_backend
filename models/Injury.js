const mongoose = require('mongoose');

const injurySchema = new mongoose.Schema({
    date: Date,
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    injuryType: String,
    description: String,
    treatment: String,
    diagnosis: String,
    doctor: String,
    time: Number,
    returnDate: Date,
    status: {
        type: String,
        enum: ['active', 'archived'],
        default: 'active'
    }
});

module.exports = mongoose.model('Injury', injurySchema);
