const mongoose = require('mongoose');

const scoutingSchema = new mongoose.Schema({
    avatar: String,
    playername : String,
    position : String,
    age : String,
    weaknesses: String,
    description: String,
    potential: String,
    rate: String,
    power : String,
    MatchesPlayed : String,
    GoalsScored: String,
    Assists:String,
    YellowCards:String,
    RedCards: String, 
    ShotsonTarget:String,
    
    
});

module.exports = mongoose.model('Scouting', scoutingSchema);