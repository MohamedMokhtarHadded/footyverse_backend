// routes/exerciseRoutes.js
const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercise.js');

// Create a new exercise
router.post('/', exerciseController.createExercise);

// Get all exercises
router.get('/', exerciseController.getAllExercises);

// Get an exercise by ID
router.get('/:id', exerciseController.getExerciseById);

// Update an exercise by ID
router.patch('/:id', exerciseController.updateExercise);

// Delete an exercise by ID
router.delete('/:id', exerciseController.deleteExercise);

module.exports = router;
