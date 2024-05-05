const router = require('express').Router();
const { addEvent, updateEvent, deleteEvent, getEventById, getEvents } = require('../controllers/calendar');

router.post('/add', addEvent);
router.get('/', getEvents);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.get('/:id', getEventById);

module.exports = router;
