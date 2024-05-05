const ScoutingModel = require("../models/scouting");

    async function addScouting(req, res) {
        try {
            const { avatar, playername,position,age, weaknesses, description, potential, rate,power, MatchesPlayed ,
                GoalsScored,
                Assists,
                YellowCards,
                RedCards, 
                ShotsonTarget } = req.body;
            const scouting = new ScoutingModel({
                avatar,
                playername,
                position,
                age,
                weaknesses,
                description,
                potential,
                rate,
                power, 
                MatchesPlayed ,
                GoalsScored,
                Assists,
                YellowCards,
                RedCards, 
                ShotsonTarget
                
        
            });
            const savedScouting = await scouting.save();
            return res.json(savedScouting);
        } catch (error) {
            console.error('Error adding scouting:', error.message);
            return res.status(400).json({ error: error.message });
        }
    }

async function updateScouting(req, res) {
    try {
        const { id } = req.params;
        const {avatar, playername,position,age, weaknesses, description, potential, rate, power, MatchesPlayed ,
            GoalsScored,
            Assists,
            YellowCards,
            RedCards, 
            ShotsonTarget} = req.body;
        const updatedScouting = await ScoutingModel.findByIdAndUpdate(
            id,
            {   avatar,
                playername,
                position,
                age,
                weaknesses,
                description,
                potential,
                rate,
                power,
                MatchesPlayed ,
                GoalsScored,
                Assists,
                 YellowCards,
                 RedCards, 
                 ShotsonTarget
                
            },
            { new: true }
        );
        return res.json(updatedScouting);
    } catch (error) {
        console.error('Error updating scouting:', error.message);
        return res.status(400).json({ error: error.message });  
    }
}

async function deleteScouting(req, res) {
    try {
        const { id } = req.params;
        const deletedScouting = await ScoutingModel.findByIdAndDelete(id);
        return res.json(deletedScouting);
    } catch (error) {
        console.error('Error deleting scouting:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getScoutingById(req, res) {
    try {
        const { id } = req.params;
        const scouting = await ScoutingModel.findById(id);
        return res.json(scouting);
    } catch (error) {
        console.error('Error getting scouting by id:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getScoutings(req, res) {
    try {
        const scoutings = await ScoutingModel.find();
        return res.json(scoutings);
    } catch (error) {
        console.error('Error getting scoutings:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    addScouting,
    updateScouting,
    deleteScouting,
    getScoutingById,
    getScoutings,
};