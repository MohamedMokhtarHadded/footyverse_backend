// controllers/exerciseController.js
const Exercise = require('../models/Exercise');

// Create a new exercise
exports.createExercise = async (req, res) => {
  try {
    const exercise = new Exercise(req.body);
    await exercise.save();
    res.status(201).json({ message: 'Exercise created successfully', exercise });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create exercise', message: err.message });
  }
};

// Get all exercises
exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exercises', message: err.message });
  }
};

// Get an exercise by ID
exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exercise', message: err.message });
  }
};

// Update an exercise by ID
exports.updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.status(200).json({ message: 'Exercise updated successfully', exercise });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update exercise', message: err.message });
  }
};

// Delete an exercise by ID
exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.status(200).json({ message: 'Exercise deleted successfully', exercise });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete exercise', message: err.message });
  }
};
