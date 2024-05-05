const express = require('express');
const Feedback = require('./models/Feedback'); // Import the Feedback model

const router = express.Router();

router.post('/feedback', async (req, res) => {
  try {
    const { playerId, message } = req.body;

    const feedback = new Feedback({ playerId, message });
    await feedback.save();

    // Send feedback acknowledgment email
    await sendFeedbackAcknowledgmentEmail(playerId, message);

    res.status(200).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback.' });
  }
});

// Function to send feedback acknowledgment email
async function sendFeedbackAcknowledgmentEmail(playerId, message) {
  try {
    // Your email sending logic goes here
    console.log(`Acknowledgment email sent to Player ID ${playerId}: ${message}`);
  } catch (error) {
    console.error(`Failed to send acknowledgment email to Player ID ${playerId}`, error);
    throw error;
  }
}

module.exports = router;