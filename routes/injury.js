const router = require('express').Router();
const InjuryModel = require('../models/Injury');
const { addInjury, updateInjury, deleteInjury, getInjuriesByPlayer, getInjuries, getInjuryById, setInjuryasArchieved,getInjuriesStatusArchieved, getInjuriesStatusActive} = require('../controllers/injury');

router.post('/addInjury', addInjury);
router.get('/', getInjuries);
router.get('/injuries/:playerId', getInjuriesByPlayer);
router.patch('/setArchieved/:id', setInjuryasArchieved);
router.get('/archived', getInjuriesStatusArchieved);
router.get('/active', getInjuriesStatusActive);

router.get('/:id', getInjuryById);
router.patch('/:id', updateInjury);
router.delete('/:id', deleteInjury);



module.exports = router;
