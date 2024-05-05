const recoveryModel = require('../models/Recovery');

async function addRecovery(req, res) {

    try {
        const { activities, startDate, endDate, injury, player } = req.body;
        const recovery = new recoveryModel({
            startDate,
            endDate,
            injury,
            player,
            activities
        });
        const savedRecovery = await recovery.save();
        return res.json(savedRecovery);
    } catch (error) {
        console.error('Error adding recovery:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function setRecoveryStatusAsRecovered(req, res) {
    try {
        const { id } = req.params;
        const recovery = await recoveryModel
            .findByIdAndUpdate(id, { status: 'Recovered' }, { new: true })
            .populate('injury')
            .populate('player');
        return res.json(recovery);
    } catch (error) {
        console.error('Error setting recovery status as recovered:', error.message);
        return res.status(400).json({ error: error.message });
    }
}


async function deleteRecovery(req, res) {
    
        try {
            const { id } = req.params;
            const deletedRecovery = await recoveryModel.findByIdAndDelete(id);
            return res.json(deletedRecovery);
        } catch (error) {
            console.error('Error deleting recovery:', error.message);
            return res.status(400).json({ error: error.message });
        }
    }
    
async function getRecoveryList(req, res) {
    try {
        const recovery = await recoveryModel.find().populate('injury').populate('player');
        return res.json(recovery);
    } catch (error) {
        console.error('Error getting recovery list:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getRecoveryById(req, res) {
    try {
        const { id } = req.params;
        const recovery = await recoveryModel.findById(id).populate('injury').populate('player');
        return res.json(recovery);
    } catch (error) {
        console.error('Error getting recovery by id:', error.message);
        return res.status(400).json({ error: error.message });
    }
}


async function getRecoveryListByPlayer(req, res) {
    try {
        const { player } = req.params;
        const recovery = await recoveryModel.find({ player }).populate('injury').populate('player');
        return res.json(recovery);
    } catch (error) {
        console.error('Error getting recovery by player:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    addRecovery,
    setRecoveryStatusAsRecovered,
    deleteRecovery,
    getRecoveryList,
    getRecoveryById,
    getRecoveryListByPlayer
};




