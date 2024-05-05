const router = require('express').Router();
const { addScouting, updateScouting, deleteScouting, getScoutingById, getScoutings } = require('../controllers/scouting');

router.post('/add', addScouting);
router.get('/', getScoutings);
router.patch('/:id', updateScouting);
router.delete('/:id', deleteScouting);
router.get('/:id', getScoutingById);

module.exports = router;    