const router = require('express').Router();
const {addStat, updateStat, deleteStat, getStatById, getStats, add1ToAPlayerStatField, minece1ToAPlayerStatField,
    addGkStat, updateGkStat, addPlayerStats, updatePlayerStats, getgkStatsByPlayerId, getPlayersStatsByPlayerId, getAllGkStats, getAllPlayersStats, deleteAllStats, getStatByPlayerId
} = require('../controllers/stats');


router.get('/getStatByPlayerId/:player', getStatByPlayerId);
router.delete('/deleteAllStats', deleteAllStats);
router.post('/add', addStat);
router.get('/', getStats);

router.post('/addGkStat', addGkStat);
router.patch('/updateGkStat/:id', updateGkStat);
router.post('/addPlayerStats', addPlayerStats);
router.patch('/updatePlayerStats/:id', updatePlayerStats);

router.get('/getgkStatsByPlayerId/:player', getgkStatsByPlayerId);
router.get('/getPlayersStatsByPlayerId/:player', getPlayersStatsByPlayerId);
router.get('/getAllGkStats', getAllGkStats);
router.get('/getAllPlayersStats', getAllPlayersStats);



router.patch('/add1/:id/:field', add1ToAPlayerStatField);
router.patch('/minece1/:id/:field', minece1ToAPlayerStatField);

router.patch('/:id', updateStat);
router.delete('/:id', deleteStat);
router.get('/:id', getStatById);







module.exports = router;
