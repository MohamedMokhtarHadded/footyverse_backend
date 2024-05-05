const express = require('express');
const { createTraining, getAllTrainings, getTrainingById, createNewRecordForPlayer, getTrainingsByPlayer, deleteTraining, updateTraining, manageTrainingForLowPerformance } = require('../controllers/training');
const router = express.Router();

// Create a new training session
router.post('/createTraining', createTraining);

// Get all training sessions
router.get('/', getAllTrainings);

// Get a training session by ID
router.get('/:id', getTrainingById);


// Get training sessions by player
router.get('/player/:playerId', getTrainingsByPlayer);

// Delete a training session by ID
router.delete('/:id', deleteTraining);

// Update a training session by ID
router.patch('/:id', updateTraining);


module.exports = router;