const router = require('express').Router();

const {
    addRecovery,
    setRecoveryStatusAsRecovered,
    deleteRecovery,
    getRecoveryList,
    getRecoveryById,
    getRecoveryListByPlayer } = require('../controllers/recovery');

router.post('/add', addRecovery);
router.patch('/update/:id', setRecoveryStatusAsRecovered);
router.delete('/delete/:id', deleteRecovery);
router.get('/', getRecoveryList);
router.get('/:id', getRecoveryById);
router.get('/player/:player', getRecoveryListByPlayer);

module.exports = router;
