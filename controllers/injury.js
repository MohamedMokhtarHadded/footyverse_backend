const InjuryModel = require("../models/Injury");

async function addInjury(req, res) {
    try {
        const { date, injuryType, description, treatment, diagnosis, doctor, time, returnDate, player } = req.body;
        const injury = new InjuryModel({
            player,
            date,
            injuryType,
            description,
            treatment,
            diagnosis,
            doctor,
            time,
            returnDate
        });
        const savedInjury = await injury.save();
        return res.json(savedInjury);
    } catch (error) {
        console.error('Error adding injury:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function updateInjury(req, res) {
    try {
        const { id } = req.params;
        const { date, injuryType, description, treatment, diagnosis, doctor, time, returnDate } = req.body;
        const updatedInjury = await InjuryModel.findByIdAndUpdate(
            id,
            {
                date,
                injuryType,
                description,
                treatment,
                diagnosis,
                doctor,
                time,
                returnDate,
            },
            { new: true }
        );
        return res.json(updatedInjury);
    } catch (error) {
        console.error('Error updating injury:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function deleteInjury(req, res) {
    try {
        const { id } = req.params;
        const deletedInjury = await InjuryModel.findByIdAndDelete(id);
        return res.json(deletedInjury);
    } catch (error) {
        console.error('Error deleting injury:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getInjuriesByPlayer(req, res) {
    try {
        const { player } = req.params;
        const injuries = await InjuryModel.find({ player });
        return res.json(injuries);
    } catch (error) {
        console.error('Error getting injuries by player:', error.message);
        return res.status(400).json({ error: error.message });
    }
}


async function getInjuryById(req, res) {
    try {
        const id = req.params.id; // Access the id from req.params directly
        const injury = await InjuryModel.findById(id).populate('player');
        if (!injury) {
            return res.status(404).json({ error: 'Injury not found' });
        }
        return res.json(injury);
    } catch (error) {
        console.error('Error getting injury by id:', error.message);
        return res.status(400).json({ error: error.message });
    }
}


async function getInjuries(req, res) {
    try {
        const injuries = await InjuryModel.find().populate('player');
        return res.json(injuries);
    } catch (error) {
        console.error('Error getting injuries:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getInjuriesStatusArchieved(req, res) {
    try {
        const injuries = await InjuryModel.find({ status: 'archived' }).populate('player');
        return res.json(injuries);
    } catch (error) {
        console.error('Error getting injuries:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getInjuriesStatusActive(req, res) {
    try {
        const injuries = await InjuryModel.find({ status: 'active' }).populate('player');
        return res.json(injuries);
    } catch (error) {
        console.error('Error getting injuries:', error.message);
        return res.status(400).json({ error: error.message });
    }
}



async function setInjuryasArchieved(req, res) {
    try {
        const { id } = req.params; // Extract id directly from req.params
        const updatedInjury = await InjuryModel.findByIdAndUpdate(
            id,
            { status: 'archived' },
            { new: true }
        );

        if (!updatedInjury) {
            return res.status(404).json({ error: 'Injury not found' });
        }

        return res.json(updatedInjury);
    } catch (error) {
        console.error('Error updating injury:', error.message);
        return res.status(400).json({ error: error.message });
    }
}





module.exports = {
    addInjury,
    updateInjury,
    deleteInjury,
    getInjuriesByPlayer,
    getInjuries,
    getInjuryById,
    setInjuryasArchieved,
    getInjuriesStatusArchieved,
    getInjuriesStatusActive

};
