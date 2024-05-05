const express = require('express');
const Trainer = require('./models/Trainer'); // Import the Trainer model

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, expertise } = req.body;

    const trainer = new Trainer({ name, email, expertise });
    await trainer.save();

    res.status(200).json({ message: 'Trainer created successfully.' });
  } catch (error) {
    console.error('Failed to create trainer:', error);
    res.status(500).json({ error: 'Failed to create trainer.' });
  }
});

module.exports = router;