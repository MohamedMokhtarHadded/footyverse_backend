const express = require('express');
const Session = require('./models/Session'); // Import the Session model
const Trainer = require('./models/Trainer'); // Import the Trainer model

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { player, trainer, time } = req.body;

    const session = new Session({ player, trainer, time });
    await session.save();

    // Send session confirmation email
    const trainerInfo = await Trainer.findById(trainer);
    sendSessionConfirmationEmail(player, time, trainerInfo.email);

    res.status(200).json({ message: 'Session scheduled successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule session.' });
  }
});

// Function to send session confirmation email
function sendSessionConfirmationEmail(_playerEmail, _sessionTime, _trainerEmail) {
  // Your email sending logic goes here
}

module.exports = router;