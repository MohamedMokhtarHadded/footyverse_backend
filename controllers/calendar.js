const CalendarModel = require("../models/calendar");

async function addEvent(req, res) {
    try {
        const { title, date, time, location, description } = req.body;
        const event = new CalendarModel({
            title,
            date,
            time,
            location,
            description
        });
        const savedEvent = await event.save();
        return res.json(savedEvent);
    } catch (error) {
        console.error('Error adding event to calendar:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function updateEvent(req, res) {
    try {
        const { id } = req.params;
        const { title, date, time, location, description } = req.body;
        const updatedEvent = await CalendarModel.findByIdAndUpdate(
            id,
            { title, date, time, location, description },
            { new: true }
        );
        return res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event in calendar:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function deleteEvent(req, res) {
    try {
        const { id } = req.params;
        const deletedEvent = await CalendarModel.findByIdAndDelete(id);
        return res.json(deletedEvent);
    } catch (error) {
        console.error('Error deleting event from calendar:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getEventById(req, res) {
    try {
        const { id } = req.params;
        const event = await CalendarModel.findById(id);
        return res.json(event);
    } catch (error) {
        console.error('Error getting event from calendar by id:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getEvents(req, res) {
    try {
        const events = await CalendarModel.find();
        return res.json(events);
    } catch (error) {
        console.error('Error getting events from calendar:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEvents,
};
