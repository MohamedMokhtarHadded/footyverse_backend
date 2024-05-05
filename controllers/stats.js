const StatsModel = require("../models/Stats");
const gkStatsModel = require("../models/gkStats");
const playersStatsModel = require("../models/playersStats");


async function addStat(req, res) {
    try {
        const stats = req.body;

        // Check if 'player' field is present in the stats object
        if (!stats || !stats.player) {
            throw new Error("Player field is required in stats.");
        }

        const stat = new StatsModel(stats);
        const savedStat = await stat.save();
        return res.json(savedStat);
    } catch (error) {
        console.error('Error adding stat:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function updateStat(req, res) {
    try {
        const { id } = req.params;
        const  stats  = req.body;
        const updatedStat = await StatsModel.findByIdAndUpdate
            (id,
                { stats },
                { new: true }
            );
        return res.json(updatedStat);
    } catch (error) {
        console.error('Error updating stat:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function deleteStat(req, res) {
    try {
        const { id } = req.params;
        const deletedStat = await StatsModel.findByIdAndDelete(id);
        return res.json(deletedStat);
    } catch (error) {
        console.error('Error deleting stat:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getStatByPlayerId(req, res) {
    try {
        const { player } = req.params;
        
        // Use findOne to retrieve the first document matching the player ID
        const stat = await StatsModel
            .findOne({ player });

        if (!stat) {
            return res.status(404).json({ error: "Stat not found for the specified player." });
        }

        return res.json(stat);
    } catch (error) {
        console.error('Error getting stat by player id:', error.message);
        return res.status(400).json({ error: error.message });
    }
}


async function getStatById(req, res) {
    try {
        const { id } = req.params;
        const stat = await StatsModel.findById(id);
        return res.json(stat);
    } catch (error) {
        console.error('Error getting stat by id:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getStats(req, res) {
    try {
        const stats = await StatsModel.find();
        return res.json(stats);
    } catch (error) {
        console.error('Error getting stats:', error.message);
        return res.status(400).json({ error: error.message });
    }
}


async function add1ToAPlayerStatField(req, res) {
    try {
        const { id, field } = req.params;
        const updatedStat = await StatsModel.findByIdAndUpdate 
            (id,
                { $inc: { [field]: 1 } },
                { new: true }
            );
        return res.json(updatedStat);
    } catch (error) {
        console.error('Error updating stat:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function minece1ToAPlayerStatField(req, res) {
    try {
        const { id, field } = req.params;
        const updatedStat = await StatsModel.findByIdAndUpdate
            (id,
                { $inc: { [field]: -1 } },
                { new: true }
            );
        return res.json(updatedStat);
    } catch (error) {
        console.error('Error updating stat:', error.message);
        return res.status(400).json({ error: error.message });
    }
}


async function addGkStat(req, res) {
    try {
        const { player, saves, aerialAbility, anticipation, ballHandling, tackling } = req.body;
        const stat = new gkStatsModel({
            player,
            saves,
            aerialAbility,
            anticipation,
            ballHandling,
            tackling
        });
        const savedStat = await stat.save();
        return res.json(savedStat);
    } catch (error) {
        console.error('Error adding stat:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function updateGkStat(req, res) {
    try {
        const { id } = req.params;
        const { player, saves, aerialAbility, anticipation, ballHandling, tackling } = req.body;
        const updatedStat = await gkStatsModel.findByIdAndUpdate
            (id,
                { player, saves, aerialAbility, anticipation, ballHandling, tackling },
                { new: true }
            );   
        return res.json(updatedStat);
    } catch (error) {
        console.error('Error updating stat:', error.message);
        return res.status(400).json({ error: error.message });
    }
}
async function getgkStatsByPlayerId(req, res) {
    try {
        const { player } = req.params;
        const stat = await gkStatsModel
            .findOne({ player });
        return res.json(stat);
    } catch (error) {
        console.error('Error getting stat by id:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getAllGkStats(req, res) {
    try {
        const stats = await gkStatsModel.find();
        return res.json(stats);
    } catch (error) {
        console.error('Error getting stats:', error.message);
        return res.status(400).json({ error: error.message });
    }
}



async function addPlayerStats(req, res) {
    try {
        const { player, attacking, tecnical, creativity, defending, tackling } = req.body;
        const stat = new playersStatsModel({
            player,
            attacking,
            tecnical,
            creativity,
            defending,
            tackling
        });
        const savedStat = await stat.save();
        return res.json(savedStat);
    } catch (error) {
        console.error('Error adding stat:', error.message);
        return res.status(400).json({ error: error.message });
    }
}


async function updatePlayerStats(req, res) {
    try {
        const { id } = req.params;
        const { player, attacking, tecnical, creativity, defending, tackling } = req.body;
        const updatedStat = await playersStatsModel.findByIdAndUpdate
            (id,
                { player, attacking, tecnical, creativity, defending, tackling },
                { new: true }
            );
        return res.json(updatedStat);
    } catch (error) {
        console.error('Error updating stat:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getPlayersStatsByPlayerId(req, res) {
    try {
        const { player } = req.params;
        const stat = await playersStatsModel.findOne({ player });
        return res.json(stat);
    } catch (error) {
        console.error('Error getting stat by id:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getAllPlayersStats(req, res) {
    try {
        const stats = await playersStatsModel.find();
        return res.json(stats);
    } catch (error) {
        console.error('Error getting stats:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function deleteAllStats(req, res) {
    try {
        await gkStatsModel.deleteMany();
        return res.json({ message: 'All stats deleted' });
    } catch (error) {
        console.error('Error deleting stats:', error.message);
        return res.status(400).json({ error: error.message });
    }
}



module.exports = {
    addStat,
    updateStat,
    deleteStat,
    getStatById,
    getStats,
    add1ToAPlayerStatField,
    minece1ToAPlayerStatField,
    addGkStat,
    updateGkStat,
    addPlayerStats,
    updatePlayerStats,
    getgkStatsByPlayerId,
    getPlayersStatsByPlayerId,
    getAllGkStats,
    getAllPlayersStats,
    deleteAllStats,
    getStatByPlayerId

};
