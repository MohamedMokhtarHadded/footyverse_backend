const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: String,
    message: String,
    date: Date,
    dataId: String,
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    status: String,
});

module.exports = mongoose.model('Notification', notificationSchema);
