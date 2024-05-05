const express = require('express');
const Training = require('../models/Training');

exports.createTraining = async (req, res) => {
  try {
    const training = new Training(req.body);
    await training.save(); 
    res.status(200).json({ message: 'Training session created successfully', training });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create training session', message: err.message });
  }
};

// Get all training sessions
exports.getAllTrainings = async (req, res) => {
  try {
    const { sortBy, sortOrder } = req.query;
    let sortOptions = {};

    // Check the sortBy parameter and set the sorting options accordingly
    if (sortBy === 'date') {
      sortOptions.date = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'duration') {
      sortOptions.duration = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'intensity') {
      sortOptions.intensity = sortOrder === 'desc' ? -1 : 1;
    } else {
      // Default sorting if no valid sortBy parameter is provided
      sortOptions.date = -1;
    }

    const trainings = await Training.find().sort(sortOptions).populate('exercises').populate('player');
    res.status(200).json(trainings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch training sessions', message: err.message });
  }
};

// Get a training session by ID
exports.getTrainingById = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id).populate('exercises').populate('player')
    if (!training) {
      return res.status(404).json({ error: 'Training session not found' });
    }
    res.status(200).json(training);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch training session', message: err.message });
  }
};

// Update a training session by ID
exports.updateTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!training) {
      return res.status(404).json({ error: 'Training session not found' });
    }
    res.status(200).json({ message: 'Training session updated successfully', training });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update training session', message: err.message });
  }
};

// Delete a training session by ID
exports.deleteTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) {
      return res.status(404).json({ error: 'Training session not found' });
    }
    res.status(200).json({ message: 'Training session deleted successfully', training });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete training session', message: err.message });
  }
};

// Get trainings by player
exports.getTrainingsByPlayer = async (req, res) => {
  try {
    const { playerId } = req.params;
    const trainings = await Training.find({ player: playerId });
    res.json(trainings);
  } catch (error) {
    console.error('Error getting trainings by player:', error.message);
    res.status(400).json({ error: error.message });
  }
};



// Manage a training session for a player with low performance
exports.manageTrainingForLowPerformance = async (playerId) => {
  try {
    // Get the player's previous training sessions
    const trainings = await Training.find({ player: playerId });

    // Perform logic to determine if a training session needs to be managed
    // based on the player's performance in the previous sessions

    if (trainings.length === 0){
      // If there are no previous training sessions, create a new training session
      const date = new Date();
      const duration = 60; // Example duration
      
      const newTraining = await createNewRecordForPlayer(playerId, date, durationy);
      return newTraining;
    } else {
      // If there are previous training sessions, analyze the performance
      // and determine if a new training session is needed

      // Example logic: check the average intensity of previous sessions
      let totalIntensity = 0;
      for (const training of trainings) {
        totalIntensity += training.intensity;
      }
      const averageIntensity = totalIntensity / trainings.length;

      if (averageIntensity <= 2) {
        // If the average intensity is low, create a new training session
        const date = new Date();
        const duration = 60; // Example duration
        const caloriesBurned = 200; // Example calories burned
        const distance = 5; // Example distance
        const intensity = 'medium'; // Example intensity

        const newTraining = await createNewRecordForPlayer(playerId, date, duration, caloriesBurned, distance, intensity);
        return newTraining;
      } else {
        // If the average intensity is not low, no new training session is needed
        return null;
      }
    }
  } catch (error) {
    console.error('Error managing training for low performance:', error.message);
    throw new Error('Failed to manage training for low performance');
  }
};

